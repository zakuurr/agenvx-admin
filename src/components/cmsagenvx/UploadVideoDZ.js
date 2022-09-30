import { Card } from '@material-ui/core'
import { VIDEO_MAX_QTY, VIDEO_MAX_SIZE, VIDEO_MIN_SIZE } from 'const'
import CW from 'copywriting'
import md5 from 'crypto-js/md5'
import formatBytes from 'helpers/format_bytes'
import ReactS3Client from 'helpers/ReactS3Client'
import { MDBBtn } from 'mdbreact'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { CardSubtitle, Col, Form, Row, Button } from 'reactstrap'
import SimpleToast from './alert/SimpleToast'

const UploadVideoDZ = ({ masterData, params }) => {
  const [acceptedVideoState, setAcceptedVideoState] = useState([])
  const [rejectedVideoState, setRejectedVideoState] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAcceptedVideo = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      }),
    )
    setAcceptedVideoState(files)
  }

  const handleRejectedVideo = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file.file),
        formattedSize: formatBytes(file.file.size),
      }),
    )
    setRejectedVideoState(files)
  }

  const handleOnDrop = (af, rf) => {
    setIsSubmitting(false)

    // reset previous rejected video on the state if exist
    if (rejectedVideoState.length > 0) setRejectedVideoState([])

    // set rejected video state with on drop rejected video
    if (rf.length > 0) handleRejectedVideo(rf)

    // set accepted video state with on drop accepted video
    handleAcceptedVideo(af)
    setAcceptedVideoState(af)
  }

  const handleSubmitUploadFile = async e => {
    e.preventDefault()
    console.log('Uploading...')

    if ((rejectedVideoState.length === 0) & (acceptedVideoState.length === 1)) {
      setIsSubmitting(true)

      try {
        // either upload video for company or for the media asset
        const fileID = params.companyID ? params.companyID : params.assetID

        const newFileName = `${md5(fileID).toString()}.vid`

        // get the 0 index because we only need 1 video from array. it should always consist only 1 vid.
        const res = await ReactS3Client.uploadFile(acceptedVideoState[0], newFileName)

        let videoObj
        let updateEndpoint
        if (params.companyID) {
          // for handling company's video
          videoObj = {
            companyID: fileID,
            video: res.location,
          }

          updateEndpoint = `/company/update`
        } else if (params.assetID) {
          // for handling media asset
          videoObj = {
            assetID: fileID,
            source: res.location,
          }

          updateEndpoint = `/asset/update`
        } else {
          throw 'params salah'
        }

        // send data to server to write into db
        const vidUpdRes = await fetch(process.env.REACT_APP_BASEURL + updateEndpoint, {
          method: 'PUT',
          body: JSON.stringify(videoObj),
        }).then(x => x.json())

        if (vidUpdRes.code >= 200 && vidUpdRes.code < 300 && !vidUpdRes.error) {
          SimpleToast.success(CW.toast.success.upload)
        } else {
          throw 'Error. check the response status code...'
        }
      } catch (e) {
        console.warn(e)
        SimpleToast.error(CW.toast.error.upload)
      }
    } else if (rejectedVideoState.length > 0) {
      console.log('There is/are file(s) that rejected... check back...')
      SimpleToast.warning(CW.toast.warning.upload)
    } else {
      console.log('There is no file... check back...')
      SimpleToast.info(CW.toast.info.upload)
    }

    setIsSubmitting(false)
    setAcceptedVideoState([])
    console.log('Process finish')
  }

  return (
    <>
      <Form onSubmit={e => handleSubmitUploadFile(e)}>
        {/* dropzone box */}
        <Dropzone
          accept="video/mp4"
          multiple={false}
          maxFiles={VIDEO_MAX_QTY}
          minSize={VIDEO_MIN_SIZE}
          maxSize={VIDEO_MAX_SIZE}
          onDrop={(af, rf) => handleOnDrop(af, rf)}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone">
              <div className="dz-message needsclick" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="mb-3">
                  <i className="mdi mdi-cloud-upload display-4 text-muted"></i>
                </div>
                <h4>Drop video here or click to upload.</h4>
              </div>
            </div>
          )}
        </Dropzone>

        {/* upload btn */}
        <div className="text-center mt-4">
          <Button
            type="submit"
            color={isSubmitting ? 'dark' : 'success'}
            disabled={rejectedVideoState.length > 0 || isSubmitting ? true : false}
          >
            {isSubmitting ? CW.button.submit.isUploading : CW.button.submit.uploadVideo}
          </Button>
        </div>

        {/* selected files card */}
        {rejectedVideoState.length > 0 ? (
          <div className="dropzone-previews mt-5 mb-5" id="video-previews">
            <CardSubtitle className="h5">Rejected video</CardSubtitle>
            <CardSubtitle className="mt-1 mb-3">
              Please check again to not exceed 200MB/video and only 1 video with{' '}
              <strong className="text-success">mp4 format</strong> allowed.
            </CardSubtitle>

            {rejectedVideoState.map((f, i) => {
              return (
                <Card
                  className="mt-1 mb-0 shadow-none border dz-processing dz-video-preview dz-success dz-complete text-muted"
                  key={i + '-file'}
                >
                  <div className="p-2">
                    <Row className="align-items-center flex-column-reverse gap-3">
                      <Col className="col-auto">
                        <a className="text-muted font-weight-bold">
                          <video
                            data-dz-thumbnail=""
                            height="360"
                            width="720"
                            className="col-12 rounded bg-light"
                            controls
                          >
                            <source src={f.preview} title={f.name} />
                          </video>
                        </a>
                      </Col>
                      <Col>
                        <a target="_blank" href={f.preview} className="text-muted font-weight-bold">
                          {f.errors ? (
                            <>
                              <p className="d-flex flex-column text-danger">
                                {f.errors.map(e => {
                                  return <span>{e.message}</span>
                                })}
                              </p>
                            </>
                          ) : null}
                          <span>{f.file.name}</span>
                          <p className="mb-0">
                            <strong>{f.formattedSize}</strong>
                          </p>
                        </a>
                      </Col>
                    </Row>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : null}

        {/* selected files card */}
        {acceptedVideoState.length > 0 ? (
          <div className="dropzone-previews mt-5 mb-5" id="video-previews">
            <CardSubtitle className="h5">Video ready to be uploaded</CardSubtitle>
            <CardSubtitle className="mt-1 mb-3">
              Please check if this is the right video to upload.
            </CardSubtitle>

            {acceptedVideoState.map((f, i) => {
              return (
                <Card
                  className="mt-1 mb-0 shadow-none border dz-processing dz-video-preview dz-success dz-complete"
                  key={i + '-file'}
                >
                  <div className="p-2">
                    <Row className="align-items-center flex-column-reverse gap-3">
                      <Col className="col-auto">
                        <a className="text-muted font-weight-bold">
                          <video
                            data-dz-thumbnail=""
                            height="360"
                            width="720"
                            className="col-12 rounded bg-light"
                            controls
                          >
                            <source src={f.preview} title={f.name} />
                          </video>
                        </a>
                      </Col>
                      <Col>
                        <a target="_blank" href={f.preview} className="text-muted font-weight-bold">
                          <span>{f.name}</span>
                          <p className="mb-0">
                            <strong>{f.formattedSize}</strong>
                          </p>
                        </a>
                      </Col>
                    </Row>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : null}
      </Form>
    </>
  )
}

export default UploadVideoDZ
