var express = require('express');
var router = express.Router();
var queryData = require("../dBConfig/queryData")

//All Members
router.get('/', function(req, res){
    queryData("SELECT * FROM USERS ORDER BY ID", [], res, function(result){
        if(result.length == 0){
            res.status(404)
        }
        else{
            console.log("Data Fetch Successfull")
            res.status(200).json(result)
        }
        res.end()
    })
});

// // Delete Product
// router.delete('/delete', function(req, res){
//     //console.log("4")
//     queryData("UPDATE USERS SET STATUS='0' where ID = ? ", [req.body.id], res, 
//     function(result){
//         res.status(200)
//         res.end()
//     })
// });

//Edit Doctor
//   router.post('/edit', function(req, res){ 
//     //console.log("3")
//     queryData("UPDATE USERS SET name = ?, phone_no = ?, type = ?, prepared_doc_sign = ? where id = ?" , 
//                 [
//                     req.body.name,
//                     req.body.phone_no,
//                     req.body.type,
//                     req.body.prepared_doc_sign,
//                     req.body.id
//                 ], 
//                 res,
//                 function(result){
//                         console.log(req.body)
//                         res.status(200).json({
//                             status : 200,
//                             message : "Doctor Edited Successfully"
//                     })
//         res.end()
//     })
//  });

 //Add Doctor
 router.post('/add', function(req, res){ 
     console.log(req.body.user.firstName)
    queryData("INSERT INTO USERS(firstName,lastName,email) values(?,?,?)" , 
                [
                    req.body.user.firstName,
                    req.body.user.lastName,
                    req.body.user.email
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "User Added Successfully"
                    })
        res.end()
    })
 });
module.exports = router;