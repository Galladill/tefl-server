var router = require('express').Router();
var Activity = require('../schemas/activitySchema');
var bcrypt = require('bcryptjs');

// these are the endpoints and their related functions
router.post('/activity', createActivity);
router.get('/activity', getActivities);
router.get('/activity/:id', getActivity);
router.put('/activity/:id', updateActivity);
router.delete('/activity/:id', deleteActivity);

function createActivity(req, res, next) {
    req.body._user = req.headers.user_id;
    Activity.create(req.body, function (err, activity) {
        if (err) {
            // console.log(err);
            return res.status(400).send(err);
        }
        return res.status(201).send(activity);
    });
}

// get all activitys
function getActivities(req, res, next) {
    Activity.find({_user: req.headers.user_id}, function (err, activities) {
         if (err) {
             return res.status(500).send(err);
         } else {
             return res.status(200).send(activities);
         }
    });
}

// get a specific activity
function getActivity(req, res, next) {
    Activity.findOne({_id: req.params.id}, function (err, activity) {
        if (err) {
            return res.status(400).send(err);
        } else if (activity == null) {
            return res.status(404).send({});
        } else {
            return res.status(200).send(activity);
        }
    });
}

function updateActivity(req, res, next) {
    Activity.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function (err, activity) {
        if (err) {
            return res.status(400).send(err);
        } else if (activity == null) {
            return res.status(404).send({});
        } else {
            return res.status(200).send(activity);
        }
    });
}

function deleteActivity(req, res, next) {
    Activity.remove({_id: req.params.id}, function (err, ret) {
         if (err) {
             return res.status(400).send(err);
         } else if (ret.result.n == 0) {
             return res.status(404).send(ret);
         } else {
             return res.status(200).send(ret);
         }
    });

}

// Make these endpoints available
module.exports = router;
