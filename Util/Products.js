var express = require('express');
var router = express.Router();
var queryData = require("../dBConfig/queryData")

//All Products
router.get('/', function(req, res){
    //console.log("1")
    queryData("SELECT * FROM PRODUCTS WHERE STATUS='1' ORDER BY ID", [], res, function(result){
        if(result.length == 0){
            res.status(404)
        }
        else{
            res.status(200).json(result)
        }
        res.end()
    })
});

// List Subcategories
router.get('/subcategories', function(req, res){
    //console.log("4")
    queryData("SELECT DISTINCT SUBCATEGORY FROM PRODUCTS", [], res, function(result){
        if(result.length == 0){
            res.status(404)
        }
        else{
            res.status(200).json(result)
        }
        res.end()
    })
});

// Delete Product
router.delete('/delete', function(req, res){
    //console.log("4")
    queryData("UPDATE PRODUCTS SET STATUS='0' where ID = ? ", [req.body.id], res, 
    function(result){
        res.status(200)
        res.end()
    })
});

 //Add Product
 router.post('/add', function(req, res){ 
    //console.log("3")
    queryData("INSERT INTO PRODUCTS(prname,category,subcategory,tags,descrip,image1,image2,image3) values(?,?,?,?,?,?,?,?)" , 
                [
                    req.body.prname,
                    req.body.category,
                    req.body.subcategory,
                    req.body.tags,
                    req.body.desc,
                    req.body.image1,
                    req.body.image2,
                    req.body.image3
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "Product Added Successfully"
                    })
        res.end()
    })
 });

  //Add Product
  router.post('/edit', function(req, res){ 
    //console.log("3")
    queryData("UPDATE PRODUCTS SET prname = ?, category = ?, subcategory = ?, tags = ?, descrip = ?, image1 = ?, image2 = ?, image3 = ? where id = ?" , 
                [
                    req.body.prname,
                    req.body.category,
                    req.body.subcategory,
                    req.body.tags,
                    req.body.descrip,
                    req.body.image1,
                    req.body.image2,
                    req.body.image3,
                    req.body.id
                ], 
                res,
                function(result){
                        console.log(req.body)
                        res.status(200).json({
                            status : 200,
                            message : "Product Edited Successfully"
                    })
        res.end()
    })
 });

//Product by ID
router.get('/:id', function(req, res){
    //console.log(req.params.id)
    queryData("SELECT * FROM PRODUCTS WHERE STATUS='1' and ID = ?", [req.params.id], res, function(result){
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