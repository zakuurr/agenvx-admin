import ErrorText from 'components/cmsagenvx/ErrorText'
import LoadingText from 'components/cmsagenvx/LoadingText'
import fetchData from 'helpers/fetchData'
import { MDBDataTable } from 'mdbreact'
import { useEffect, useState } from 'react'
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap'

import '../datatables.scss'

const generateFakeData = () => {
  const a = []

  for (let i = 1; i <= 50; i++) {
    a.push({
      id: i,
      name: `Michael ${i}`,
      username: `username${i}`,
      lastAccess: new Date().toUTCString(),
      score: `39`,
    })
  }

  return a
}
const fakeDataLeaderboard = generateFakeData().reverse()

const columns = [
  {
    label: 'User ID',
    field: 'userId',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'Username',
    field: 'username',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'Access Time',
    field: 'accessTime',
    sort: 'asc',
    width: 200,
  },
  {
    label: 'Score',
    field: 'score',
    sort: 'asc',
    width: 30,
  },
  // {
  //   label: 'Action',
  //   field: 'action',
  //   sort: 'asc',
  //   width: 100,
  // },
]

const LeaderboardList = () => {
  const [dataLeaderboard, setDataLeaderboard] = useState([{}])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchData(`/leaderboard/list`)
      .then(res => {
        setDataLeaderboard(res)
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

  // format date to be readable
  const formattedData = dataLeaderboard.result.map(row => {
    const dateInstance = new Date(row.accessTime)
    const time = `${dateInstance.getHours()}:${dateInstance.getMinutes()}:${dateInstance.getSeconds()}`
    const date = `${dateInstance.getDate()}-${dateInstance.getMonth()}-${dateInstance.getFullYear()}`

    return {
      ...row,
      accessTime: `${date}, ${time}`,
    }
  })

  const rows = formattedData

  // temply disable leaderboard detail
  // const rows = resAPI.result.list.map(dataAPI => ({
  //   ...dataAPI,
  //   action: (
  //     <MDBBtnGroup>
  //       <MDBBtnGroup>
  //         <MDBDropdown>
  //           <MDBDropdownToggle
  //             caret
  //             color="success"
  //             className="h-100 mdi mdi-menu-down d-flex flex-row-reverse"
  //           >
  //             Option
  //           </MDBDropdownToggle>
  //           <MDBDropdownMenu basic color="success">
  //             <Link to={`/leaderboard/detail/${dataAPI.id}`}>
  //               <MDBDropdownItem>Detail</MDBDropdownItem>
  //             </Link>
  //           </MDBDropdownMenu>
  //         </MDBDropdown>
  //       </MDBBtnGroup>
  //     </MDBBtnGroup>
  //   ),
  // }))

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Leaderboard</CardTitle>
                  <CardSubtitle className="card-title-desc">
                    Only view scoring leaderboard data.
                  </CardSubtitle>

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

export default LeaderboardList
