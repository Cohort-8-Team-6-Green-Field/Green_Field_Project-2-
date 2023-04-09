const { createAUserToEvent, getAllTheEvents, getEventbyId, deleteUserFromEvent, getEventsByUserId,myFavorit, getEventByTeacherName} = require("../database/models/event_has_user")

module.exports={
    getfav:(req,res)=>{
        const {event_id, user_id} = req.body
        console.log(req.body);
        myFavorit((err,ress)=>{
            if(err){
                res.send(err)
            }else{
                if(ress.length>0)res.send({favorit:true})
                else res.send({favorit:false})
                console.log(ress);
            }
        },event_id,user_id)
    },
    createUserEvent: (req,res)=>{
        const {event_id, user_id,action_type} = req.body
        getEventbyId((err,results)=>{
            if (err){
                console.log(err)
                res.status(500).json(err)
            }
          var e = results.filter((e,i)=>{
               return e.user_id===user_id
            })
            if (e.length > 0 ){
                res.send("user already exists")
            }
            else{
            createAUserToEvent((err,results)=>{
                if(err){
                    console.log(err)
                    res.status(500).send("there is an err")
                } 
                res.status(200).send("matching created")
            },event_id, user_id,action_type)}
        },event_id)   
    },
    getAllEvents:(req,res)=>{
        getAllTheEvents((err,results)=>{
            if (err){
                console.log(err)
                res.status(500).json(err)
            }
            res.status(200).json(results)
        })
    },
    getEvent:(req,res)=>{
        const event_id = req.params.id
        getEventbyId((err,results)=>{
            if (err){
                console.log(err)
                res.status(500).json(err)
            }
            res.status(200).json(results)
        },event_id)
    },
    deleteUserEvent : (req,res)=>{
        const event_id = req.params.id
        const user_id = req.params.ev
        console.log(event_id,user_id);
        deleteUserFromEvent((err,results)=>{
            if (err){
                console.log(err)
                res.status(500).send(err)
            }
            res.status(200).send("user deleted")
        },event_id,user_id)
    },
    getEventsWithUserId: (req,res)=>{
        const user_id = req.params.id
        getEventsByUserId((err,results)=>{
            if (err){
                console.log(err)
                res.status(500).json(err)
            }
            res.status(200).json(results) 
        },user_id)
    },
    getEventsofTeacher : (req,res)=>{
        const user_name = req.params.teacherName
        getEventByTeacherName((err,results)=>{
            if (err){
                console.log(err)
                res.status(500).json(err)
            }
            res.status(200).json(results)
        },[user_name])

    }
}