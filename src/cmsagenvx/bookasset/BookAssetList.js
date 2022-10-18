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
  import axios from "axios"
  import '../datatables.scss'
  import { Link } from 'react-router-dom'
  import { useEffect, useState } from 'react'
  import fetchData from 'helpers/fetchData'
  import LoadingText from 'components/cmsagenvx/LoadingText'
  import ErrorText from 'components/cmsagenvx/ErrorText'
  import { capsEveryWord } from 'helpers/formatText'


  const columns = [
    {
      label: 'Asset Name',
      field: 'assetName',
      sort: 'asc',
      width: 150,
    },
    {
      label: 'Source',
      field: 'source',
      sort: 'asc',
      width: 270,
    },
    {
      label: 'Type',
      field: 'type',
      sort: 'asc',
      width: 200,
    },
    {
      label: 'Description',
      field: 'description',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'Image',
      field: 'image',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'Year',
      field: 'year',
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
  
  const BookAssetList = () => {
    const [dataBook, setDataBookList] = useState([{}])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    useEffect(() => {
      fetchData(`/asset/list/book`)
        .then(res => {
        setDataBookList(res)
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
  
    const rows = dataBook.result.map(dataAPI => ({
      ...dataAPI,
      action:(
        <MDBDropdown>
        <MDBDropdownToggle tag='a' className='btn btn-primary'>
          Option
        </MDBDropdownToggle>
        <MDBDropdownMenu>
        <a href={dataAPI.source}>
          <MDBDropdownItem link>Open</MDBDropdownItem>
        </a>
          <Link to={`/book/edit/${dataAPI.assetID}`}>
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
                    <CardTitle className="h4">List of Book Asset</CardTitle>
                    <CardSubtitle className="card-title-desc">
                      View detail and update book data.
                      <Link to="/book/add" className="button btn btn-primary mt-2" style={{
          
          float: "right",
        }}>Add</Link>
                      
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
  
  export default BookAssetList
  