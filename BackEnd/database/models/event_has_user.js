const mysql = require("mysql2")
const connection = require("../index");
module.exports={
    myFavorit : (callback,event_id, user_id)=>{
        console.log("here",event_id,user_id);
        let sql = `select * from event_has_user where event_id = ? and user_id=?`
        connection.query(sql,[event_id , user_id],function (err,result){callback(err,result)})
    },
    createAUserToEvent:(callback,event_id, user_id,action_type)=>{
        let sql = "insert into event_has_user(event_id,user_id,action_type) values (?,?,?);"
        connection.query(sql,[event_id,user_id,action_type],callback)
    },
    getAllTheEvents : (callback)=>{
        let sql = "select * from event_has_user;"
        connection.query(sql,callback)
    },
    getEventbyId: (callback,event_id)=>{
        let sql = `select v.* , u.* from event_has_user e
        inner join user u on e.user_id = u.user_id
        inner join event v on v.event_id = e.event_id
        where e.event_id =?;`
        connection.query(sql,[event_id],callback)
    },
    deleteUserFromEvent: (callback,event_id,user_id)=>{
        let sql = `delete from event_has_user where event_id = ? and user_id=?`
        connection.query(sql,[event_id , user_id],function (err,result){callback(err,result)})
    },
    getEventsByUserId : (callback,user_id)=>{
        let sql = `select v.* , u.* from event_has_user e
        inner join user u on e.user_id = u.user_id
        inner join event v on v.event_id = e.event_id 
        where e.user_id =?;`
        connection.query(sql,[user_id],callback)
    },
    getEventByTeacherName: (callback,user_name)=>{
        let sql= `SELECT u.user_name,e.* FROM event_has_user eu
        inner join user u on u.user_id = eu.user_id
        inner join event e on e.event_id = eu.event_id
        WHERE action_type = 'teacher' and u.user_name LIKE ?;`
        connection.query(sql,[`%${user_name}%`],callback)
    }
}