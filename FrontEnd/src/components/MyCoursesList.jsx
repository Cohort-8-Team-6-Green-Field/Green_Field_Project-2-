import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Col, Row } from "react-bootstrap"
import CoursCard from './CoursCard'
import NaveBaree from './NaveBaree';
import EFouuter from './EFouuter';
const MyCoursesList = React.memo(({user})=> {  
  const {token} =JSON.parse(localStorage.getItem('user'))
  console.log(user);
    const [eventUserData, setEventUserData] = useState([]);
    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/api/events_users/user/${user.user_id}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(res => { setEventUserData(res.data)})
            .catch(err => { console.log(err) })
    }, [])
    
    return (
        <div>
           
            <NaveBaree />
            <Container>
               
            <Row lg={9}>
                {eventUserData.map((e,i)=>{
                     return (<Col className="mt-3" key ={i}>
                               <CoursCard data = {e}/>
                            </Col>)
                })}
            </Row>
            </Container>
            
            <EFouuter />
           
        </div>

    )
})

export default MyCoursesList