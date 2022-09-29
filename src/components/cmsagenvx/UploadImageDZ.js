import { Card } from '@material-ui/core'
import { PHOTO_MAX_QTY, PHOTO_MAX_SIZE, PHOTO_MIN_SIZE } from 'const'
import CW from 'copywriting'
import md5 from 'crypto-js/md5'
import formatBytes from 'helpers/format_bytes'
import ReactS3Client from 'helpers/ReactS3Client'
import { MDBBtn } from 'mdbreact'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { CardSubtitle, Col, Form, Row } from 'reactstrap'
import SimpleToast from './alert/SimpleToast'

const UploadImageDZ = ({ masterData, params }) => {
  const [acceptedImagesState, setAcceptedImagesState] = useState([])
  const [rejectedImagesState, setRejectedImagesState] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAcceptedImages = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      }),
    )
    setAcceptedImagesState(files)
  }

  const handleRejectedImages = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file.file),
        formattedSize: formatBytes(file.file.size),
      }),
    )
    setRejectedImagesState(files)
  }

  const handleOnDrop = (af, rf) => {
    setIsSubmitting(false)

    // reset previous rejected image on the state if exist
    if (rejectedImagesState.length > 0) setRejectedImagesState([])

    // set rejected images state with on drop rejected images
    if (rf.length > 0) handleRejectedImages(rf)

    // set accepted images state with on drop accepted images
    handleAcceptedImages(af)
    setAcceptedImagesState(af)
  }

  const handleSubmitUploadFile = async e => {
    e.preventDefault()
    console.log('Uploading...')

    if ((rejectedImagesState.length === 0) & (acceptedImagesState.length > 0)) {
      setIsSubmitting(true)

      try {
        const res = []
        let i = 0
        for (const f of acceptedImagesState) {
          const newFileName = `${md5(params.companyID).toString()}.img.${++i}`

          const asd = await ReactS3Client.uploadFile(f, newFileName)

          res.push(asd)
        }

        // send data to server to write into db
        const imagesObj = {
          companyID: params.companyID,
          images: res.map(x => x.location),
        }

        const imgUpdRes = await fetch(process.env.REACT_APP_BASEURL + '/company/update', {
          method: 'PUT',
          body: JSON.stringify(imagesObj),
        }).then(x => x.json())

        if (imgUpdRes.code >= 200 && imgUpdRes.code < 300 && !imgUpdRes.error) {
          SimpleToast.success(CW.toast.success.upload)
        } else {
          throw 'Error. check the response status code...'
        }
      } catch (e) {
        console.warn(e)
        SimpleToast.error(CW.toast.error.upload)
      }
    } else if (rejectedImagesState.length > 0) {
      console.log('There is/are file(s) that rejected... check back...')
      SimpleToast.warning(CW.toast.warning.upload)
    } else {
      console.log('There is no file... check back...')
      SimpleToast.info(CW.toast.info.upload)
    }

    setIsSubmitting(false)
    setAcceptedImagesState([])
    console.log('Process finish')
  }

  return (
    <>
      <Form onSubmit={e => handleSubmitUploadFile(e)}>
        {/* dropzone box */}
        <Dropzone
          accept="image/png, image/jpeg"
          multiple={true}
          maxFiles={PHOTO_MAX_QTY}
          minSize={PHOTO_MIN_SIZE}
          maxSize={PHOTO_MAX_SIZE}
          onDrop={(af, rf) => handleOnDrop(af, rf)}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone">
              <div className="dz-message needsclick" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="mb-3">
                  <i className="mdi mdi-cloud-upload display-4 text-muted"></i>
                </div>
                <h4>Drop images here or click to upload.</h4>
              </div>
            </div>
          )}
        </Dropzone>

        {/* upload btn */}
        <div className="text-center mt-4">
          <MDBBtn
            type="submit"
            color={isSubmitting ? 'dark' : 'success'}
            disabled={rejectedImagesState.length > 0 || isSubmitting ? true : false}
          >
            {isSubmitting ? CW.button.submit.isUploading : CW.button.submit.uploadImages}
          </MDBBtn>
        </div>

        {/* selected files card */}
        {rejectedImagesState.length > 0 ? (
          <div className="dropzone-previews mt-5 mb-5" id="image-previews">
            <CardSubtitle className="h5">Rejected images</CardSubtitle>
            <CardSubtitle className="mt-1 mb-3">
              Please check again to not exceed 10MB/image and max images is 12 images.
            </CardSubtitle>

            {rejectedImagesState.map((f, i) => {
              return (
                <Card
                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete text-muted"
                  key={i + '-file'}
                >
                  <div className="p-2">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a target="_blank" href={f.preview} className="text-muted font-weight-bold">
                          <img
                            data-dz-thumbnail=""
                            height="144"
                            width="144"
                            className="col-12 rounded bg-light"
                            src={f.preview}
                          />
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
        {acceptedImagesState.length > 0 ? (
          <div className="dropzone-previews mt-5 mb-5" id="image-previews">
            <CardSubtitle className="h5">Images ready to be uploaded</CardSubtitle>
            <CardSubtitle className="mt-1 mb-3">
              Please check if these are the right images to upload.
            </CardSubtitle>

            {acceptedImagesState.map((f, i) => {
              return (
                <Card
                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                  key={i + '-file'}
                >
                  <div className="p-2">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a target="_blank" href={f.preview} className="text-muted font-weight-bold">
                          <img
                            data-dz-thumbnail=""
                            height="144"
                            className="col-12 rounded bg-light"
                            alt={f.name}
                            src={f.preview}
                          />
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

export default UploadImageDZ
