var express = require('express');
var router = express.Router();
var queryData = require("../dBConfig/queryData");
const getOrderStatus = require('../Util/OrdersUtil');
const parseShipmentDetails = require('../Util/ShipmentsUtil');
const parsePaymentDetails = require('../Util/PaymentsUtil');
const orderItemsDetails = require('../Util/OrderItemUtil');

//All Orders for main screen
router.get('/', function(req, res){
    const query = "SELECT O.id as orderId, O.timestamp as orderDateTime,O.*,M.*,A.*,S.*,PA.* FROM ORDERS O, MEMBERS M,ADDRESSES A,SHIPMENTS S,PAYMENTS PA WHERE O.MEMBER_ID = M.ID AND O.MEMBER_ADD_ID = A.ID  AND O.ID  = PA.ORDER_ID AND O.ID = S.ORDER_ID";
    queryData(query, [], res, function(result){
        if(result.length == 0){
            res.status(404)
        }
        else{
            console.log("MAIN")
            var filteredResult = []
            result.map(item => {
                filteredResult.push({
                    id: item.orderId,
                    timestamp: item.orderDateTime,
                    fullname: item.fullname,
                    total_order_amount: item.total_order_amount,
                    orderStatus: getOrderStatus(item)
                });
            })
            console.log(filteredResult)
            res.status(200).json(filteredResult)
            res.end()
       }
    })
});

 //Order by ID
router.get('/:id', function(req, res){
    console.log("5")
    queryData("SELECT O.id as orderId, O.timestamp as orderDateTime,PA.id as paymentId, S.id as shipmentId ,O.*,M.*,A.*,S.*,PA.* FROM ORDERS O, MEMBERS M,ADDRESSES A,SHIPMENTS S,PAYMENTS PA WHERE O.MEMBER_ID = M.ID AND O.MEMBER_ADD_ID = A.ID  AND O.ID  = PA.ORDER_ID AND O.ID = S.ORDER_ID AND O.ID = ?",
     [req.params.id], 
     res, 
     function(result){
        if(result.length == 0){
            console.log("zero")
            res.status(404)
            res.end()
        }
        else{
            const query1 = "SELECT O.id as orderId, O.timestamp as orderDateTime,L.*,P.*,O.*,OT.* FROM LISTINGS L, PRODUCTS P, ORDERS O, ORDER_ITEMS OT WHERE L.PRODUCT_ID = P.ID AND OT.LISTING_ID = L.ID AND OT.ORDER_ID = O.ID AND O.ID = ?";
            queryData(query1, [result[0].orderId], res, function(result1){
                if(result1.length == 0){
                    res.status(404)
                }
                else{
                    console.log("MAIN")
                    var filteredResult = []
                    var item = result[0]
                    filteredResult.push({
                        id: item.orderId,
                        timestamp: item.orderDateTime,
                        fullname: item.fullname,
                        total_order_amount: item.total_order_amount,
                        orderStatus: getOrderStatus(item),
                        address: {
                            name : item.name,
                            address : item.address,
                            landmark : item.landmark,
                            city : item.city,
                            pincode : item.pincode,
                            state : item.state,
                            country : item.country,
                            phone_no : item.phone_no
                        },
                        orderItems : orderItemsDetails(result1),
                        shipmentDetails : parseShipmentDetails(item),
                        paymentDetails : parsePaymentDetails(item)
                    });
                    console.log(filteredResult)
                    res.status(200).json(filteredResult)
                    res.end()
                }
            })
        }
    })
 });


router.put('/confirm', function(req, res){ 
    console.log("Confirm order")
    if(req.body.paymentStatus == "PAYMENT_AWAITING"){
        queryData("UPDATE ORDERS SET CONFIRMED = 1 where ID = ?" , 
            [req.body.id], 
            res,
            function(result1){
                console.log(req.body)
                queryData("UPDATE PAYMENTS SET PAYMENT_SUCCESS = 1, TRANS_ID = ?, TRANS_DATE_TIME = ?, MODE = ? , AMOUNT = ? WHERE id = ? ",
                 [
                     req.body.trans_id,
                     req.body.trans_date_time,
                     req.body.mode,
                     req.body.amount,
                     req.body.paymentId,
                 ], 
                 res, 
                    function(result2){
                        console.log(result2)
                        res.status(200).json({
                            status : 200,
                            message : "Order Confirmed Successfully"
                        })
                        res.end()
                    }
                )
            })
    }else{
        queryData("UPDATE ORDERS SET CONFIRMED = 1 where ID = ?" , 
            [req.body.id], 
            res,
            function(result1){
                res.status(200).json({
                    status : 200,
                    message : "Order Confirmed Successfully"
                })
                res.end()
            })
    }
});

router.put('/cancel', function(req, res){ 
    console.log("Cancel order")
    queryData("UPDATE ORDERS SET CANCELLED = 1 where ID = ?" , 
        [req.body.id], 
        res,
        function(result){
            res.status(200).json({
                status : 200,
                message : "Order Cancelled Successfully"
            })
            res.end()
        })
});

  //Confirm Shipment
  router.put('/confirmshipment', function(req, res){ 
    console.log(req.body)
    queryData("UPDATE shipments SET shipment_date = ?, courier_name = ?, tracking_no = ?,shipped = 1 where id = ?" , 
                [
                    req.body.shipment_date,
                    req.body.courier_name,
                    req.body.tracking_no,
                    req.body.shipmentId
                ], 
                res,
                function(result){
                        res.status(200).json({
                            status : 200,
                            message : "Shipment Confirmed Successfully"
                    })
        res.end()
    })
 });

  //Confirm Delivery
  router.put('/confirmdelivery', function(req, res){ 
    console.log(req.body)
    queryData("UPDATE shipments SET delivered = 1 where id = ?" , 
            [
                req.body.shipmentId
            ], 
            res,
            function(result){
                    res.status(200).json({
                        status : 200,
                        message : "Shipment Delivered Successfully"
            })
            res.end()
        })
 });

module.exports = router;