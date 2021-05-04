const express=require('express');
const mongoose=require('mongoose');
const app=express();
const Location =require('./model/location');

mongoose.connect('mongodb+srv://username:password@nodepratice.zmn1l.mongodb.net/geoLocation?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
.then((res)=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log("Err",err);
})

app.use(express.json());

app.get('/',function(req, res){
    console.log(typeof(req.query.lng));
    console.log(parseFloat(req.query.long));
    var lat=Number(req.query.lat);
    var long=Number(req.query.long);
    console.log(typeof(lat));
    // const loct=new Location
    Location.findOne({
         locationTest: { $near: { $geometry: { type: "Point", coordinates: [req.query.long*1, req.query.lat*1] }, $minDistance: 0, $maxDistance: 100000 } }
    })
    .then((result)=>{
        // console.log(res);
        res.send(result)})
    .catch(err=>res.send(err))
    
});
app.post('/',(req,res)=>{
    Location.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch((err)=>{
        res.send(err);
    });
})
app.listen(4100,()=>{
    console.log("Server is up and running.");
})