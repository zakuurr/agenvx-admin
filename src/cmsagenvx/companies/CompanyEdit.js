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

import CmpUpdateInfo from 'components/cmsagenvx/CmpUpdateInfo'
import UploadVideoDZ from 'components/cmsagenvx/UploadVideoDZ'
import UploadImageDZ from 'components/cmsagenvx/UploadImageDZ'

import { MDBBtn } from 'mdbreact'
import { Redirect } from 'react-router-dom'
import LoadingText from 'components/cmsagenvx/LoadingText'
import ErrorText from 'components/cmsagenvx/ErrorText'
import fetchData from 'helpers/fetchData'
import ReactS3Client from 'helpers/ReactS3Client'
import { PHOTO_MAX_QTY, VIDEO_MAX_QTY } from 'const'

import md5 from 'crypto-js/md5'
import SimpleToast from 'components/cmsagenvx/alert/SimpleToast'
import CW from 'copywriting'

const CompanyEdit = ({ match, ...rest }) => {
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

  /**
   *
   * @param {*} e
   * @param {'images' | 'video'} type
   * @returns
   */
  const handleOnClickDelete = async (e, type) => {
    e.preventDefault()

    let dataObj

    try {
      if (type === 'images') {
        // deleting files from bucket is still error, regarding the https url that currently in using
        // perhaps if the url is fully https we can do this later.
        // but for now, we only updating data on db so it will have an empty array
        //
        // let res = []
        // for (let i = 0; i < PHOTO_MAX_QTY; i++) {
        //   const imgName = `${md5(match.params.companyID).toString()}.img.${++i}`
        //   const response = await ReactS3Client.deleteFile(imgName)

        //   console.log(response)
        //   res.push(response)
        // }

        // send data to server to write into db
        dataObj = {
          companyID: match.params.companyID,
          images: [],
        }
      } else if (type === 'video') {
        // deleting files from bucket is still error, regarding the https url that currently in using
        // perhaps if the url is fully https we can do this later.
        // but for now, we only updating data on db so it will have an empty string
        //
        // const vidName = `${md5(match.params.companyID).toString()}.vid`
        // const response = await ReactS3Client.deleteFile(vidName)

        // send data to server to write into db
        dataObj = {
          companyID: match.params.companyID,
          video: ' ',
        }
      } else {
        throw 'file type schema error...'
      }

      const fileUpdRes = await fetch(process.env.REACT_APP_BASEURL + '/company/update', {
        method: 'PUT',
        body: JSON.stringify(dataObj),
      }).then(x => x.json())

      if (fileUpdRes.code >= 200 && fileUpdRes.code < 300 && !fileUpdRes.error) {
        SimpleToast.success(CW.toast.success.deleteFile)
      } else {
        throw 'Error. check the response status code...'
      }
    } catch (e) {
      console.warn(e)
      SimpleToast.error(CW.toast.error.deleteFile)
    }

    console.log('Process finish')
  }

  // console.log(dataCompany)
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
                    <Link to={`/${rootMenuPath}/detail/${dataCompany.result.companyID}`}>
                      <MDBBtn type="button" color="danger">
                        View detail & Discard changes
                      </MDBBtn>
                    </Link>
                  </div>

                  <CardTitle className="mt-4 h4">Update Company Information & Media</CardTitle>
                  <CardSubtitle className="mb-4">
                    Keep the company's general info up-to-date
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
                          <CmpUpdateInfo
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
                            <div className="justify-content-between d-flex">
                              <Col>
                                <CardTitle className="h4">Upload Photos</CardTitle>
                                <CardSubtitle className="mb-3">Maks. 12pcs & 10MB/pcs</CardSubtitle>
                                <CardSubtitle className="mb-3">
                                  All previous uploaded photos for this company will be replaced,
                                  please upload every photos included the one that is not changing
                                </CardSubtitle>
                              </Col>

                              {/* TODO: add conditional */}
                              <div>
                                <MDBBtn
                                  type="button"
                                  className="btn-outline-danger"
                                  size="sm"
                                  onClick={e => handleOnClickDelete(e, 'images')}
                                >
                                  Delete all photos
                                </MDBBtn>
                              </div>
                            </div>

                            <div className="mb-5">
                              <UploadImageDZ
                                masterData={dataCompany.result}
                                params={{ companyID: match.params.companyID }}
                              />
                            </div>
                          </CardBody>
                        </Col>
                      </Row>
                    </TabPane>

                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <CardBody>
                            <div className="justify-content-between d-flex">
                              <Col>
                                <CardTitle className="h4">Upload Video</CardTitle>
                                <CardSubtitle className="mb-3">
                                  Maks. 200MB & only 1 video
                                </CardSubtitle>
                                <CardSubtitle className="mb-3">
                                  Previous uploaded video for this company will be replaced
                                </CardSubtitle>
                              </Col>

                              {/* TODO: add conditional */}
                              <div>
                                <MDBBtn
                                  type="button"
                                  className="btn-outline-danger"
                                  size="sm"
                                  onClick={e => handleOnClickDelete(e, 'video')}
                                >
                                  Delete all video
                                </MDBBtn>
                              </div>
                            </div>

                            <div className="mb-5">
                              <UploadVideoDZ
                                masterData={dataCompany.result}
                                params={{ companyID: match.params.companyID }}
                              />
                            </div>
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

export default CompanyEdit
