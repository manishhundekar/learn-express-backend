var express = require('express');
var router = express.Router();
var queryData = require("../dBConfig/queryData")

//All Invoices
router.get('/', function(req, res){
    queryData("SELECT * FROM INVOICES WHERE STATUS=1 ORDER BY ID DESC", [], res, function(result){
        if(result.length == 0){
            res.status(404)
        }
        else{
            res.status(200).json(result)
        }
        res.end()
    })
});

// Delete INVOICES
router.delete('/delete', function(req, res){
    //console.log("4")
    queryData("UPDATE INVOICES SET STATUS='0' where ID = ? ", [req.body.id], res, 
    function(result){
        res.status(200)
        res.end()
    })
});

//Edit INVOICES
  router.post('/edit', function(req, res){ 
    //console.log("3")
    queryData("UPDATE INVOICES SET voucher_no = ?,description = ?,amount = ?,amount_words = ?,payment_type = ?, patient_name = ?, patient_phoneno = ? where id = ?" , 
                [
                    req.body.voucher_no,
                    req.body.description,
                    req.body.amount,
                    req.body.amount_words,
                    req.body.payment_type,
                    req.body.patient_name,
                    req.body.patient_phoneno,
                    req.body.id,
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "Invoice Edited Successfully"
                    })
        res.end()
    })
 });

 //Add INVOICES
 router.post('/add', function(req, res){ 
    //console.log("3")
    queryData("INSERT INTO INVOICES(timestamp, voucher_no, description, amount, amount_words, payment_type, patient_name, patient_phoneno) values(?,?,?,?,?,?,?,?)" , 
                [
                    new Date().toString(),
                    req.body.voucher_no,
                    req.body.description,
                    req.body.amount,
                    req.body.amount_words,
                    req.body.payment_type,
                    req.body.patient_name,
                    req.body.patient_phoneno
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "Invoice Generated Successfully"
                    })
        res.end()
    })
 });

//Report by ID
router.get('/:id', function(req, res){
    queryData("SELECT * FROM INVOICES WHERE STATUS=1 AND ID= ? ORDER BY ID", [req.params.id], res, function(result){
        if(result.length == 0){
            res.status(404)
        }
        else{
            res.status(200).json(result)
        }
        res.end()
    })
});

module.exports = router;