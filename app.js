const express=require("express");
const bodyParser=require("body-parser");
const { post } = require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const mail=req.body.email;

    const data={
        members:[
            {
                email_address:mail,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }

            }
        ]
    
    };

    var jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/d75018f2fe"

    var options={
        method:"POST",
        auth:"albert1:70942100bf4d6626116a745cdc237052-us21"
        
    };

   const request = https.request(url, options, function(response){

    if (response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/error.html");
    }
    
    response.on("data",function(data){

        console.log(JSON.parse(data));
        
        console.log(response.statusCode);
    })
    
    
    
    


    

        
    })
    
      request.write(jsonData);
      request.end();

});

app.post("/error",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("server is runnig on port 3000.");
    
});


