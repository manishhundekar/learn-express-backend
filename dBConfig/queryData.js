var express = require('express');
var router = express.Router();
var connection = require('./connection')
var Q = require('q')

const queryData = (query , parameters, res, callBack)=>{

    /* Q.fcall(connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      })
      ).then(
        connection.query(query, (err, result , fields) => {
            if (err) throw err
            callBack(result)
            console.log("Fetched!")
        })
      ).then(
        connection.end(()=>{
            console.log("Ended!")
        })
      ) */
    
      connection.query(query, parameters, (err, result , fields) => {
        if (err){
          res.status(400).json({
            message : "Database Error"
          })
          res.end()
          throw err
        } 
        console.log("Executed!")
        callBack(result)
    })
}

module.exports = queryData;