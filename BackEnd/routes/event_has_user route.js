const express = require("express")
const { createUserEvent, getAllEvents, getEvent, deleteUserEvent, getEventsWithUserId,getfav, getEventsofTeacher } = require("../controllers/event_has_user controller")
const authorization = require('../middleware/auth.js')
const event_has_user_router = express.Router()

event_has_user_router.post("/events_users",authorization,createUserEvent)
event_has_user_router.get("/events_users",authorization,getAllEvents)
event_has_user_router.post("/events_fav",getfav)
event_has_user_router.get("/events_users/event/:id",authorization,getEvent)
event_has_user_router.delete("/events_users/:id/:ev",deleteUserEvent)
event_has_user_router.get("/events_users/user/:id",authorization,getEventsWithUserId)
event_has_user_router.get("/events_users/user/search/:teacherName",authorization,getEventsofTeacher)

module.exports=event_has_user_router






