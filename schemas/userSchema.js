(function() {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        'email': {
            type: String,
            required: true
        },
        'password': {
            type: String,
            required: true
        },
        'firstName': {
            type: String,
            required: true
        },
        'lastName': {
            type: String,
            required: true
        },
        'accessToken': String,
        'refreshToken': String,
        'accessTokenExpires': Number,
        'refreshTokenExpires': Number,
    });

    module.exports = mongoose.model('user', userSchema);
})();
