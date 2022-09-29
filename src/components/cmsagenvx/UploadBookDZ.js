import { Card } from '@material-ui/core'
import { BOOK_MAX_QTY, BOOK_MAX_SIZE, BOOK_MIN_SIZE } from 'const'
import CW from 'copywriting'
import md5 from 'crypto-js/md5'
import formatBytes from 'helpers/format_bytes'
import ReactS3Client from 'helpers/ReactS3Client'
import { MDBBtn } from 'mdbreact'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { CardSubtitle, Col, Form, Row } from 'reactstrap'
import SimpleToast from './alert/SimpleToast'

const UploadBookDZ = ({ masterData, params }) => {
  const [acceptedBookState, setAcceptedBookState] = useState([])
  const [rejectedBookState, setRejectedBookState] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAcceptedBook = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      }),
    )
    setAcceptedBookState(files)
  }

  const handleRejectedBook = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file.file),
        formattedSize: formatBytes(file.file.size),
      }),
    )
    setRejectedBookState(files)
  }

  const handleOnDrop = (af, rf) => {
    setIsSubmitting(false)

    // reset previous rejected book on the state if exist
    if (rejectedBookState.length > 0) setRejectedBookState([])

    // set rejected book state with on drop rejected book
    if (rf.length > 0) handleRejectedBook(rf)

    // set accepted book state with on drop accepted book
    handleAcceptedBook(af)
    setAcceptedBookState(af)
  }

  const handleSubmitUploadFile = async e => {
    e.preventDefault()
    console.log('Uploading...')

    if ((rejectedBookState.length === 0) & (acceptedBookState.length === 1)) {
      setIsSubmitting(true)

      try {
        const newFileName = `${md5(params.assetID).toString()}.book`

        // get the 0 index because we only need 1 video from array. it should always consist only 1 vid.
        const res = await ReactS3Client.uploadFile(acceptedBookState[0], newFileName)

        // send data to server to write into db
        const bookObj = {
          assetID: params.assetID,
          source: res.location,
        }

        const bookUpdRes = await fetch(process.env.REACT_APP_BASEURL + '/asset/update', {
          method: 'PUT',
          body: JSON.stringify(bookObj),
        }).then(x => x.json())

        if (bookUpdRes.code >= 200 && bookUpdRes.code < 300 && !bookUpdRes.error) {
          SimpleToast.success(CW.toast.success.upload)
        } else {
          throw 'Error. check the response status code...'
        }
      } catch (e) {
        console.warn(e)
        SimpleToast.error(CW.toast.error.upload)
      }
    } else if (rejectedBookState.length > 0) {
      console.log('There is/are file(s) that rejected... check back...')
      SimpleToast.warning(CW.toast.warning.upload)
    } else {
      console.log('There is no file... check back...')
      SimpleToast.info(CW.toast.info.upload)
    }

    setIsSubmitting(false)
    setAcceptedBookState([])
    console.log('Process finish')
  }

  return (
    <>
      <Form onSubmit={e => handleSubmitUploadFile(e)}>
        {/* dropzone box */}
        <Dropzone
          accept="application/pdf"
          multiple={false}
          maxFiles={BOOK_MAX_QTY}
          minSize={BOOK_MIN_SIZE}
          maxSize={BOOK_MAX_SIZE}
          onDrop={(af, rf) => handleOnDrop(af, rf)}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone">
              <div className="dz-message needsclick" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="mb-3">
                  <i className="mdi mdi-cloud-upload display-4 text-muted"></i>
                </div>
                <h4>Drop PDF book here or click to upload.</h4>
              </div>
            </div>
          )}
        </Dropzone>

        {/* upload btn */}
        <div className="text-center mt-4">
          <MDBBtn
            type="submit"
            color={isSubmitting ? 'dark' : 'success'}
            disabled={rejectedBookState.length > 0 || isSubmitting ? true : false}
          >
            {isSubmitting ? CW.button.submit.isUploading : CW.button.submit.uploadBook}
          </MDBBtn>
        </div>

        {/* selected files card */}
        {rejectedBookState.length > 0 ? (
          <div className="dropzone-previews mt-5 mb-5" id="book-previews">
            <CardSubtitle className="h5">Rejected book</CardSubtitle>
            <CardSubtitle className="mt-1 mb-3">
              Please check again to not exceed 200MB/book and only 1 book with{' '}
              <strong className="text-success">mp4 format</strong> allowed.
            </CardSubtitle>

            {rejectedBookState.map((f, i) => {
              return (
                <Card
                  className="mt-1 mb-0 shadow-none border dz-processing dz-book-preview dz-success dz-complete text-muted"
                  key={i + '-file'}
                >
                  <div className="p-2">
                    <Row className="align-items-center flex-column-reverse gap-3">
                      <Col className="col-auto">
                        <a className="text-muted font-weight-bold" href={f.preview} target="_blank">
                          {f.name}
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
        {acceptedBookState.length > 0 ? (
          <div className="dropzone-previews mt-5 mb-5" id="book-previews">
            <CardSubtitle className="h5">Book ready to be uploaded</CardSubtitle>
            <CardSubtitle className="mt-1 mb-3">
              Please check if this is the right book to upload.
            </CardSubtitle>

            {acceptedBookState.map((f, i) => {
              return (
                <Card
                  className="mt-1 mb-0 shadow-none border dz-processing dz-book-preview dz-success dz-complete"
                  key={i + '-file'}
                >
                  <div className="p-2">
                    <Row className="align-items-center flex-column gap-3">
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

export default UploadBookDZ
