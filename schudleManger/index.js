const CronJob = require('cron').CronJob;
const guestModel = require('../model/guest')

// Cron Job run every 1 min
var job = new CronJob('* * * * *', function () {
    console.log('CronJob every 1 min')
    makeUnavaliable()    
}, null, true, 'America/Los_Angeles');
job.start();

// check if a user didn't take action in spesific time ex. 1 hour
let makeUnavaliable = async function() {
    let allowedTime = 1 // in hour
    // let currentTime = new Date()
    let delayedTime = new Date(new Date().setHours(new Date().getHours() - allowedTime))
    // console.log(currentTime)
    // console.log(delayedTime)
    let guests = await guestModel.findOneAndUpdate({ active: true, lastReq: {
        $lte: delayedTime,
    } 
    }, {
        active: false
    })
    console.log("Users expired: ", guests)
}