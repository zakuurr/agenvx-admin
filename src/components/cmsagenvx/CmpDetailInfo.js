import { capsEveryWord } from 'helpers/formatText'
import parse from 'html-react-parser'
import { CardBody, Row } from 'reactstrap'

const CmpDetailInfo = ({ masterData }) => {
  return (
    <div className="col-12 d-flex flex-column">
      <div className="col-12 d-flex flex-column flex-lg-row">
        {/* section general info */}
        <div className="col-12 col-lg-5 d-flex flex-column">
          <CardBody className="col-12">
            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="companyName" className="col-md-8 col-form-label">
                Company Name
              </label>
              <div className="col-md-12">{masterData.companyName || '-'}</div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="projectName" className="col-md-8 col-form-label">
                Company Branch
              </label>
              <div className="col-md-12">{masterData.branch || '-'}</div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="projectName" className="col-md-8 col-form-label">
                Project Name
              </label>
              <div className="col-md-12">{masterData.projectName || '-'}</div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="stream" className="col-md-8 col-form-label">
                Stream
              </label>
              <div className="col-md-12">{capsEveryWord(masterData.stream) || '-'}</div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="projectCategory" className="col-md-8 col-form-label">
                Project Category
              </label>
              <div className="col-md-12">{masterData.projectCategory || '-'}</div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="energySaving" className="col-md-8 col-form-label">
                Energy Saving
              </label>
              <div className="col-md-12">{masterData.energySaving || '-'}</div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="costSaving" className="col-md-8 col-form-label">
                Cost Saving
              </label>
              <div className="col-md-12">{masterData.costSaving || '-'}</div>
            </Row>

            <Row className="mb-3 d-flex flex-column">
              <label htmlFor="projectName" className="col-md-8 col-form-label">
                Emission Saving
              </label>
              <div className="col-md-12">{masterData.emissionSaving || '-'}</div>
            </Row>
          </CardBody>
        </div>

        {/* section desc */}
        <CardBody className="col-12 col-lg-7">
          <Row className="mb-3 d-flex flex-column">
            <label htmlFor="projectName" className="col-md-8 col-form-label">
              Company Description
            </label>
            <div className="col-md-12">{parse(`<p>${masterData.description || '-'}</p>`)}</div>
          </Row>
        </CardBody>
      </div>
    </div>
  )
}

export default CmpDetailInfo
