const express=require("express")
const { connection } = require("./Config/db")
const { userModal} = require("./Models/marriageSchema");
const app=express()
app.use(express.json())
var cors = require('cors')
app.use(cors())



// Sinup------------------------------------------------------------


app.post("/signup",async(req,res)=>{
    const {name,email,password,role}=req.body
    const result= await userModal.find({email})
    if(result.length>0){
     res.send({"msg":"User already exists"})
    }
    else{
       const newuser=new userModal({
          name:name,
          email:email,
          password:password,
          role:role
       })
       await newuser.save()
       res.send({"msg":"signup sucessfully done"})
    }
 })

// Login------------------------------------------------------------------------------

 app.post("/login",async(req,res)=>{
   const {email,password}=req.body
   const result= await userModal.find({email})
   const pass=result.map((el)=>{
        return el.password
   })
   const role=result.map((el)=>{
      return el.role
 })
   if(result){
         if(password==pass){
            res.send({msg:"User"})
         }
        else{
           res.send({"msg":"Please fill correct details"})
        }
   }
})




//Server---------------------------------------------------
app.listen(8080,async()=>{
    try{
          await connection
          console.log("server connected sucessfully");
    }catch(err){
    console.log("Error ");
   
    }
   
})