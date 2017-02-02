(function() {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var activitySchema = new Schema({
        '_user': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        'duration': {
            type: Number,
            required: true
        },
        'title': {
            type: String,
            required: true
        },
        'description': {
            type: String,
        },
        'level': {
            type: String,
            required: true
        },
        'tags': [{
            type: String
        }]
    });

    module.exports = mongoose.model('activity', activitySchema);
})();
