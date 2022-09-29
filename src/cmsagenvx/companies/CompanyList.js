import {
  MDBDataTable,
  MDBBtnGroup,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact'

import { Row, Col, Card, CardBody, CardTitle, Container, CardSubtitle } from 'reactstrap'

//Import Breadcrumb
import '../datatables.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import fetchData from 'helpers/fetchData'
import LoadingText from 'components/cmsagenvx/LoadingText'
import ErrorText from 'components/cmsagenvx/ErrorText'
import { capsEveryWord } from 'helpers/formatText'

const columns = [
  {
    label: 'Company Name',
    field: 'companyName',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'Branch',
    field: 'branch',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'Project Name',
    field: 'projectName',
    sort: 'asc',
    width: 200,
  },
  {
    label: 'Stream',
    field: 'stream',
    sort: 'asc',
    width: 100,
  },
  {
    label: 'Project Category',
    field: 'projectCategory',
    sort: 'asc',
    width: 100,
  },
  {
    label: 'Action',
    field: 'action',
    sort: 'asc',
    width: 100,
  },
]

const CompanyList = () => {
  const [dataCompanies, setDataCompanies] = useState([{}])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchData(`/company/list`)
      .then(res => {
        setDataCompanies(res)
        setError(false)
      })
      .catch(err => {
        setError(true)
        console.log(err)
      })
      .finally(_ => {
        setLoading(false)
      })
  }, [])

  if (loading) return <LoadingText></LoadingText>
  if (error) return <ErrorText></ErrorText>

  const rows = dataCompanies.result.map(dataAPI => ({
    ...dataAPI,
    stream: capsEveryWord(dataAPI.stream),
    action: (
      <MDBBtnGroup>
        <MDBBtnGroup>
          <MDBDropdown>
            <MDBDropdownToggle
              caret
              color="primary"
              className="h-100 mdi mdi-menu-down d-flex flex-row-reverse btn-sm"
            >
              Option
            </MDBDropdownToggle>
            <MDBDropdownMenu basic color="primary">
              <Link to={`/companies/detail/${dataAPI.companyID}`}>
                <MDBDropdownItem>Detail</MDBDropdownItem>
              </Link>
              <Link to={`/companies/edit/${dataAPI.companyID}`}>
                <MDBDropdownItem>Update</MDBDropdownItem>
              </Link>
              {/* <MDBDropdownItem className="text-danger">Detele</MDBDropdownItem> */}
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBBtnGroup>
      </MDBBtnGroup>
    ),
  }))

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">List of Companies</CardTitle>
                  <CardSubtitle className="card-title-desc">
                    View detail and update company data.
                  </CardSubtitle>

                  <MDBDataTable responsive bordered hover data={{ columns, rows }} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default CompanyList
