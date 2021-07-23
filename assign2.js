const mongoose =require('mongoose')
var express=require('express')
// var bodyParser=require('body-parser')
var app=express()
app.use(express.static("./index.html"))
// app.use(bodyParser.urlencoded({ extended: true })); 
const ConnectionString='mongodb+srv://sravankumar:Sravan@9000@cluster1.axuik.mongodb.net/Teams?retryWrites=true&w=majority'
const Options={
    useUnifiedTopology:true,
    useNewUrlParser:true
}
mongoose.connect(ConnectionString,Options).then(
    ()=>{
        console.log('Connection Established')
    }
).catch((error)=> console.log(error)) 
const PeopleSchema=new mongoose.Schema({},{strict:false})
var People=mongoose.model('players',PeopleSchema)
app.get('/',async (req,res)=>{
res.sendFile("index.html",{root:__dirname})
})
app.get('/details.html',async (req,res)=>{   
    
    res.sendFile("details.html",{root:__dirname})
    })
app.get('/players',async (req,res)=>{
    var data=await People.find()
    if(!data || !data.length) return res.send("nodata")
   
    res.send(data)
})
// app.post('/players',async (req,res)=>{
//  var postData=await People.insertMany([{name:"Shikhar",age:"36",role:"Batsman",country:"India"},{name:"Kohli",age:"32",role:"Batsman",country:"India"}])

//  res.send(postData)
// })

var port=3000
app.listen(port,()=>{
    console.log(`server started at port: ${port}`)
})