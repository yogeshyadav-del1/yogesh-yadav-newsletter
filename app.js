const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")

})
app.post("/",function(req,res)
{
  var firstName = req.body.FirstName;
  var lastName=req.body.LastName;
  var emailAddress=req.body.email;
  var data={
    members:[
      {email_address:emailAddress,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName,
      }
    }
    ]
  };
  const options={
    method:"post",
    auth:"yogesh1:92d6d7f3b2fbeb952b26ead2fda4579e-us14"
  }
  const jsonData=JSON.stringify(data);
  const url ="https://us14.api.mailchimp.com/3.0/lists/76cbd9d1c4"


const request=  https.request(url,options,function(response){
  if(response.statusCode===200){
    // res.send("subscribed successfully!");
    res.sendFile(__dirname + "/success.html");
  }
  else{
    // res.send("please try again!")
    res.sendFile(__dirname+ "/failure.html")

  }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res){

  res.redirect("/");


});


app.listen( process.env.PORT || 3000 , function(){
  console.log("port is loading");
})

// api key
// 92d6d7f3b2fbeb952b26ead2fda4579e-us14

// audience id
// 76cbd9d1c4

// https://<dc>.api.mailchimp.com/3.0/
