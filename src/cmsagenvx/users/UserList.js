import ErrorText from 'components/cmsagenvx/ErrorText'
import LoadingText from 'components/cmsagenvx/LoadingText'
import fetchData from 'helpers/fetchData'
import { MDBDataTable } from 'mdbreact'
import { useEffect, useState } from 'react'
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap'

import '../datatables.scss'

const generateFakeData = () => {
  const arr = []

  for (let i = 1; i <= 50; i++) {
    arr.push({
      id: i,
      name: `Michael ${i}`,
      username: `username${i}`,
      email: <a href={`mailto:user${i}@agenvirtualx.com`}>user{i}@agenvirtualx.com</a>,
    })
  }

  return arr
}
const fakeDataUsers = generateFakeData().reverse()

const columns = [
  {
    label: 'Username',
    field: 'username',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'E-mail',
    field: 'email',
    sort: 'asc',
    width: 200,
  },
]

const UserList = () => {
  const [dataUsers, setDataUsers] = useState([{}])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchData(`/users/list`)
      .then(res => {
        setDataUsers(res)
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

  const rows = dataUsers.result.map(u => ({
    ...u,
    email: <a href={`mailto:${u.email}`}>{u.email}</a>,
  }))

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">List of Users</CardTitle>
                  <CardSubtitle className="card-title-desc">Only view users data.</CardSubtitle>

                  <MDBDataTable responsive bordered hover data={{ columns, rows }} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default UserList
