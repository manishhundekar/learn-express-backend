var express = require('express');
var router = express.Router();
var queryData = require("../dBConfig/queryData")

//All Hospitals
router.get('/', function(req, res){
    queryData("SELECT * FROM HOSPITALS WHERE STATUS=1 ORDER BY ID", [], res, function(result){
        if(result.length == 0){
            res.status(404)
        }
        else{
            res.status(200).json(result)
        }
        res.end()
    })
});

// Delete Hospital
router.delete('/delete', function(req, res){
    //console.log("4")
    queryData("UPDATE HOSPITALS SET STATUS='0' where ID = ? ", [req.body.id], res, 
    function(result){
        res.status(200)
        res.end()
    })
});

//Edit Hospital
  router.post('/edit', function(req, res){ 
    //console.log("3")
    queryData("UPDATE HOSPITALS SET name = ? where id = ?" , 
                [
                    req.body.name,
                    req.body.id
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "Hospital Edited Successfully"
                    })
        res.end()
    })
 });

 //Add Hospital
 router.post('/add', function(req, res){ 
    //console.log("3")
    queryData("INSERT INTO HOSPITALS(name) values(?)" , 
                [
                    req.body.name
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "Hospital Added Successfully"
                    })
        res.end()
    })
 });
module.exports = router;