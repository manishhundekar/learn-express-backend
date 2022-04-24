var express = require('express');
var router = express.Router();
var queryData = require("../dBConfig/queryData")

//get Profile
router.get('/', function(req, res){
    queryData("SELECT * FROM PROFILE", [], res, function(result){
        if(result.length == 0){
            res.status(404)
        }
        else{
            res.status(200).json(result)
        }
        res.end()
    })
});

//Edit Profile Picture
  router.post('/editImage', function(req, res){ 
    //console.log("3")
    queryData("UPDATE PROFILE SET profile_pic = ? where id = 1" , 
                [
                    req.body.imageUrl
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "Profile Picture Edited Successfully"
                    })
        res.end()
    })
 });

 //Edit Positive Graph
 router.post('/editPositiveGraph', function(req, res){ 
    //console.log("3")
    queryData("UPDATE PROFILE SET positive_graph_url = ? where id = 1" , 
                [
                    req.body.imageUrl
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "Positive Graph Edited Successfully"
                    })
        res.end()
    })
 });

  //Edit Negative Graph
  router.post('/editNegativeGraph', function(req, res){ 
    //console.log("3")
    queryData("UPDATE PROFILE SET negative_graph_url = ? where id = 1" , 
                [
                    req.body.imageUrl
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "Negative Graph Edited Successfully"
                    })
        res.end()
    })
 });

 //Edit Profile Data
 router.post('/editProfileData', function(req, res){ 
    //console.log("3")
    queryData("UPDATE PROFILE SET email = ? , phoneno1 = ? , phoneno2 = ? where id = 1" , 
                [
                    req.body.email,
                    req.body.phoneno1,
                    req.body.phoneno2,
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "Profile Edited Successfully"
                    })
        res.end()
    })
 });

module.exports = router;