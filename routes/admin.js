const express = require('express') ;
const router = express.Router() ;
const studentdb = require('../models/student') ;
const admindb = require('../models/admin') ;
const eventdb = require('../models/event') ;
const multer  = require('multer') ;
const mysql = require("mysql") ;



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({
  storage: storage
})





router.get('/',(req,res)=>{
  res.render('admin')
})

router.post('/',async(req,res)=>{
  //let incoming = await admindb.findOne({idNo:req.body.adminid})  ;
 let incomingMysql ;
 let currentAdminMysql ,currentAdmin ;
 
 
 
 if(req.body.adminid ==="administheid" && req.body.password==="administhepassword") {
    
      res.render('adminDashborad')
      return ;
  }
  
 
 
 
 
 
 
 //mysql
 if(req.body.adminid != "administheid" && req.body.password != "administhepassword") {
 req.con.query(`select * from admin where idNo = ${req.body.adminid} `,(err,result)=>{
   if(err) {
     console.log(err) ;
     return ;
   }
  incomingMysql = currentAdmin = currentAdminMysql = result[0]
 console.log("mysql: incomingMysql... "+ incomingMysql)
 console.log("bool: "+ Boolean(incomingMysql && incomingMysql.password == req.body.password))
 
 
 
 
  /*else */ if (/*incomingMysql && incomingMysql.password == req.body.password*/  Boolean(incomingMysql && incomingMysql.password == req.body.password)) {
    
    console.log("passes.....,.")
    console.log("found: "+incomingMysql)
    
  //  let currentAdmin = await admindb.findOne({idNo:req.body.adminid})
    
   // let currentAdminMysql ,currentAdmin ;
    
    //mysql
    
    /*
    req.con.query(`select * from admin where idNo = ${req.body.adminid} `,(err,result)=>{
   if(err) {
     console.log(err) ;
     return ;
   }
  currentAdminMysql = currentAdmin =   result[0]
 console.log("mysql: "+ JSON.stringify(currentAdminMysql))
  
 }) */
 
 //currentAdminMysql = currentAdmin = incomingMysql
    
    
    
    
     if(currentAdminMysql.adminType == "eao") {
      res.render('eaodashboard',{adminType:"EAO DASHBOARD",currentAdmin})
      
      return ;
    }
    
    
     if (currentAdminMysql.adminType == "oic") {
      res.render('oicdashboard',{adminType:"OIC DASHBOARD",currentAdmin})
      
      return;
    }
    
    
    
  /*  else if (currentAdmin.type == "account maker") {
      
    }*/
    
    
    
  }
  
  
  
 
 
 
 
 
 
 
   
}) }




  

  

  
else {
    res.send("the admin info entered does not exist or are incorrect")
    
    return
  }
  
 





  

  

})




router.post('/create/:entity',upload.single('scannedimage'),async(req,res)=>{ 
  
  sqldb = req.con ;
  
  if(req.params.entity =='student') {
    
    
    
    //mysql
    sqldb.query(`insert into student(studentNo,email,surname,contactNo,firstName,address,middleName,username,course,password,emergencyName,emergencyNumber) values('${req.body.studentno}','${req.body.email}','${req.body.surname}','${req.body.contactno}','${req.body.firstname}','${req.body.address}', '${req.body.middlename}', '${req.body.username}','${req.body.course}','${req.body.password}','${req.body.emername}','${req.body.emerno}')`,(err,result)=>{
        if(err) {
          res.send(err)
          console.log(err)
          return ;
        }
        
        res.send("Please ask the student to login with the following detail" + '<br>'+"Student Id:"+req.body.studentno + "<br>"+"password:"+req.body.password)
        
        console.log(result)
      })
    
    /*
    newStudent = new studentdb({studentNo:req.body.studentno,
  email:req.body.email,
  surname:req.body.surname,
  contactNo:req.body.contactno,
  firstName:req.body.firstname,
  address:req.body.address,
  middleName:req.body.middlename,
  username:req.body.username,
  course:req.body.course,
  password:req.body.password,
  emergencyName:req.body.emername,
  emergencyNumber:req.body.emerno})

    await newStudent.save().then(()=>{
      res.send("Please ask the student to login with the following detail" + '<br>'+"Student Id:"+req.body.studentno + "<br>"+"password:"+req.body.password)
    console.log("success:Mongodb")  
    }).catch((err)=>{
      res.send(err + " "+ "please try again later")
    })    
    */
    
    
    
    
  }
  
  else if(req.params.entity =="event") {
    let noOfStu ;
    if(req.body.eventnoofstudent == ""|" ") {
      noOfStu = "Unlimited Number of Student"
    } else {
      noOfStu = req.body.eventnoofstudent
    }
    
    
    
    //mysql
    sqldb.query(`insert into event(eventName,eventHours,eventNoOfStudent,eventStartDate,eventEndDate,eventVenue,dateAndTime,scannedImage) values(
      '${req.body.eventname}',
      '${req.body.eventhours}',
      '${noOfStu}',
      '${req.body.eventstartdate}',
      '${req.body.eventenddate}',
      '${req.body.venue}',
      '${req.body.dateandtime}',
      '${removePublic(req.file.path)}'

      )`,(err,result)=>{
        if(err) {
          console.log(err)
          return ;
        }
        
        
        res.send("event was created succesfully")
        
        console.log(result)
        
      })
      
      
      /*
    
    newEvent = new eventdb({
    eventName:req.body.eventname,
    eventHours:req.body.eventhours,
    eventNoOfStudent:noOfStu,
    eventStartDate:req.body.eventstartdate,
    eventEndDate:req.body.eventenddate,
    eventVenue:req.body.venue,
    dateAndTime: req.body.dateandtime,
    scannedImage : removePublic(req.file.path)
      
    }) ;
    
    await newEvent.save().then(()=>{res.send("event was created succesfully")}).catch((e)=>{res.send("try again" + e)})
    
    */
    
    
  }
  
  
  
  else if (req.params.entity ==="eao") {
    
    //mysql
    sqldb.query(`insert into admin(idNo,email,surname,contactNo,firstName,middleName,username,departmentCode,department,password,adminType) values('${req.body.idnumber}',
      '${req.body.email}',
      '${req.body.Surname}',
      '${req.body.contactnumber}',
      '${req.body.firstname}',
      '${req.body.middlename}',
      '${req.body.username}',
      '${req.body.departmentcode}',
      '${req.body.department}',
      '${req.body.password}',
      'eao'
      )`,(err,result)=>{
        if(err) {
          console.log(err)
          return ;
        }
        
            res.send(`ask the EAO to login with the follwoing: <br> adminid:${req.body.idnumber} <br> password:${req.body.password}`)
            
        console.log(result)
      
    })
    
    /*
    newAdmin = new admindb({
    idNo:req.body.idnumber,
  email:req.body.email,
  surname:req.body.Surname,
  contactNo:req.body.contactnumber,
  firstName:req.body.firstname,
  middleName:req.body.middlename,
  username:req.body.username,
  departmentCode:req.body.departmentcode,
  departmen:req.body.department,
  password:req.body.password,
  adminType:"eao"})
  
  await newAdmin.save().then(()=>{
    res.send(`ask the EAO to login with the follwoing: <br> adminid:${req.body.idnumber} <br> password:${req.body.password}`)
  }).catch((e)=>{res.send(e + "please try again. An err occured")}) */
  
  
    
    
  }
  
  else if (req.params.entity ==="oic") {
    
    //mysql
    sqldb.query(`insert into admin(idNo,email,surname,contactNo,firstName,middleName,username,departmentCode,department,password,adminType) values('${req.body.idnumber}',
      '${req.body.email}',
      '${req.body.Surname}',
      '${req.body.contactnumber}',
      '${req.body.firstname}',
      '${req.body.middlename}',
      '${req.body.username}',
      '${req.body.departmentcode}',
      '${req.body.department}',
      '${req.body.password}',
      'oic'
      )`,(err,result)=>{
        if(err) {
          console.log(err)
        }
        
           res.send(`ask the oic to login with the follwoing: <br> adminid:${req.body.idnumber} <br> password:${req.body.password}`)
        
        console.log(result)
      
    })
    
    
    
    
    
    
    
    
    
    /*
    
    newAdmin = new admindb({
    idNo:req.body.idnumber,
  email:req.body.email,
  surname:req.body.Surname,
  contactNo:req.body.contactnumber,
  firstName:req.body.firstname,
  middleName:req.body.middlename,
  username:req.body.username,
  departmentCode:req.body.departmentcode,
  departmen:req.body.department,
  password:req.body.password,
  adminType:"oic"})
  
  await newAdmin.save().then(()=>{
    res.send(`ask the oic to login with the follwoing: <br> adminid:${req.body.idnumber} <br> password:${req.body.password}`)
  }).catch((e)=>{res.send(e + "please try again. An err occured")})
  
  
    */
    
  }
  
  
  
  
  
  
})



function removePublic(string) {
  return string.slice(7)
}




module.exports = router



