import { useState } from 'react'

import { MDBBtn } from 'mdbreact'
import { Row, CardBody, CardTitle, CardSubtitle, Form } from 'reactstrap'

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromHTML, ContentState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertToHTML } from 'draft-convert'

import { Link } from 'react-router-dom'
import SimpleToast from './alert/SimpleToast'
import CW from 'copywriting'

const CmpUpdateInfo = ({ masterData }) => {
  // build EditorState datatype for Editor initial content
  const fromHTML = convertFromHTML(masterData.description)
  const contentState = ContentState.createFromBlockArray(fromHTML.contentBlocks, fromHTML.entityMap)
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState))

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formInputData, setFormInputData] = useState({
    companyID: masterData.companyID,
    companyName: masterData.companyName || '',
    branch: masterData.branch || '',
    projectName: masterData.projectName || '',
    stream: masterData.stream || '',
    projectCategory: masterData.projectCategory || '',
    energySaving: masterData.energySaving || '',
    costSaving: masterData.costSaving || '',
    emissionSaving: masterData.emissionSaving || '',
    description: convertToHTML(editorState.getCurrentContent()) || '',
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

    fetch(process.env.REACT_APP_BASEURL + '/company/update', {
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
              <label htmlFor="companyName" className="col-md-8 col-form-label">
                Company Name <span className="text-danger">*</span>
              </label>
              <div className="col-md-12">
                <input
                  required
                  id="companyName"
                  className="form-control"
                  type="text"
                  placeholder="cth. PT. Maju jaya"
                  value={formInputData.companyName}
                  onChange={e =>
                    setFormInputData({ ...formInputData, companyName: e.target.value })
                  }
                />
              </div>
            </Row>

<Row className="mb-3 d-flex flex-column">
  <label htmlFor="branch" className="col-md-8 col-form-label">
    Project Name <span className="text-danger">*</span>
  </label>
  <div className="col-md-12">
    <input
      required
      id="branch"
      className="form-control"
      type="text"
      placeholder="cth. Proyek Jakarta Pusat"
      value={formInputData.branch}
      onChange={e =>
        setFormInputData({ ...formInputData, branch: e.target.value })
      }
    />
  </div>
</Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="projectName" className="col-md-8 col-form-label">
                Project Name <span className="text-danger">*</span>
              </label>
              <div className="col-md-12">
                <input
                  required
                  id="projectName"
                  className="form-control"
                  type="text"
                  placeholder="cth. Management Boarding System"
                  value={formInputData.projectName}
                  onChange={e =>
                    setFormInputData({ ...formInputData, projectName: e.target.value })
                  }
                />
              </div>
            </Row>

<Row className="mb-3 d-flex flex-column">
  <label htmlFor="stream" className="col-md-8 col-form-label">
    Stream <span className="text-danger">*</span>
  </label>
  <div className="col-md-12">
    <select
      required
      id="stream"
      className="form-control"
      value={formInputData.stream}
      onChange={e => setFormInputData({ ...formInputData, stream: e.target.value })}
    >
      <option value="" disabled>
        Select from dropdown list
      </option>
      <option value="OFFICE & BUILDING MANAGEMENT">Office & Building</option>
      <option value="FLEET FUEL">Fleet Fuel</option>
      <option value="MANUFACTURE">Manucfature</option>
    </select>
  </div>
</Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="projectCategory" className="col-md-8 col-form-label">
                Project Category <span className="text-danger">*</span>
              </label>
              <div className="col-md-12">
                <input
                  required
                  id="projectCategory"
                  className="form-control"
                  type="text"
                  placeholder="cth. Efisiensi Energi"
                  value={formInputData.projectCategory}
                  onChange={e =>
                    setFormInputData({ ...formInputData, projectCategory: e.target.value })
                  }
                />
              </div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="energySaving" className="col-md-8 col-form-label">
                Energy Saving <span className="text-danger">*</span>
              </label>
              <div className="col-md-12">
                <input
                  required
                  id="energySaving"
                  className="form-control"
                  type="text"
                  placeholder="cth. 27479.11"
                  value={formInputData.energySaving}
                  onChange={e =>
                    setFormInputData({ ...formInputData, energySaving: e.target.value })
                  }
                />
              </div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="costSaving" className="col-md-8 col-form-label">
                Cost Saving <span className="text-danger">*</span>
              </label>
              <div className="col-md-12">
                <input
                  required
                  id="costSaving"
                  className="form-control"
                  type="text"
                  placeholder="cth. 4.821.060.752,34"
                  value={formInputData.costSaving}
                  onChange={e => setFormInputData({ ...formInputData, costSaving: e.target.value })}
                />
              </div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="emissionSaving" className="col-md-8 col-form-label">
                Emission Saving <span className="text-danger">*</span>
              </label>
              <div className="col-d-12">
                <textarea
                  required
                  id="emissionSaving"
                  className="form-control"
                  rows="5"
                  placeholder="cth. Pengurangan Emisi Gas Rumah Kaca (GRK) Proses penurunan Solar Operasional Angkutan dan Pengolahan TBS 2,038.18 ton CO2eq per Agustus 2021."
                  value={formInputData.emissionSaving}
                  onChange={e =>
                    setFormInputData({ ...formInputData, emissionSaving: e.target.value })
                  }
                />
              </div>
            </Row>
          </CardBody>
        </div>

        {/* form desc */}
        <CardBody className="col-12 col-lg-7">
          <CardTitle className="h4">
            Update Description <span className="text-danger">*</span>
          </CardTitle>
          <CardSubtitle className="mb-3">Keep the company's description up-to-date</CardSubtitle>

          <label className="col-md-4 col-form-label">Company Description</label>
          <Editor
            required
            placeholder="    Company comprehensive description to explain the company better."
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            editorState={editorState}
            onEditorStateChange={e => handleEditorState(e)}
          />
        </CardBody>
      </div>

      {/* save and discard btn */}
      <div className="d-flex flex-column gap-2 mb-4 mt-4">
        <MDBBtn
          type="submit"
          className="col-9 col-md-4 mx-auto btn-success"
          disabled={isSubmitting ? true : false}
        >
          {CW.button.submit.saveUpdateForm}
        </MDBBtn>

        <Link to="/companies/list" className="col-9 col-md-4 mx-auto">
          <MDBBtn type="button" className="col-12 btn-outline-light text-dark">
            {CW.button.submit.discardForm}
          </MDBBtn>
        </Link>
      </div>
    </Form>
  )
}

export default CmpUpdateInfo
