import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios';
const CoursCard = ({ data,handleToggle }) => {
  const user =JSON.parse(localStorage.getItem('user'))
  const {token} =JSON.parse(localStorage.getItem('user'))
  
  const [courseData, setCourseData] = useState([])
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate()



  const handleAddFavorite = () => {
    setIsFavorited(!isFavorited);
       
      if(isFavorited === false){
        console.log(user.user_id,data.event_id);
         axios.post('http://localhost:4000/api/events_users',{event_id:data.event_id,
        user_id:user.user_id,
        action_type:"wish"},{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((res)=>console.log(res)).catch((err)=>console.log(err))
      }else{
        console.log(user.user_id,data.event_id);
         axios.delete(`http://localhost:4000/api/events_users/${data.event_id}/${user.user_id}`
         ,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
         ).then((res)=>console.log(res)).catch((err)=>console.log(err))
      }

      

  };
  function handleCourseView(id) {
    axios.get(`http://127.0.0.1:4000/api/events/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setCourseData(res.data)
        navigate("/courseview", { state: { courseData: res.data } })
      }).catch(err => {
        console.log(err)
      })
  }

  function handleCourseUp() {

    navigate("/UpCours", { state: { courseData: data } })

  }
  

    axios.post('http://localhost:4000/api/events_fav',{event_id:data.event_id,
      user_id:user.user_id},{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res)=>{console.log(res.data.favorit);setIsFavorited(res.data.favorit)}).catch((err)=>console.log(err))
 
    const deleteCourse = ()=>{
         axios.delete(`http://127.0.0.1:4000/api/events/${data.event_id}`,{headers: {
          Authorization: `Bearer ${token}`
        }})
         .then(res=>{
          console.log(data.event_id)
          handleToggle()
          console.log(res)})
         .catch(err=>console.log(err))
    }

  return (

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.event_image} style={{ width: '250px', height: '160px' }} />
      <Card.Body>
        <Card.Title> 
        <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">{isFavorited? 'remove from ' :'Add To ' } List</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <Button  disabled={user.user_type==="teacher" &&true}
          variant="light"
          {...triggerHandler}
          className="d-inline-flex align-items-center"
         
        >
           <FontAwesomeIcon
            ref={ref}
          
          icon={faStar}
          onClick={handleAddFavorite}
          style={{ color: isFavorited ? 'gold' : 'black', cursor: 'pointer' }}
          
        />

        </Button>
      )}
    </OverlayTrigger>

          <span className='mx-3'>{data.event_name}</span>
        </Card.Title>
        <Card.Text>
          {data.event_description.substring(0, 91)}
        </Card.Text>
        {user.user_type==="teacher" && isFavorited ? <Button variant="primary" onClick={handleCourseUp}>Update Course</Button>:false}
        {user.user_type==="teacher" && isFavorited ? <Button variant="primary" onClick={deleteCourse}>Delete Course</Button>:false}
        <Button variant="primary" onClick={() => { handleCourseView(data.event_id) }}>View Course</Button>



      </Card.Body>
    </Card>
  )
}

export default CoursCard  