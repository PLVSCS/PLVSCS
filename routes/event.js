const express = require('express');
const router = express.Router();
const studentdb = require('../models/student');
const eventAndRenderedHoursdb = require('../models/studentParticipatingAndRenderedHours');
const mongoose = require('mongoose');

const eventdb = require('../models/event');

var base64ToImage = require('base64-to-image');

const multer = require('multer');




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





router.get('/', async(req, res)=> {
  console.log("/events ....,..***********")

  sqldb = req.con


  sqldb.query('select * from event where eventStatus = true ', (err, result)=> {

    if (err) {
      console.log(err)
    }
    console.log(result)
    console.log("events..." +  result)
    res.send(result)
  })


  /*
  let events = await eventdb.find({eventStatus:true}).populate('studentParticipating').sort({created_at: 1}).populate('studentParticipating').exec()
   ;
  */


})





router.get('/markAttendance/:eventid/:studentid', async(req, res)=> {
  sqldb = req.con;
  

  sqldb.query(`select * from eventStudentAndHours where eventId = ${req.params.eventid} and studentId = ${req.params.studentid};
    select * from event where id = ${sqldb.escape(req.params.eventid)} ;
    select * from student where id = ${sqldb.escape(req.params.studentid)} `,
    (err, result)=> {

      if (err) {
        res.send("there was an error: "+err)
        return;
      }


console.log("eventNoOfStudent: "+ result[1][0].eventNoOfStudent)
console.log("eventStudentParticipating: "+ result[1][0].studentParticipating)

let updatedNo =  result[1][0].studentParticipating + 1 ;

console.log("updatedano: "+ updatedNo)

      if (result[0].length == 0) {

        if (result[1][0].studentParticipating < result[1][0].eventNoOfStudent) {


          sqldb.query(`insert into eventStudentAndHours (eventId,studentId) values(${sqldb.escape(req.params.eventid)}, ${sqldb.escape(req.params.studentid)})`, (err, result)=> {
            if (err) {
              res.send("there was an err1: "+ err)
              return
            } 

            sqldb.query(`update event set studentParticipating = ${updatedNo} where id = ${req.params.eventid}`, (err, result)=> {
              if (err) {
                console.log(err)
              }
            })
            res.send("student has been marked as attending")
            return;
          }) 

        } else if (result[1][0].eventNoOfStudent == "Unlimited Number of Student") {

          sqldb.query(`insert into eventStudentAndHours(eventId,studentId) values(${parseInt(req.params.eventid)},${parseInt(req.params.studentid)})`, (err, result)=> {
            if (err) {
              res.send("there was an err2: "+ err)
              return
            }  
            
            sqldb.query(`update event set studentParticipating = ${ updatedNo} where id = ${req.params.eventid}`, (err, result)=> {
              if (err) {
                console.log(err)
              }
              
            })
            
            
            
            res.send("student has been marked as attending")
          })

            



          
        }
          
          else if (result[1][0].studentParticipating == result[1][0].eventNoOfStudent) {
            res.send("no more student are allowed to participate in this event")
          }






          } else {

            res.send("student attendance has already been marked")
            return
          }
          
          
       //   res.send("student info not recognized")


          


        })





//res.send("working on sth")



    })







  router.get("/unapproved", async(req,
    res)=> {
    sqldb = req.con
    let allEventsMysql;
    //mysql
    sqldb.query("select * from event where eventStatus = false",
      (err, result)=> {

        if (err) {
          console.log(err);
          res.send(err);
          return
        }

        allEventsMysql = result;
        console.log(JSON.stringify(allEventsMysql))

        res.send(allEventsMysql);

      })


    //let allEvents = await eventdb.find({eventStatus:false}) ;

  })





  router.get("/approve/:evid", async(req,
    res)=> {

    sqldb = req.con;

    sqldb.query(`update event set eventStatus = 1 where id = ${req.params.evid}`,
      (err, result)=> {

        if (err) {
          console.log(err)
          res.send(err)
          return
        }

        res.send("event was succesfully  approved")
        console.log(result)
      })


    /*let eventToBeModified = await eventdb.findByIdAndUpdate(req.params.evid,{eventStatus:true}).then(()=>{
  }).catch((e)=>res.send("there was an error pls retry agin"+e))*/


  })





  router.get("/delete/:evid", async(req,
    res)=> {
    let eventToBeModified = await eventdb.findByIdAndDelete(req.params.evid).then(()=> {
      res.send("event was succesfully  deleted")
    }).catch((e)=>res.send("there was an error pls retry agin"+e))
  })





  router.post("/modify/:eventid", upload.single('scannedimage'), async(req,
    res)=> {

    let noOfStu;
    if (req.body.eventnoofstudent == ""|" ") {
      noOfStu = "Unlimited Number of Student"
    } else {
      noOfStu = req.body.eventnoofstudent
    }



    //mysql



    let wantsToBeModified = await eventdb.findByIdAndUpdate(req.params.eventid.trim(), {
      eventName: req.body.eventname,
      eventHours: req.body.eventhours,
      eventNoOfStudent: noOfStu,
      eventVenue: req.body.venue,
      dateAndTime: req.body.dateandtime,
      scannedImage: removePublic(req.file.path)


    })

    await wantsToBeModified.save().then(()=> {
      res.send("event was succesfully modified")
    }).catch((err)=>res.send(err + " there was an error"))


  })







  router.get("/join/:eventid/:studentid",async(req,res) =>{
sqldb = req.con ;
res.send("still working on this")






    })



  router.get("/inputrenderedhours/:eventid/:studentid/:hours", async(req,
    res)=> {

    sqldb = req.con;

    sqldb.query(`update eventStudentAndHours set hourRendered = '${req.params.hours}' where eventId = ${req.params.eventid} and studentId = ${req.pa.studentid} `,
      (err, result)=> {

        if (err) {
          console.log(err)
          return
        }

        console.log(result)

      })



    let modifyNewRenderedHour = await eventAndRenderedHoursdb.findOneAndUpdate({
      eventId: req.params.eventid.trim(),
      studentId: req.params.studentid
    },
      {
        renderedHours: req.params.hours
      }).then(()=>res.send("rendered hours has been saved successful")).catch((err)=> {
        res.send("error pls try again " +err)})


  })












  router.get('/:eventid', async(req,
    res)=> {

    //mysql
    sqldb = req.con;

    sqldb.query(`select * from event where id = ${req.params.eventid}`,
      (err, result)=> {

        if (err) {
          res.send(err);
          return;
        }

        res.send(result[0])


      })



    /*
  let events = await eventdb.findOne({_id:mongoose.Types.ObjectId(req.params.eventid)}).populate('studentParticipating').populate({path:'studentParticipatingAndHoursRendered',populate:{path:"studentId"}})
  console.log(JSON.stringify(events.studentParticipatingAndHoursRendered))
 res.send(events) */



  })






  function removePublic(string) {
    return string.slice(7)
  }






  module.exports = router;


  //markAttendance mongodbbb4

  /*
  let newEventAndRenHours = await new eventAndRenderedHoursdb({
    eventId:eventToBeModified._id,
    studentId:newStuParticipating._id,
  });
  await newEventAndRenHours.save() ;
  eventdb.findByIdAndUpdate(req.params.eventid.replace("%20%20"," ").trim(),{$push:{studentParticipating:req.params.studentid.replace("%20%20"," "),studentParticipatingAndHoursRendered:newEventAndRenHours._id}}).then(()=>res.send("the student has been succesfully added to the event as attending")).catch((e)=>{res.send("there was an error pls retry") ;  })
}*/




  /*
let newEventAndRenHours = await new eventAndRenderedHoursdb({
    eventId:eventToBeModified._id,
    studentId:newStuParticipating._id,
  });
  await newEventAndRenHours.save() ;


      eventdb.findByIdAndUpdate(req.params.eventid.replace("%20%20"," ").trim(),{$push:{studentParticipating:req.params.studentid.replace("%20%20"," "),studentParticipatingAndHoursRendered:newEventAndRenHours._id}}).then(()=>res.send("the student has been succesfully added to the event as attending")).catch((e)=>{res.send("there was an error pls retry") ;  }) */






  /*
  let newStuParticipating = await studentdb.findById(req.params.studentid.replace("%20%20"," "))
 let eventToBeModified = await eventdb.findById(req.params.eventid.replace("%20%20"," ").trim()).populate('studentParticipating')
  let studentAlreadyRegistered = await eventdb.findById(req.params.eventid.trim())
  //,{studentParticipating: { $in: [req.params.studentid] }})
 let statusOfStudentAlreadyRegistered = studentAlreadyRegistered.studentParticipating.find((h)=>{return h == req.params.studentid})
  //console.log(Boolean(statusOfStudent))
  //  console.log(studentAlreadyRegistered)
  if(newStuParticipating && eventToBeModified) {
    if(Boolean(statusOfStudentAlreadyRegistered)) {
      res.send("Student has already been marked as attending ")
    }

else if(eventToBeModified.studentParticipating.length == "Unlimited Number of Student" ) {
  //mysql
  sqldb.query(`insert into eventStudentAndHours(eventId,studentId) values(${eventToBeModifiedMysql.id},${newStuParticipatingMysql.id})`,(err,result)=>{
    if(err) {
      console.log(err)
      return ;
    }
    console.log(result)
  })
  let newEventAndRenHours = await new eventAndRenderedHoursdb({
    eventId:eventToBeModified._id,
    studentId:newStuParticipating._id,
  });
  await newEventAndRenHours.save() ;
  eventdb.findByIdAndUpdate(req.params.eventid.replace("%20%20"," ").trim(),{$push:{studentParticipating:req.params.studentid.replace("%20%20"," "),studentParticipatingAndHoursRendered:newEventAndRenHours._id}}).then(()=>res.send("the student has been succesfully added to the event as attending")).catch((e)=>{res.send("there was an error pls retry") ;  })
}



    else if(eventToBeModified.studentParticipating.length == eventToBeModified.eventNoOfStudent) {
      res.send("no more students are allowed to participate in this event")
    }

    else {
  //mysql
  sqldb.query(`insert into eventStudentAndHours(eventId,studentId) values(${eventToBeModifiedMysql.id},${newStuParticipatingMysql.id})`,(err,result)=>{
    if(err) {
      console.log(err)
      return ;
    }
    console.log(result)
  })



let newEventAndRenHours = await new eventAndRenderedHoursdb({
    eventId:eventToBeModified._id,
    studentId:newStuParticipating._id,
  });
  await newEventAndRenHours.save() ;


      eventdb.findByIdAndUpdate(req.params.eventid.replace("%20%20"," ").trim(),{$push:{studentParticipating:req.params.studentid.replace("%20%20"," "),studentParticipatingAndHoursRendered:newEventAndRenHours._id}}).then(()=>res.send("the student has been succesfully added to the event as attending")).catch((e)=>{res.send("there was an error pls retry") ;  })

    }
  }
    */