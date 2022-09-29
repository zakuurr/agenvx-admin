import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import React from "react"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError } from "../../store/actions"

// import images
import logoDefault from "../../assets/images/agen_logo.png";

const Login = props => {
  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    console.log(props.loginUser(values, props.history))
  }

  return (
    <>
      {/* <MetaTags>
        <title>Login | Veltrix - Responsive Bootstrap 5 Admin Dashboard</title>
      </MetaTags> */}
      {/* <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div> */}
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-dark">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20">
                      Welcome Back !
                    </h5>
                    <p className="text-white-50">
                      Login to admin dashboard<br />
                      Astra Green Energy Virtual Exhibition 2021.
                    </p>
                    <Link to="/" className="logo logo-admin">
                      <img src={logoDefault} height="24" alt="logo" />
                    </Link>
                  </div>
                </div>

                <CardBody className="p-4">
                  <div className="p-3">
                    <AvForm
                      className="form-horizontal mt-4"
                      onValidSubmit={(e, v) => handleValidSubmit(e, v) }
                    >
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          autoFocus
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <Row className="mb-3">
                        <Col sm={12} className="text-end">
                          <button
                            className="btn btn-primary w-lg waves-effect waves-light"
                            type="submit"
                          >
                            Login
                          </button>
                        </Col>
                      </Row>

                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                {/* <p>
                  Don&#39;t have an account ?{" "}
                  <Link
                    to="register"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p> */}
                <p>
                  © {new Date().getFullYear()} - Astra Green Energy Virtual Exhibition 2021
                  {/* © {new Date().getFullYear()} Veltrix. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand */}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}