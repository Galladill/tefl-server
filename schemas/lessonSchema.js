(function() {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var lessonSchema = new Schema({
        '_user': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        '_activity': [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'activity'
        }],
        'duration': {
            type: Number,
            required: true
        },
        'title': {
            type: String,
            required: true
        },
        'studentGoals': [{
            type: String
        }],
        'teacherGoals': [{
            type: String
        }]
    });

    module.exports = mongoose.model('lesson', lessonSchema);
})();
