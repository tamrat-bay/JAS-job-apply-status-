const mongoose = require('mongoose');
const Apply = require('./model/applyModel').Apply;


const getApplyHandler = (req,res)=>{
   return Apply.find({})
    .then(response=> res.status(200).send(response))
    .catch(err=>{console.log(err); res.status(500).send(`server problem - ${err}`)})
}


const postApplyHandler = (req,res)=>{
    const {company,location,companySize,status,cvversion,jobDescription,isAnswered} = req.body
    //todo-- need to Add Validation
    const apply = new Apply({
        company,
        location,
        companySize,
        status,
        cvversion,
        jobDescription,
        isAnswered
    });
    return apply.save()
    .then(response=> res.status(201).send(response))
    .catch(err=>{console.log(err); res.status(500).send(`server problem - ${err}`)})
}


const updateApplyHandler = (req,res)=>{
    const {id} = req.params;    
    return Apply.findByIdAndUpdate(id,req.body,{new:true})
    .then(response=> {res.status(200).send(response) ; console.log(response,'db response');
    })
    .catch(err=>{console.log(err); res.status(500).send(`server problem - ${err}`)})
}

const deleteApplyHandler = (req,res)=>{
    const {id} = req.params;  
    return Apply.findOneAndDelete(id)
    .then(response=> res.status(200).send('Deleted'))
    .catch(err=>{console.log(err); res.status(500).send(`server problem - ${err}`)})
}


module.exports.getApplyHandler = getApplyHandler;
module.exports.postApplyHandler = postApplyHandler;
module.exports.updateApplyHandler = updateApplyHandler;
module.exports.deleteApplyHandler = deleteApplyHandler;