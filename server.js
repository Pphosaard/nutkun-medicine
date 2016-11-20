
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
app.get('/param/:id', (req, res) => {
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
  //return res.send(req.params.id)})

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
  var HNP = req.body.Patient.HN;
  var nameP = req.body.Patient.name;
	var surnameP = req.body.Patient.surname;
	var title = req.body.Medicine.drug.title;
	var id = req.body.Medicine.drug.id;
	var descrip = req.body.Medicine.drug.descrip;
  var dose = req.body.dose;
  var status = req.body.statusD;
  var HND = req.body.Doctor.HN;
  var nameD = req.body.Doctor.name;
  var surnameD = req.body.Doctor.surname;
  
    request
    .post(`${url}/dispensary.json`)
    
    .send('{"Doctor":{"HN":HND,"name":nameD,"surname": surnameD},"Medicine":{"medicine1":{"description":descrip,"id":id,"name":title}},"Patient":{"HN":HNP,"name":nameP,"surname":surnameP},"dose":{"medicine1":dose},"status":status}')
   
    .end((err, res) => console.log(err, res.ok))
      
      
})

app.post('/postHistory', (req, resp) => {
 // var dispensary = new Dispensary();      // create a new instance of the Bear model
  //dispensary.name = req.body.name;  
 // var id = dispensary["dispensary" + req.params.id] ;

    request
    .post(`${url}/History.json`)
    
    .send('{"Doctor":{"HN":"2089","name":"Tera","surname": "N"},"Medicine":{"medicine1":{"description":"Ranitidine Tablets, USP are a competitive, reversible inhibitor of the action of histamine at the histamine H2-receptors, including receptors on the gastric cells.","id":"M0003","name":"Ranitidine"}},"Patient":{"HN":"1001","name":"Mitsuha","surname":"M"},"dose":{"medicine1":"1"},"status":"done"}')
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
app.get('/getHistory/:id', (req, resp)=>{
  //status done
  var id = req.body.id;
  
  request.get(`${url}/History.json`);
  request.end((err, res) => {
      const history = res.body;
      console.log('history[id]', history[id]);
      return resp.send(history[id])});
     
   
  
  
})
app.get('/getHistoryTest/:id', (req, res)=>{//test
  //status done
  var ee = req.params.id;
  var id = ee.substring(1,5);
  
  request.get(`${url}/History.json`);
  console.log(res.body[id]);
  return res.send(res.body[id])});
   
  
  

app.get('/getAllergy', (req, resp)=>{
  //get data then macth with medicine in dispensary
  
  
})
app.get('/confirm', (req, resp)=>{
  //change status to be done
 // var id = dispensary["dispensary" + req.params.id] ;
// var prescriptionID = req.body.prescriptionID;
 //var prescription;
//  request.get(`${url}/dispensary.json`,(err, res){
//  prescription = Object.keys(res.body).filter(d => res.body[d].id === prescriptionID)
//  request.delete(`${url}/dispensary[prescription].json`)
    
//  })
  var preID = req.body.prescriptionID;
  request.get('${url}/dispensary.json');
  var pre = resp.body;
  var d = Object.keys(pre).filter(d => pre[d].id === preID);
  var ans = pre[d];
  request.post(`${url}/History.json`);
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
app.get('/retern:id', (req, resp)=>{
  //change status to be returned, then 
  
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
  
