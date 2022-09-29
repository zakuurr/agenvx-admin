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
import UploadBookDZ from 'components/cmsagenvx/UploadBookDZ'
import { mediaAssets } from 'routes/allRoutes'

const BookEdit = ({ match, ...rest }) => {
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

                  <CardTitle className="mt-4 h4">Update PDF Book File</CardTitle>
                  <CardSubtitle className="mb-4">
                    Keep the PDF book up-to-date.
                  </CardSubtitle>

                  <Nav tabs className="nav-tabs-custom">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === '1',
                        })}
                        onClick={() => setActiveTab('1')}
                      >
                        <span className="d-none d-sm-block">PDF Book</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab} className="p-3 text-muted">
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <CardBody>
                            <CardTitle className="h4">Upload PDF Book File</CardTitle>
                            <CardSubtitle className="mb-3">Maks. 50MB & only 1 PDF file</CardSubtitle>
                            <CardSubtitle className="mb-3">
                              Previous uploaded PDF book will be replaced
                            </CardSubtitle>

                            <div className="mb-5">
                              <UploadBookDZ params={{ assetID: mediaAssets.bookAssetID }} />
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

export default BookEdit
