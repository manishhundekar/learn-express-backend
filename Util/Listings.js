var express = require('express');
var router = express.Router();
var queryData = require("../dBConfig/queryData");
const getListingStatus = require('../Util/ListingsUtil');

//All Listings
router.get('/', function(req, res){
    console.log("1")
    const query = "SELECT L.*, P.prname FROM LISTINGS L, PRODUCTS P WHERE L.STATUS='1' AND P.STATUS='1' AND L.PRODUCT_ID = P.ID";
    queryData(query, [], res, function(result){
        if(result.length == 0){
            res.status(404)
        }
        else{
            var filteredResult = []
            result.map(item => {
                filteredResult.push({
                    ...item,
                    listingStatus : getListingStatus(item)
                })
            })
            //console.log(filteredResult)
            res.status(200).json(filteredResult)
        }
        res.end()
    })
});


// Delete Product
router.delete('/delete', function(req, res){
    console.log("2")
    queryData("UPDATE LISTINGS SET STATUS='0' where ID = ? ", [req.body.id], res, 
    function(result){
        res.status(200)
        res.end()
    })
});

 //Add Listing
 router.post('/add', function(req, res){ 
    console.log("3")
    queryData("INSERT INTO LISTINGS(product_id,bin_price,shipping_charges,total_quantity,remaining_quantity,iaa,base_price,incr_percent,auc_start_date_time,auc_end_date_time) values(?,?,?,?,?,?,?,?,?,?)" , 
                [
                    req.body.product_id,
                    req.body.bin_price,
                    req.body.shipping_charges,
                    req.body.total_quantity,
                    req.body.total_quantity,
                    req.body.iaa,
                    req.body.base_price,
                    req.body.incr_percent,
                    req.body.auc_start_date_time,
                    req.body.auc_end_date_time
                ], 
                res,
                function(result){
                        //console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "Listing Added Successfully"
                    })
        res.end()
    })
 });

  //Edit Listing
  router.post('/edit', function(req, res){ 
    console.log("4")
    queryData("UPDATE listings SET product_id = ?, bin_price = ?, shipping_charges = ?,total_quantity = ?,remaining_quantity = ?,iaa = ?,base_price = ?,incr_percent = ?,auc_start_date_time = ?,auc_end_date_time = ? where id = ?" , 
                [
                    req.body.product_id,
                    req.body.bin_price,
                    req.body.shipping_charges,
                    req.body.total_quantity,
                    req.body.remaining_quantity,
                    req.body.iaa,
                    req.body.base_price,
                    req.body.incr_percent,
                    req.body.auc_start_date_time,
                    req.body.auc_end_date_time,
                    req.body.id
                ], 
                res,
                function(result){
                        res.status(200).json({
                            status : 200,
                            message : "Listing Edited Successfully"
                    })
        res.end()
    })
 });

 //Listing by ID
router.get('/:id', function(req, res){
    console.log("5")
    queryData("SELECT L.*, P.prname FROM LISTINGS L, PRODUCTS P WHERE L.STATUS='1' AND P.STATUS='1' AND L.PRODUCT_ID = P.ID AND L.ID = ?", [req.params.id], res, function(result){
        if(result.length == 0){
            res.status(404)
        }
        else{
            var filteredResult = []
            result.map(item => {
                filteredResult.push({
                    ...item,
                    listingStatus : getListingStatus(item)
                })
            })
            //console.log(filteredResult)
            res.status(200).json(filteredResult)
        }
        res.end()
    })
 });

module.exports = router;