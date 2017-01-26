(function() {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var activitySchema = new Schema({
        '_user': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'Required']
        },
        'duration': {
            type: Number,
            required: [true, 'Required']
        },
        'title': {
            type: String,
            required: [true, 'Required']
        },
        'description': {
            type: String,
            required: [true, 'Required']
        }
    });

    module.exports = mongoose.model('activity', activitySchema);
})();
