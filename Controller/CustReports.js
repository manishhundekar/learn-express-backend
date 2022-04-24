var express = require('express');
var router = express.Router();
var queryData = require("../dBConfig/queryData")

//Report by ID
router.get('/:id', function(req, res){
    queryData("SELECT * FROM REPORTS WHERE STATUS=1 AND ID= ? ORDER BY ID", [req.params.id], res, function(result){
        if(result.length == 0){
            console.log("fail")
            res.status(404)
            res.end()
        }
        else{
            console.log("1")
            queryData("SELECT * FROM DOCTORS WHERE ID= ?", [result[0].prepared_doc], res, function(result1){
                if(result1.length == 0){
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

module.exports = router;