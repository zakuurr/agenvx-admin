import { MDBDataTable, MDBBtn } from 'mdbreact'

import { Row, Col, Card, CardBody, CardTitle, Container, CardSubtitle } from 'reactstrap'

//Import Breadcrumb
import '../datatables.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import fetchData from 'helpers/fetchData'
import ErrorText from 'components/cmsagenvx/ErrorText'
import LoadingText from 'components/cmsagenvx/LoadingText'

const SourceBtn = ({ href }) => (
  <a href={href} target="_blank">
    <MDBBtn type="button" color="brown" className="h-100 btn-sm ps-3 pe-4 d-flex">
      <i className="mdi mdi-download me-2"></i>
      Download
    </MDBBtn>
  </a>
)

const UpdateBtn = ({ href }) => (
  <Link to={href}>
    <MDBBtn type="button" color="primary" className="h-100 btn-sm">
      Update
    </MDBBtn>
  </Link>
)

const columns = [
  {
    label: 'Media Name',
    field: 'assetName',
    sort: 'asc',
    width: 50,
  },
  {
    label: 'URL',
    field: 'url',
    sort: 'asc',
    width: 100,
  },
  {
    label: 'Source',
    field: 'source',
    sort: 'asc',
    width: 100,
  },
  {
    label: 'Action',
    field: 'action',
    sort: 'asc',
    width: 270,
  },
]

const MediaList = () => {
  const [dataMedia, setDataMedia] = useState([{}])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchData(`/asset/list`)
      .then(res => {
        setDataMedia(res)
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

  const rows = dataMedia.result.map((m, i) => ({
    ...m,
    url: (
      <a href={m.source} target="_blank">
        {m.source}
      </a>
    ),
    source: <SourceBtn href={m.source} />,
    action: <UpdateBtn href={`/media/edit/${m.assetID}`} />,
  }))


  console.log(dataMedia)

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">List of Media</CardTitle>
                  <CardSubtitle className="card-title-desc">
                    View and update media of book and video.
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

export default MediaList
