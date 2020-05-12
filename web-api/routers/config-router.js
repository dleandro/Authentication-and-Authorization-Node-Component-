'use strict'

const
fs = require('fs'),
configRouter = require('express').Router()

configRouter.post('/database',(req,res)=>{
    let obj=req.body
    let config=JSON.parse(fs.readFileSync(__dirname + '/common/config/production.json','utf-8'))
    console.log(config)
    config.database_opts=obj
    console.log(config)
    res.end()
})

configRouter.post('/google',(req,res)=>{
    let obj=req.body
    let config=JSON.parse(fs.readFileSync(__dirname + '/common/config/production.json','utf-8'))
    console.log(config)
    config.google=obj
    console.log(config)
    res.end()
})

configRouter.post('/azureAD',(req,res)=>{
    let obj=req.body
    let config=JSON.parse(fs.readFileSync(__dirname + '/common/config/production.json','utf-8'))
    console.log(config)
    config.azureAD=obj
    console.log(config)
    res.end()
})

module.exports = configRouter