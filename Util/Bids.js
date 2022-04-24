var express = require('express');
var router = express.Router();
var queryData = require("../dBConfig/queryData");

//All Lead Bids
router.get('/', function(req, res){
    console.log("5")
    queryData("SELECT max(bid_price) as max_bid, listing_id FROM vintage100.biddings WHERE listing_id = 33 GROUP BY listing_id ",
     [], 
     res, 
     function(result){
        if(result.length == 0){
            console.log("zero")
            res.status(404)
            res.end()
        }
        else{
            const query1 = "SELECT B.id as bidID,B.*,L.*,P.*,M.* FROM biddings B,Listings L,Products P,Members M where B.listing_id = L.id AND L.product_id = P.id AND B.member_id = M.id AND B.listing_id = ? AND B.bid_price = ?";
            queryData(query1, [result[0].listing_id, result[0].max_bid], res, function(result1){
                if(result1.length == 0){
                    res.status(404)
                    res.end()
                }
                else{
                    console.log("MAIN")
                    var filteredResult = []
                    var item = result1[0]
                    filteredResult.push({
                        id: item.bidID,
                        bid_time_date: item.bid_time_date,
                        listing_id: item.listing_id,
                        prname: item.prname,
                        fullname: item.fullname,
                        bid_price: item.bid_price,
                    });
                    console.log(filteredResult)
                    res.status(200).json(filteredResult)
                    res.end()
                }
            })
        }
    })
 });

module.exports = router;