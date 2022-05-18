const express = require('express') ;
const router = express.Router() ;
const studentdb = require('../models/student') ;

var base64ToImage = require('base64-to-image');

var QRCode = require('qrcode')




router.get('/',(req,res)=>{
  res.render('student')
})


router.post('/',async(req,res)=>{
  
  sqldb = req.con ;
  // mysql
  sqldb.query(`select * from student where studentNo = "${req.body.studentid}" `,(err,result)=>{
    
    if(err) {
      res.send(err)
      console.log(err) 
      return 
    }
    
    currentStudent = result[0]
    
    console.log(result)
    
    if(currentStudent && currentStudent.password ==req.body.password) {
      
      
      
      //console.log(currentStudent._id.toString())
      
      QRCode.toDataURL(currentStudent.id.toString(), function (err, url) {
  studentqrCode = url ;

    //console.log(url)  
     res.render('studentdashboard',{currentStudent,url}) })
    }
    
  
    else{
    res.send("student with these credentials does not exist, please locate an oic to crrate an account for you")
  
    }
    
    
    
    
  })
  
  
  //let currentStudent = await studentdb.findOne({studentNo:req.body.studentid})
  
  //let allStudent = await studentdb.find() ;
  //console.log(allStudent)
  
    
    
  
  
  
  

  
  
  
    
})





module.exports = router ;

