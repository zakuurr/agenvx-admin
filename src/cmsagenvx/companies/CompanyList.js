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
    action:(
      <MDBDropdown>
      <MDBDropdownToggle tag='a' className='btn btn-primary'>
        Option
      </MDBDropdownToggle>
      <MDBDropdownMenu>
        <Link to={`/companies/detail/${dataAPI.companyID}`}>
          <MDBDropdownItem link>Detail</MDBDropdownItem>
        </Link>
        <Link to={`/companies/edit/${dataAPI.companyID}`}>
          <MDBDropdownItem link>Edit</MDBDropdownItem>
        </Link>
        {/* <Link to={`/companies/edit/${dataAPI.companyID}`}>
          <MDBDropdownItem link>Delete</MDBDropdownItem>
        </Link> */}
      </MDBDropdownMenu>
    </MDBDropdown>
    )
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
