
// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan     = require('morgan');
let request = require('superagent')
const url = 'https://nutkun-medicine.firebaseio.com/'
/*
request
  .get(`${url}dispensary.json`)
  .end((err,res) => console.log(JSON.stringify(res.body)))
request
  .post(`${url}dispensary[d].json`)
     
  .send('{"name":"pada","pet":"nori"}')
  .end((err, res) => console.log(err, res.ok))
*/
/*app.get('/param/:id', (req, res) => {
  console.log(req.params)
  return res.send(req.params.id)})
  
app.get('/yr/:id', (req, res) => {
  var HN = req.body.HN;
 
  request
  .get(`${url}/History.json`)
  .end((err, res) => {
      const history = res.body
      const d1 = Object.keys(history).filter(d => history[d].Patient.HN === HN)
      console.log('d1', d1[0]);
      return resp.send(history[d1[0]])})})

  
  //console.log(req.params)
  //return res.send(req.params.id)})*/

app.get('/drug', (req, resp) => {
  //res.send('hi')
  request
    .get(`${url}/drug.json`)
    //.send('{"name":"pada","pet":"nori"}')
    .end((err, res) => {
      const drug = res.body
      const d1 = Object.keys(drug).filter(d => drug[d].id === 'M0002')
      console.log('d1', d1[0]);
      return resp.send(drug[d1[0]])})
})
app.get('/medicine', (req, resp) => {
  //res.send('hi')
  request
    .get(`${url}/drug.json`)
    //.send('{"name":"pada","pet":"nori"}')
    .end((err, res) => {
      const drug = res.body
     
      console.log('drug', drug);
      return resp.send(drug)})
})

app.get('/getReturn', (req, resp) => {
  //res.send('hi')
  request
    .get(`${url}/return.json`)
    //.send('{"name":"pada","pet":"nori"}')
    .end((err, res) => {
      const drug = res.body
     
      console.log('drug', drug);
      return resp.send(drug)})
})




app.get('/dispensary', (req, resp) => {
  request
    .get(`${url}/dispensary.json`)
    .end((err, res) => {
      const dispensary = res.body
     
      console.log('dispensary', dispensary);
      return resp.send(dispensary)})
      
      
    })
app.get('/dispensaryTest', (req, resp) => {
  request.get(`${url}/dispensary.json`);
  var dispensary = resp.body;
  var waitingList;
  for(i = 0 ; i < dispensary.length ; i++){
    if(dispensary[i].status == "waiting"){
       waitingList[i] = dispensary[i];
    }
   
    
  } 
 
  request.end((err, res)=> {
    console.log(' waitingList', waitingList);
    
    return resp.send(waitingList)});
      
      
    })
app.post('/postDispensary', (req, resp) => {
 // var dispensary = new Dispensary();      // create a new instance of the Bear model
  //dispensary.name = req.body.name;  
 // var id = dispensary["dispensary" + req.params.id] ;
  var HNP = req.body.patient.hospitalID;
  var nameP = req.body.patient.name;
	var surenameP = req.body.patient.surename;
	var title = req.body.medicine.drug.title;
	var id = req.body.medicine.drug.id;
	var descrip = req.body.medicine.drug.descrip;
  var dose = req.body.dose;
  var status = req.body.statusD;
  var HND = req.body.doctor.hospitalID;
  var nameD = req.body.doctor.name;
  var surenameD = req.body.doctor.surename;
  
    request
    .post(`${url}/dispensary.json`)
    
    .send(`{"doctor":{"hospitalID":${HND},"name":${nameD},"surename": ${surenameD}},"medicine":{"medicine1":{"description":${descrip},"id":${id},"name":${title}}},"patient":{"hospitalID":${HNP},"name":${nameP},"surename": ${surenameP} },"dose":{"medicine1":${dose}},"status":${status}}`)
   
    .end((err, res) => console.log(err, res.ok))
      
      
})

app.post('/postHistory', (req, resp) => {
 // var dispensary = new Dispensary();      // create a new instance of the Bear model
  //dispensary.name = req.body.name;  
 // var id = dispensary["dispensary" + req.params.id] ;

    request
    .post(`${url}/history/hn-patient3.json`)
    
    .send('{"doctor":{"hospitalID":"hn-doctor2","name":"จิรัฐ","surename": "อยากเป็นหมอ2"},"medicine":{"medicine1":{"description":"Ranitidine Tablets, USP are a competitive, reversible inhibitor of the action of histamine at the histamine H2-receptors, including receptors on the gastric cells.","id":"M0003","name":"Ranitidine"}},"patient":{"hospitalID":"hn-patient3","name":"Yoyo","surename":"Y"},"dose":{"medicine1":"2"},"status":"done"}')
    .end((err, res) => console.log(err, res.ok))
      
      
})
app.post('/postDispensaryTest', (req, resp) => {
 // var dispensary = new Dispensary();      // create a new instance of the Bear model
  //dispensary.name = req.body.name;  
 // var id = dispensary["dispensary" + req.params.id] ;

    request
    .post(`${url}/dispensary.json`)
    
    .send('{"doctor":{"hospitalID":"hn-doctor2","name":"จิรัฐ","surename": "อยากเป็นหมอ2"},"medicine":{"medicine1":{"description":"Ranitidine Tablets, USP are a competitive, reversible inhibitor of the action of histamine at the histamine H2-receptors, including receptors on the gastric cells.","id":"M0003","name":"Ranitidine"}},"patient":"hospitalID":"hn-patient3","name":"Yoyo","surename":"Y"},"dose":{"medicine1":"2"},"status":"waiting"}')
    .end((err, res) => console.log(err, res.ok))
      
      
})





app.post('/postReturn', (req, resp) => {
 // var dispensary = new Dispensary();      // create a new instance of the Bear model
  //dispensary.name = req.body.name;  
 // var id = dispensary["dispensary" + req.params.id] ;

    request
    .post(`${url}/return.json`)
    
    .send('{"doctor":{"hospitalID":"2089","name":"Tera","surename": "N"},"medicine":{"medicine1":{"description":"Ranitidine Tablets, USP are a competitive, reversible inhibitor of the action of histamine at the histamine H2-receptors, including receptors on the gastric cells.","id":"M0003","name":"Ranitidine"}},"patient":{"hospitalID":"1001","name":"Mitsuha","surename":"M"},"dose":{"medicine1":"1"},"status":"return"}')
    .end((err, res) => console.log(err, res.ok))
      
      
})
/*app.get('/getHistory', (req, resp)=>{
  //status done
  var id = req.body.HN;
  
  request.get(`${url}/History.json`);
  request.end((err, res) => {
      const history = res.body;
      const d1 = Object.keys(history).filter(d => history[d].Patient.HN === id);
      console.log('d1', d1[0]);
      return resp.send(history[d1[0]])});
     
   
  
  
})*/
app.post('/getHistory', (req, resp)=>{//do it
  //status done
  var id = req.body.patientID;
  //var cid = req.params.id;
  //var id = cid.substring(1,cid.lenght);
  request.get(`${url}/history/${id}.json`);
  request.end((err, res) => {
      const history = res.body;
      console.log('history', history);
      return resp.send(history)});
     
   
  
  
})
app.get('/getHistoryTest/:id', (req, res)=>{//test
  //status done
  var ee = req.params.id;
  var id = ee.substring(1,5);
  
  request.get(`${url}/history.json`);
  console.log(res.body[id]);
  return res.send(res.body[id])});
   
  
  

app.get('/getAllergy', (req, resp)=>{
  //get data then macth with medicine in dispensary
  
  
})
app.post('/confirmPre',(req,resp)=>{
  var presciptID = req.body.prescriptionID;
  request.get(`${url}/dispensary.json`)
  
  
})
app.post('/confirm', (req, resp)=>{//Here
  //change status to be done
 // var id = dispensary["dispensary" + req.params.id] ;
// var prescriptionID = req.body.prescriptionID;
 //var prescription;
//  request.get(`${url}/dispensary.json`,(err, res){
//  prescription = Object.keys(res.body).filter(d => res.body[d].id === prescriptionID)
//  request.delete(`${url}/dispensary[prescription].json`)
    
//  })
  var preID = req.body.prescriptionID;
  var ans;
  var patientHN;
  request
    .get(`${url}/dispensary/${preID}.json`)
    .end((err,res) => {
      console.log(JSON.stringify(res.body))
      ans = res.body
      patientHN = ans.patient.hospitalID
     })
  request
    .delete(`${url}/dispensary/${preID}.json`)
    .end((err,res) => {
      console.log(JSON.stringify(res.body))
      
      
     })
  request.post(`${url}/history/${patientHN}.json`);
  request.send(ans);
  request.end((err, res) => console.log(err, res.ok));
  
  
})
app.get('/confirmTest', (req, resp)=>{
  //change status to be done
 // var id = dispensary["dispensary" + req.params.id] ;
// var prescriptionID = req.body.prescriptionID;
 //var prescription;
//  request.get(`${url}/dispensary.json`,(err, res){
//  prescription = Object.keys(res.body).filter(d => res.body[d].id === prescriptionID)
//  request.delete(`${url}/dispensary[prescription].json`)
    
//  })
/*  var preID = "-KWwhafEx5AyFagdzkkh";
  request.get('${url}/dispensary.json');
  var pre = resp.body;
  var d = Object.keys(pre).filter(d => pre[d].id === preID);
  var ans = pre[d];
  request.post(`${url}/History.json`);
  request.send(ans);
  request.end((err, res) => console.log(err, res.ok));*/
  var preID = "-KWwhafEx5AyFagdzkkh";
  request.get('${url}/dispensary.json');
  const pre = resp.body;
  const d1 = Object.keys(pre).filter(d => pre[d].id === preID);
  console.log('d1', d1[0]);
  request.post('${url}/History.json');
  request.send(pre[d1[0]]);
  request.end((err, res) => console.log(err, res.ok));
  
  
  
})
app.post('/return', (req, resp)=>{
  //change status to be returned, then 
   var preID = req.body.prescriptionID;
  var ans;
  var patientHN;
  request
    .get(`${url}/dispensary/${preID}.json`)
    .end((err,res) => {
      console.log(JSON.stringify(res.body))
      ans = res.body
      patientHN = ans.patient.hospitalID
     })
  request
    .delete(`${url}/dispensary/${preID}.json`)
    .end((err,res) => {
      console.log(JSON.stringify(res.body))
      
      
     })
  request.post(`${url}/return/${patientHN}.json`);
  request.send(ans);
  request.end((err, res) => console.log(err, res.ok));
})


app.put('/testPost:id', (req, resp)=>{
  var id = req.params.id;
  var name = req.body.name;
  request
  .post(`${url}/dipensary.json`)
 .send('{"name":name}')
  .end((err, res) => console.log(err, res.ok))
  
})


app.get('*', (req, res) => res.send('hi'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
  
