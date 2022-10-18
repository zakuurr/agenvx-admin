import { useState } from 'react'

import { MDBBtn } from 'mdbreact'
import { Row, CardBody, CardTitle, CardSubtitle, Form, Button } from 'reactstrap'

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromHTML, ContentState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertToHTML } from 'draft-convert'

import { Link } from 'react-router-dom'
import SimpleToast from './alert/SimpleToast'
import CW from 'copywriting'

const CmpUpdateInfoBook = ({ masterData }) => {
  // build EditorState datatype for Editor initial content
  const fromHTML = convertFromHTML(masterData.description)
  const contentState = ContentState.createFromBlockArray(fromHTML.contentBlocks, fromHTML.entityMap)
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState))

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formInputData, setFormInputData] = useState({
    assetID: masterData.assetID,
    assetName: masterData.assetName || '',
    source: masterData.source || '',
    type: masterData.type || '',
    description: masterData.description || '',
    image: masterData.image || '',
   })

  /** @param {EditorState} e */
  const handleEditorState = e => {
    setEditorState(e)
    setFormInputData({
      ...formInputData,
      description: convertToHTML(editorState.getCurrentContent()),
    })
  }

  /**
   * reset at every submit:
   * set is submit = true, then set submit success = false
   *
   * fetch data
   *
   * success:
   *  set submit success = true
   *
   * failed:
   *  set submit success = false
   *
   * finally:
   *  set is submit = false
   */
  const handleOnSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)

    fetch(process.env.REACT_APP_BASEURL + '/asset/update', {
      method: 'PUT',
      body: JSON.stringify(formInputData),
      // mode: 'cors',
      // credentials: 'same-origin',
      // headers: {
      //   'Content-type': 'application/json',
      //   'Connection': 'keep-alive',
      // },
    })
      .then(x => x.json())
      .then(y => {
        if (y.code >= 200 && y.code < 300 && !y.error) {
          SimpleToast.success(CW.toast.success.updateCompanyGeneralInfo)
        } else {
          throw 'Error. check the response status code...'
        }
      })
      .catch(z => {
        SimpleToast.error(CW.toast.error.updateCompanyGeneralInfo)
        console.warn(z)
      })
      .finally(_ => setIsSubmitting(false))
  }

  return (
    <Form onSubmit={e => handleOnSubmit(e)} className="col-12 d-flex flex-column">
      <div className="col-12 d-flex flex-column flex-lg-row">
        {/* form general info */}
        <div className="col-12 col-lg-5 d-flex flex-column">
          <CardBody className="col-12">
            <CardTitle className="h4">Update General Info</CardTitle>
            <CardSubtitle className="mb-3">Keep the company's general info up-to-date</CardSubtitle>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="assetName" className="col-md-8 col-form-label">
                Asset Name <span className="text-danger">*</span>
              </label>
              <div className="col-md-12">
                <input
                  required
                  id="assetName"
                  className="form-control"
                  type="text"
                  placeholder="cth. PT. Maju jaya"
                  value={formInputData.assetName}
                  onChange={e =>
                    setFormInputData({ ...formInputData, assetName: e.target.value })
                  }
                />
              </div>
            </Row>

<Row className="mb-3 d-flex flex-column">
  <label htmlFor="branch" className="col-md-8 col-form-label">
  source <span className="text-danger">*</span>
  </label>
  <div className="col-md-12">
    <input
      required
      id="source"
      className="form-control"
      type="text"
      placeholder="cth. Proyek Jakarta Pusat"
      value={formInputData.source}
      onChange={e =>
        setFormInputData({ ...formInputData, source: e.target.value })
      }
    />
  </div>
</Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="projectName" className="col-md-8 col-form-label">
              assetName <span className="text-danger">*</span>
              </label>
              <div className="col-md-12">
                <input
                  required
                  id="assetName"
                  className="form-control"
                  type="text"
                  placeholder="cth. Management Boarding System"
                  value={formInputData.assetName}
                  onChange={e =>
                    setFormInputData({ ...formInputData, assetName: e.target.value })
                  }
                />
              </div>
            </Row>



            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="type" className="col-md-8 col-form-label">
                type <span className="text-danger">*</span>
              </label>
              <div className="col-md-12">
                <input
                  required
                  id="type"
                  className="form-control"
                  type="text"
                  placeholder="cth. Efisiensi Energi"
                  value={formInputData.type}
                  onChange={e =>
                    setFormInputData({ ...formInputData, type: e.target.value })
                  }
                />
              </div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="description" className="col-md-8 col-form-label">
                description <span className="text-danger">*</span>
              </label>
              <div className="col-md-12">
                <input
                  required
                  id="description"
                  className="form-control"
                  type="text"
                  placeholder="cth. 27479.11"
                  value={formInputData.description}
                  onChange={e =>
                    setFormInputData({ ...formInputData, description: e.target.value })
                  }
                />
              </div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="image" className="col-md-8 col-form-label">
                image <span className="text-danger">*</span>
              </label>
              <div className="col-md-12">
                <input
                  required
                  id="image"
                  className="form-control"
                  type="text"
                  placeholder="cth. 4.821.060.752,34"
                  value={formInputData.image}
                  onChange={e => setFormInputData({ ...formInputData, image: e.target.value })}
                />
              </div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="year" className="col-md-8 col-form-label">
              year <span className="text-danger">*</span>
              </label>
              <div className="col-d-12">
                <textarea
                  required
                  id="year"
                  className="form-control"
                  rows="5"
                  placeholder="cth. Pengurangan Emisi Gas Rumah Kaca (GRK) Proses penurunan Solar Operasional Angkutan dan Pengolahan TBS 2,038.18 ton CO2eq per Agustus 2021."
                  value={formInputData.year}
                  onChange={e =>
                    setFormInputData({ ...formInputData, year: e.target.value })
                  }
                />
              </div>
            </Row>
          </CardBody>
        </div>

      </div>

      {/* save and discard btn */}
      <div className="d-flex flex-column gap-2 mb-4 mt-4">
        <Button
          type="submit"
          className="col-9 col-md-4 mx-auto btn-success"
          disabled={isSubmitting ? true : false}
        >
          {CW.button.submit.saveUpdateForm}
        </Button>

        <Link to="/book/list" className="col-9 col-md-4 mx-auto">
          <Button type="button" className="col-12 btn-outline-light text-dark">
            {CW.button.submit.discardForm}
          </Button>
        </Link>
      </div>
    </Form>
  )
}

export default CmpUpdateInfoBook
