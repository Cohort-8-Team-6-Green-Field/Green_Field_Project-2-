const mysql = require('mysql2')
const cors = require("cors")

const conn =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Saif1234",
    database:'E-education'
})
conn.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('db connected')
    }
})
module.exports = conn