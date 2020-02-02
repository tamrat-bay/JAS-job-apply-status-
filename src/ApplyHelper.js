const mongoose = require('mongoose');
const Apply = require('./model/applyModel').Apply;


const getApplyHandler = (req,res)=>{
   return Apply.find({})
    .then(respone=> res.status(200).send(respone))
    .catch(err=>{console.log(err); res.status(500).send(`server problem - ${err}`)})
}


const postApplyHandler = (req,res)=>{
    const {company,location,product,status,cvversion,tech,isAnswered} = req.body
    //todo-- need to Add Validation
    const apply = new Apply({
        company,
        location,
        product,
        status,
        cvversion,
        tech,
        isAnswered
    });
    return apply.save()
    .then(respone=> res.status(201).send(respone))
    .catch(err=>{console.log(err); res.status(500).send(`server problem - ${err}`)})
}


const updateApplyHandler = (req,res)=>{
    const {id} = req.params;    
    console.log(id,'update id');
    
    return Apply.findByIdAndUpdate(id,req.body)
    .then(respone=> res.status(200).send(respone))
    .catch(err=>{console.log(err); res.status(500).send(`server problem - ${err}`)})
}

const deleteApplyHandler = (req,res)=>{
    const {id} = req.params;  
    return Apply.findOneAndDelete(id)
    .then(respone=> res.status(200).send('Deleted'))
    .catch(err=>{console.log(err); res.status(500).send(`server problem - ${err}`)})
}


module.exports.getApplyHandler = getApplyHandler;
module.exports.postApplyHandler = postApplyHandler;
module.exports.updateApplyHandler = updateApplyHandler;
module.exports.deleteApplyHandler = deleteApplyHandler;