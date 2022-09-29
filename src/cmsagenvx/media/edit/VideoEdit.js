import React, { useState } from 'react'
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
// import he from 'he'
// import { convertToHTML } from 'draft-convert'

import { Link } from 'react-router-dom'

import classnames from 'classnames'
import UploadVideoDZ from 'components/cmsagenvx/UploadVideoDZ'
import { mediaAssets } from 'routes/allRoutes'

const VideoEdit = ({ match, ...rest }) => {
  const rootMenuPath = rest.location.pathname.split('/')[1]
  const [activeTab, setActiveTab] = useState('1')

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col>
              <Card>
                <CardBody className="m-3">
                  <Link to={`/${rootMenuPath}/list`}>
                    <i className="mdi mdi-keyboard-backspace"></i> Back to list
                  </Link>

                  <CardTitle className="mt-4 h4">Update video File</CardTitle>
                  <CardSubtitle className="mb-4">
                    Keep the video file up-to-date.
                  </CardSubtitle>

                  <Nav tabs className="nav-tabs-custom">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === '1',
                        })}
                        onClick={() => setActiveTab('1')}
                      >
                        <span className="d-none d-sm-block">Video</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab} className="p-3 text-muted">
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <CardBody>
                            <CardTitle className="h4">Upload Video</CardTitle>
                            <CardSubtitle className="mb-3">Maks. 200MB & only 1 video</CardSubtitle>
                            <CardSubtitle className="mb-3">
                              Previous uploaded video will be replaced
                            </CardSubtitle>

                            <div className="mb-5">
                              <UploadVideoDZ params={{ assetID: mediaAssets.videoAssetID }} />
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

export default VideoEdit
