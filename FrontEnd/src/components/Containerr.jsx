import React, { useEffect, useState } from 'react'
import NaveBaree from "./NaveBaree.jsx"
import CoursCard from "./CoursCard.jsx"
import { Container, Col, Row } from "react-bootstrap"
import SearchBar from "./searchBar.jsx"
import EFouuter from "./EFouuter.jsx"
import axios from 'axios'
const Containerr = () => {
  const {token} =JSON.parse(localStorage.getItem('user'))
  const [data,setData] = useState([])
  const [toggle , setToggle] = useState(true)
  
  const handleToggle= ()=>{
    setToggle(!toggle)
  }  

  const getAll = () => {
    axios.get("http://localhost:4000/api/events/getAll",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(({data})=>{
      console.log(data);
      setData(data)

    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect (()=>{
    getAll()
    },[toggle])
   
  return (
    <div>
        <NaveBaree />
      <Container className="mt-5">
        <Row lg={2}>
          <Col lg={3} >
            <SearchBar data={data} />
          </Col>
          <Col lg={9} >
          <Row  lg={9}>
            {data.length>0 && data.map((e,i)=>{
              return (
              <Col  className="mt-3" key = {i}>
            <CoursCard data = {e} handleToggle={handleToggle}/>
            </Col>
              )
            })}
          </Row>
        </Col>
        </Row>
      </Container>
      <EFouuter/>

    </div>
  )
}

export default Containerr