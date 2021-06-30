import { Container, Row, Col, Dropdown, Button, Alert } from "react-bootstrap"
import { Patient } from "./Patient/index"
import Category from "./Category"
import AllCategories from "./AllCategories"
import React from "react"
import first from "./first.json"
import second from "./second.json"
import { Child } from "./Child"
import axios from "axios"

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: {},
      patientId: props.match.params.id,
      childId: 0,
      finalCategory: [],
      condition: false,
      secondAlert: false,
      status: false,
      count: 1
    }
  }

  setFinalCategoryArray = obj => {
    this.setState({ finalCategory: obj })
  }

  getRequest(id) {
    //  need to take id from url
    axios
      .get(`http://localhost:8082/result-copy-war/api/patient-results/${id}`)
      .then(res => {
        this.setState({ data: res.data, loading: false })
      })
      .catch(err => console.log("getRequest api error ", err))
  }
  //  post body that is sent 
  async postRequest(body) {
    console.log("body", body)
    axios
      .post(`http://localhost:8082/result-copy-war/api/copy-results`, body,
      {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content": "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Methods" : "POST,GET,PUT,DELETE",
          "Access-Control-Allow-Headers" : "Authorization, Lang, Content-Type"  , 
         
        }
      }
      )
      .then(res => {
        console.log("postRequest api response", res)
      })
      .catch(err => console.log("postRequest api error ", err))
  }

  componentDidMount() {
    if (true) {
      this.getRequest(this.state.patientId)
    } else {
      setTimeout(() => {
        this.setState({ data: second, loading: false })
      }, 3000)
    }
  }
  setChildId(childId) {
    this.setState({ childId: childId })
  }
  render() {
    //  this is for patient
    var patient = {}
    if (!this.state.loading) {
      patient = this.state.data.patient[0].patientDetails
    }
    //  this is for child
    var child = {}
    if (!this.state.loading) {
      child = this.state.data.child[0].childDetails[this.state.childId]
    }

    //  this is for total childrens
    var childrenArray = []
    if (!this.state.loading) {
      childrenArray = this.state.data.child[0].childDetails
    }
    
    //  this is for category array
    var categoryArray = []
    if (!this.state.loading) {
      categoryArray = this.state.data.category
    }
    const methods = {
      setCategoryArray: this.setFinalCategoryArray,
    }

    return (
      <Container>
        <Row>
          <Col>
            <Patient loading={this.state.loading} patient={patient} />
          </Col>
          <Col>
            <Child loading={this.state.loading} child={child} />
          </Col>
        </Row>
        <Row className='my-3'>
          <Col>
            {child.resultCopiedDateTime != undefined ? (
              <Alert variant='primary' className='text-center'>
                Result was copied on :  
                <b> {child.resultCopiedDateTime.split("T")[0]} </b>
                for  {child.firstName} {child.lastName}
              </Alert>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
        <Row>
          
          {childrenArray.map((obj,index) => {
            if(obj.resultCopiedDateTime === undefined)
            {
              this.state.status = false
              return ""
            }
             this.state.status = true//this.state.status + 1
          })
          }
          {this.state.status ? (
              <label style={{ marginLeft:"500px" }}>All results are copied</label>
          ):(
                ""
          )} 
        </Row>
        <Row>
          <Col>
          {child.resultCopiedDateTime === undefined || 
            childrenArray.length > 1
             ? (
              <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                Select Child
              </Dropdown.Toggle>
              {childrenArray.length > 0 ? (
                <Dropdown.Menu>
                  {childrenArray.map((obj, index) => {
                    return (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          this.setChildId(index)
                        }}
                      >
                        Baby {String.fromCharCode(index + 65)}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              ) : (
                ""
              )}
            </Dropdown>
            ) : (
              <div></div>
            )}
            
          </Col>
        </Row>
        <Row className='my-1'>
          <Col md={4}>
            {!this.state.loading &&
              child.resultCopiedDateTime === undefined && (
                <AllCategories
                  data={categoryArray}
                  finalCategoryArray={this.state.finalCategory}
                  methods={methods}
                />
              )}
          </Col>
        </Row>
        <Row className='my-1 text-center'>
          <Col>
            {child.resultCopiedDateTime === undefined 
            ? (
                <Button
                className='ml-1'
                onClick={() => {
                  if (!this.state.loading) {
                    if (child.resultCopiedDateTime === undefined) {
                      if (this.state.finalCategory.length === 0) {
                        alert("Select category!.")
                      } else {
                        var body = {
                          childId: child.id,
                          category: this.state.finalCategory,
                        }
  
                        alert(JSON.stringify(body))
                        this.postRequest(body)
                      }
                    } 
                  }
                }}
                variant='primary'
                style={{ marginTop: "120px" }}
              >
                Result Copy
              </Button>
              ) : (
                <div></div>
              )}
          </Col>
        </Row>
        <div style={{ marginBottom: "200px" }} />
      </Container>
    )
  }
}

export default Main

/*
postRequest(body) {
    console.log("body", body)
    axios
      .post(`http://localhost:8084/result_copy_war_war/api/copy-results/`, body)
      .then(res => {
        console.log("postRequest api response", res)
      })
      .catch(err => console.log("postRequest api error ", err))
  }
  {this.setResultDate(1)}
*/
/*
<Col>
            {child.resultCopiedDateTime != undefined ? (
              <Alert variant='primary' className='text-center'>
                Result was copied on :  
                <b> {child.resultCopiedDateTime.split("T")[0]} </b>
                for  {child.firstName} {child.lastName}
              </Alert>
            ) : (
              <div></div>
            )}
          </Col>
          */
         /*{childrenArray.map((obj,index) => {
            if(obj.resultCopiedDateTime === undefined)
            {
              this.setState({status : false})
            }
            else{
              this.setState({status : true})
            }
          })}


            <Row>
            {this.state.status ? (
                <label>
                  All copied
                </label> 
            ):(
                " "
            )}         
          </Row>
          */