const express  = require("express")
const app = express()
const request = require("request")
app.set ("view engine","ejs");
app.get("/",function(req,res) {
    res.render("search")
});
app.get("/results",function(req,res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";

    // http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            // vvv this is the whole thing !!
            // res.send(body)
            // body still a string we have to convert to JSON (if you want to grasp just what ever title[index])
            var data = JSON.parse(body)
            res.render("results",{data:data})
        }
    })
})

app.listen(8000,()=>{
    console.log("listening to localhost 8000")
});