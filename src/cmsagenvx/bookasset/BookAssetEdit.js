import React from 'react'
import { useEffect, useState } from 'react'
import {
  MDBDataTable,
  MDBBtnGroup,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact'

import { Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Label,
  Button,
  Form,
  Input,
  InputGroup, } from 'reactstrap'
  import * as API from "apiClient"
  import { useHistory, useParams } from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import he from 'he'
// import { convertToHTML } from 'draft-convert'

import { Link } from 'react-router-dom'

import classnames from 'classnames'
import UploadBookDZ from 'components/cmsagenvx/UploadBookDZ'
import { mediaAssets } from 'routes/allRoutes'

const BookAssetEdit = ({ match, ...rest }) => {
  const rootMenuPath = rest.location.pathname.split('/')[1]
  const [activeTab, setActiveTab] = useState('1')
  const [loginData, setLoginData] = useState({
    assetName: "",
    source: "",
    type: "",
    Description: "",
    image: ""
});
const [routeTemp, setRouteTemp] = useState("");
const [showLoginErrorMessage, setShowLoginErrorMessage] = useState(false);
const [loginErrorMessage, setLoginErrorMessage] = useState("");




const onLogin = () => {

    var data = {
        assetName: loginData.assetName,
        source: loginData.source,
        type: loginData.type,
        Description: loginData.type,
        image: loginData.image
    }
  
    API.apiClient.post(API.ADD_ASSET, data).then((res) => {
        if (res.data.code === 200) {
            localStorage.setItem("loginObject", JSON.stringify(res.data.result))
            window.location.href = routeTemp
        } else {
            setShowLoginErrorMessage(true);
            setLoginErrorMessage(res.data.message)
        }
    }).catch((err) => {
        setShowLoginErrorMessage(true);
        setLoginErrorMessage("Username Not Found")
    });
}

const constructor = () => { };
constructor();

const handleChange = (e) => {
    setShowLoginErrorMessage(false);
    let newLoginData = { ...loginData };
    newLoginData[e.target.name] = e.target.value;
    setLoginData(newLoginData);
    // console.log("handleChange", newLoginData)
};

useEffect(() => {
    
            setRouteTemp("/book");
       

});
  return (
    <>
      <div className="page-content">
      <Container fluid={true}>
         
         <Row>
           <Col lg={12}>
             <Card>
             <CardBody>
                   <CardTitle className="h4">Edit Book Asset</CardTitle>
           
                   <div className="mb-3">
                     <Label htmlFor="formrow-firstname-Input">assetName</Label>
                     <Input
                       type="text"
                       className="form-control"
                       id="formrow-firstname-Input"
                       name="assetName"
                     
                       onChange={handleChange}
                     />
                   </div>

                   <Row>
                     <Col md={12}>
                       <div className="mb-3">
                         <Label htmlFor="formrow-email-Input">source</Label>
                         <Input
                           type="text"
                           className="form-control"
                           id="formrow-email-Input"
                           name="source"
                         
                           onChange={handleChange}
                         />
                       </div>
                     </Col>
                     <Col md={6}>
                       <div className="mb-3">
                         <Label htmlFor="formrow-password-Input">type</Label>
                         <Input
                           type="text"
                           name='type'
                           className="form-control"
                           id="formrow-password-Input"
                        
                            onChange={handleChange}
                         />
                       </div>
                     </Col>
                   </Row>

                   <Row>
                     <Col lg={4}>
                       <div className="mb-3">
                         <Label htmlFor="formrow-InputCity">Description</Label>
                         <Input
                           type="text"
                           className="form-control"
                           id="formrow-InputCity"
                           name="Description"
                         
                            onChange={handleChange}
                         />
                       </div>
                     </Col>
                   
                     <Col lg={4}>
                       <div className="mb-3">
                         <Label htmlFor="formrow-InputCity">image</Label>
                         <Input
                           type="text"
                           className="form-control"
                           id="formrow-InputCity"
                           name="image"
                           
                            onChange={handleChange}
                         />
                       </div>
                     </Col>
                   
                   </Row>

                   
                   <div>
                   <button type="submit" className="btn btn-primary pl-3 pr-3" onClick={onLogin} >Login
                   </button>
                   </div>


                   {
                       showLoginErrorMessage &&
                       <div className="alert alert-danger mt-4" role="alert">
                           {loginErrorMessage}
                       </div>
                   }
                
               </CardBody>
             </Card>
           </Col>

           
         </Row>
       </Container>
      </div>
    </>
  )
}

export default BookAssetEdit
