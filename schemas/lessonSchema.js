(function() {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var lessonSchema = new Schema({
        '_user': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'Required']
        },
        '_activity': [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'activity',
            required: [true, 'Required']
        }],
        'duration': {
            type: Number,
            required: [true, 'Required']
        },
        'title': {
            type: String,
            required: [true, 'Required']
        }
    });

    module.exports = mongoose.model('lesson', lessonSchema);
})();
