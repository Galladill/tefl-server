var router = require('express').Router();
var Lesson = require('../schemas/lessonSchema');
var bcrypt = require('bcryptjs');

// these are the endpoints and their related functions
router.post('/lesson', createLesson);
router.get('/lesson', getLessons);
router.get('/lesson/:id', getLesson);
router.put('/lesson/:id', updateLesson);
router.delete('/lesson/:id', deleteLesson);

function createLesson(req, res, next) {
    req.body._user = req.headers.user_id;
    Lesson.create(req.body, function (err, lesson) {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(201).send(lesson);
    });
}

// get all lessons
function getLessons(req, res, next) {
    Lesson.find({_user: req.headers.user_id}, function (err, activities) {
         if (err) {
             return res.status(500).send(err);
         } else {
             return res.status(200).send(activities);
         }
    });
}

// get a specific lesson
function getLesson(req, res, next) {
    Lesson.findOne({_id: req.params.id}, function (err, lesson) {
        if (err) {
            return res.status(400).send(err);
        } else if (lesson == null) {
            return res.status(404).send({});
        } else {
            return res.status(200).send(lesson);
        }
    });
}

function updateLesson(req, res, next) {
    Lesson.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function (err, lesson) {
        if (err) {
            return res.status(400).send(err);
        } else if (lesson == null) {
            return res.status(404).send({});
        } else {
            return res.status(200).send(lesson);
        }
    });
}

function deleteLesson(req, res, next) {
    Lesson.remove({_id: req.params.id}, function (err, ret) {
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
