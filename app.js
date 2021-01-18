const express=require('express');
const app=express();
const https=require('https');
const path=require("path");
const fs =require("fs");
const bodyPaser=require('body-parser');
const {id}=require("./config")
app.use(bodyPaser.urlencoded({extended:true}));
app.get('/',function(req,res)//to get the request
{
res.sendFile(__dirname+"/index.html");
});
app.post('/',function(req,res)
{
  const city=req.body.Cityname;
  console.log(city);
  const un="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?appid="+id+"&units="+un+"&q="+city;
  https.get(url,function(response){

    console.log("status code:",response);
    response.once("data",function(data){
      const weatherData=JSON.parse(data);
      console.log(weatherData.weather[0]);
//      weather  below is the array
       const type= weatherData.weather[0].description;//note check the type of Json .
     
     const icon=weatherData.weather[0].icon;
     const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
     const temp=weatherData.main.temp;

    //  data saved in file 
     fs.writeFile('data.txt', data, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    // data shown in website
     res.write("<br/><br/></br></br></br></br><h1 style='text-align:center;color:#68E107;font-size:3rem'>Weather of "+city+" is "+type+"</h1>");
   res.write("<center><img  src= "+imgURL+"></center>");
     res.write("<p style='text-align:center;color:#454642;font-size:2rem'> Temperature is :"+temp+" Celcius</p>")
    
     
    });// "data" syntax so dont try to change without using jsonparser the data wil show hexadecimal formate
  });//note:this callback function will give response data not the weather data
  

});
app.listen(4000,function(err){
  if(err)
  {console.log(err);
  }
  else
    console.log(" Server running");
});
