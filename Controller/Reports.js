var express = require('express');
var router = express.Router();
var queryData = require("../dBConfig/queryData")

//Report by ID
router.get('/:id', function(req, res){
    queryData("SELECT R.*, D.phone_no, D.name as referred_doc_name, I.payment_type FROM INVOICES I, REPORTS R, DOCTORS D WHERE R.STATUS=1 AND R.REFERRED_DOC=D.ID AND R.SRF_ID=I.VOUCHER_NO AND R.ID= ?  ORDER BY ID", [req.params.id], res, function(result){
        if(result.length == 0){
            console.log("fail1")
            res.status(404)
            res.end()
        }
        else{
            console.log("1")
            queryData("SELECT * FROM DOCTORS WHERE ID= ?", [result[0].prepared_doc], res, function(result1){
                if(result1.length == 0){
                    console.log("fail2")
                    res.status(404)
                }else{
                    res.status(200).json({
                        ...result[0],
                        prepared_doctor : {
                            ...result1[0]
                        }
                    })
                }
                res.end()
            })
        }
    })
});

//All Reports
router.get('/', function(req, res){
    //SELECT R.*, D.*,R.ID as report_id FROM REPORTS R, DOCTORS D WHERE R.STATUS=1 AND D.STATUS=1 AND R.REFERRED_DOC=D.NAME ORDER BY R.ID
    //SELECT * FROM REPORTS WHERE STATUS=1 ORDER BY ID
    queryData("SELECT R.*, D.phone_no, D.name as referred_doc_name, I.payment_type FROM REPORTS R, DOCTORS D, INVOICES I WHERE R.STATUS=1 AND I.STATUS=1 AND R.REFERRED_DOC=D.ID AND R.SRF_ID=I.VOUCHER_NO ORDER BY R.ID DESC", [], res, function(result){
        if(result.length == 0){
            res.status(404)
        }
        else{
            console.log(result)
            res.status(200).json(result)
        }
        res.end()
    })
});

 //Add Report
 router.post('/add', function(req, res){ 
    queryData("INSERT INTO REPORTS(timestamp,prepared_doc, referred_doc, referred_hosp, srf_id, sample_collected_date, sample_received_date, sample_reported_on,pat_name, pat_age, pat_sex, pat_phoneno, specimen_type, test_type, data1, data2, data3, finaldata, ct_data1, ct_data2, ct_data3, sample_collected_by) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" , 
                [
                    new Date().toString(),
                    req.body.prepared_doc,
                    req.body.referred_doc,
                    req.body.referred_hosp,
                    req.body.srf_id,
                    req.body.sample_collected_date,
                    req.body.sample_received_date,
                    req.body.sample_reported_on,
                    req.body.pat_name,
                    req.body.pat_age,
                    req.body.pat_sex,
                    req.body.pat_phoneno,
                    req.body.specimen_type,
                    req.body.test_type,
                    req.body.data1,
                    req.body.data2,
                    req.body.data3,
                    req.body.finaldata,
                    req.body.ct_data1,
                    req.body.ct_data2,
                    req.body.ct_data3,
                    req.body.sample_collected_by
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "New Report Generated Successfully"
                    })
        res.end()
    })
 });

  //Update Report
  router.post('/edit', function(req, res){ 
    queryData("UPDATE REPORTS SET prepared_doc = ?, referred_doc = ?, referred_hosp = ?, srf_id = ?, sample_collected_date = ?, sample_received_date = ?, sample_reported_on = ?,pat_name = ?, pat_age = ?, pat_sex = ?, pat_phoneno = ?, specimen_type = ?, test_type = ?, data1 = ?, data2 = ?, data3 = ?, finaldata = ?, ct_data1 = ?, ct_data2 = ?, ct_data3 = ?, sample_collected_by = ? where id = ?" , 
                [
                    req.body.prepared_doc,
                    req.body.referred_doc,
                    req.body.referred_hosp,
                    req.body.srf_id,
                    req.body.sample_collected_date,
                    req.body.sample_received_date,
                    req.body.sample_reported_on,
                    req.body.pat_name,
                    req.body.pat_age,
                    req.body.pat_sex,
                    req.body.pat_phoneno,
                    req.body.specimen_type,
                    req.body.test_type,
                    req.body.data1,
                    req.body.data2,
                    req.body.data3,
                    req.body.finaldata,
                    req.body.ct_data1,
                    req.body.ct_data2,
                    req.body.ct_data3,
                    req.body.sample_collected_by,
                    req.body.id
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "New Report Generated Successfully"
                    })
        res.end()
    })
 });

// Delete Report
router.delete('/delete', function(req, res){
    //console.log("4")
    queryData("UPDATE REPORTS SET STATUS='0' where ID = ? ", [req.body.id], res, 
    function(result){
        res.status(200)
        res.end()
    })
});

module.exports = router;