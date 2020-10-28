var guestModel = require('../model/guest')

let createNewGuest = async (req, res)=> {
    try {
        let name;
        if(req.body.name) {
            name = req.body.name;
        } else {
            name = await makeName()
        }
        let newGuest = await new guestModel({
            name: name
        }).save()
        res.status(200).json({success: 1, data: newGuest, msg: "Succesfull"})
    } catch (error) {
        res.status(500).send({success: 0, msg: error})
    }
}

// Reutrn all active gusets
let getAllCurrentGuests = async (req, res)=> {
    try {
        let guests = await guestModel.find({active: true})
        res.status(200).json({success: 1, data: guests, msg: "Succesfull"})
    } catch (error) {
        res.status(500).send({success: 0, msg: error})
    }
}

// new action
let someActoion = async (req, res)=> {
    if(req.body.id) {
        let id = req.body.id
        if(makeAnAction(id)) {
            res.status(200).json({success: 1, msg: "Succesfull"})
        } else {
            res.status(500).send({success: 0, msg: ''})
        }
    } else {
        createNewGuest(req, res)
    }
}

// well need to call the function ecery time the guest user make an action
let makeAnAction = async function(id) {
    await guestModel.findOneAndUpdate({ _id: id }, { active: true, lastReq: new Date() }, (err, docs)=> {
        if(!err){
            return true
        } else {
            return false
        }
    })
}
let makeName = async function() {
    var length = 14;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result)
    return result;
}

module.exports = {
    createNewGuest: createNewGuest,
    getAllCurrentGuests: getAllCurrentGuests,
    someActoion: someActoion,
}