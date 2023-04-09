import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
const SearchBar = ({ data }) => {
  const [teachers, setTeachers] = useState("")
  const [courses, setCourses] = useState("")
  const [courseDates, setCourseDates] = useState("")
  const [search , setSearch] = useState("")
  const {token} =JSON.parse(localStorage.getItem('user'))
  console.log(teachers)

  const handelTeacher = (event) => {
    setTeachers(event.target.value)
  }
  const handelCourse = (event) => {
    setCourses(event.target.value)
  }
  const handelcourseDates = (event) => {

    setCourseDates(event.target.value)
  }

  const filterByTeacher = () => {
   axios.get(`http://127.0.0.1:4000/api/events_users/user/search/${teachers}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }})
   .then(res=>{
    setCourses(res.data)
    console.log(res.data)
   }).catch(err=>{
    console.log(err)})
  };

  const filterByCourseName = () => {
    const filteredData = data.filter((course) => course.event_name.toLowerCase().includes(courses.toLowerCase())
    );
    console.log(filteredData);

  };


  function isDateGreaterOrEqual(date1, date2) {
    const date1Components = date1.split('-');
    const date2Components = date2.split('-');
    const year1 = parseInt(date1Components[0]);
    const year2 = parseInt(date2Components[0]);
    if (year1 > year2) {
      return true;
    } else if (year1 < year2) {
      return false;
    }
    const month1 = parseInt(date1Components[1]);
    const month2 = parseInt(date2Components[1]);
    if (month1 > month2) {
      return true;
    } else if (month1 < month2) {
      return false;
    }
    const day1 = parseInt(date1Components[2]);
    const day2 = parseInt(date2Components[2]);
    if (day1 >= day2) {
      return true;
    } else {
      return false;
    }
  }





  const filterByCourseDate = () => {
    const filteredData = data.filter((course) => {
      const courseTime = course.event_time.substring(0, 10)
      const filterTime = courseDates.substring(0, 10)
      return isDateGreaterOrEqual(courseTime, filterTime)

    });
    console.log(filteredData, 'grgrg');

  };

  

  return (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Teacher</Accordion.Header>
        <Accordion.Body>
          <input type="text" onChange={handelTeacher} style={{ height: "32px" }} />
          &nbsp; &nbsp;
          <Button onClick={filterByTeacher}       > <FontAwesomeIcon icon={faSearch} /> </Button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Courses</Accordion.Header>
        <Accordion.Body>
          <input type="text" onChange={handelCourse} style={{ height: "32px" }} />
          &nbsp; &nbsp;
          <Button onClick={filterByCourseName}    > <FontAwesomeIcon icon={faSearch} /> </Button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Course Dates</Accordion.Header>
        <Accordion.Body>
          <input type="date" onChange={handelcourseDates} style={{ height: "32px" }} />
          &nbsp; &nbsp;
          <Button onClick={filterByCourseDate}      > <FontAwesomeIcon icon={faSearch} /> </Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default SearchBar