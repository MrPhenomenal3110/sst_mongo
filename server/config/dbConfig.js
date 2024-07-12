const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL || "mongodb+srv://premshah:mOEXk4IexPKBU2od@mycluster0.uvbh1fa.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster0");

const connection = mongoose.connection

connection.on('connected' , ()=>{
    console.log('Connection Successful')
})
connection.on('error' , ()=>{
    console.log('Connection unsuccessful')
})