var guestModel = require('../model/guest')

exports.createNewGuest = async (req, res)=> {
    try {
        let name = req.body.name;
        let newGuest = await new guestModel({
            name: name
        }).save()
        res.status(200).json({success: 1, data: newGuest, msg: "Succesfull"})
    } catch (error) {
        res.status(500).send({success: 0, msg: error})
    }
}

// Reutrn all active gusets
exports.getAllCurrentGuests = async (req, res)=> {
    try {
        let guests = await guestModel.find({active: true})
        res.status(200).json({success: 1, data: guests, msg: "Succesfull"})
    } catch (error) {
        res.status(500).send({success: 0, msg: error})
    }
}

// well need to call the function ecery time the guest user make an action
let makeAnAction = async function(id) {
    await guestModel.findOneAndUpdate({ _id: id }, { active: true })
}