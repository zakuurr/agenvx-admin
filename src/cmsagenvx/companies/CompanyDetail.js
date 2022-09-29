import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { Link } from 'react-router-dom'

import classnames from 'classnames'

import CmpDetailInfo from 'components/cmsagenvx/CmpDetailInfo'
import CmpDetailPhoto from 'components/cmsagenvx/CmpDetailPhoto'
import CmpDetailVideo from 'components/cmsagenvx/CmpDetailVideo'

import { MDBBtn } from 'mdbreact'
import { Redirect } from 'react-router-dom'
import fetchData from 'helpers/fetchData'
import LoadingText from 'components/cmsagenvx/LoadingText'
import ErrorText from 'components/cmsagenvx/ErrorText'

const CompanyDetail = ({ match, ...rest }) => {
  const rootMenuPath = rest.location.pathname.split('/')[1]
  const [activeTab, setActiveTab] = useState('1')

  const [dataCompany, setDataCompany] = useState([{}])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchData(`/company/${match.params.companyID}`)
      .then(res => {
        setDataCompany(res)
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

  if (dataCompany.result.companyID === '00000000-0000-0000-0000-000000000000') {
    return <Redirect to="/companies/list" />
  }

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col>
              <Card>
                <CardBody className="m-3">
                  <div className="justify-content-between d-flex">
                    <Link to={`/${rootMenuPath}/list`}>
                      <i className="mdi mdi-keyboard-backspace"></i> Back to list
                    </Link>
                    <Link to={`/${rootMenuPath}/edit/${dataCompany.result.companyID}`}>
                      <MDBBtn type="button" color="success">
                        Update Data
                      </MDBBtn>
                    </Link>
                  </div>

                  <CardTitle className="mt-4 h4 d-flex flex-column">
                    <span>
                      Company ID: <span className="fw-normal">{dataCompany.result.companyID}</span>
                    </span>
                    <span>
                      Company Name:{' '}
                      <span className="fw-normal">{dataCompany.result.companyName}</span>
                    </span>
                  </CardTitle>
                  <CardTitle className="mt-4 h4">Company Information & Media</CardTitle>
                  <CardSubtitle className="mb-4">
                    Explore company's general info & media
                  </CardSubtitle>

                  <Nav tabs className="nav-tabs-custom">
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => setActiveTab('1')}
                      >
                        <span className="d-none d-sm-block">General Info</span>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => setActiveTab('2')}
                      >
                        <span className="d-none d-sm-block">Photos</span>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => setActiveTab('3')}
                      >
                        <span className="d-none d-sm-block">Video</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab} className="p-3 text-muted">
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <CmpDetailInfo
                            masterData={dataCompany.result}
                            params={{ companyID: match.params.companyID }}
                          />
                        </Col>
                      </Row>
                    </TabPane>

                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <CardBody>
                            <CmpDetailPhoto
                              masterData={dataCompany.result}
                              params={{ companyID: match.params.companyID }}
                            />
                          </CardBody>
                        </Col>
                      </Row>
                    </TabPane>

                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <CardBody>
                            <CmpDetailVideo
                              masterData={dataCompany.result}
                              params={{ companyID: match.params.companyID }}
                            />
                          </CardBody>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default CompanyDetail
