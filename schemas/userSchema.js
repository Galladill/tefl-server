(function() {
    var mongoose = typeof require !== 'undefined' ? require('mongoose') : window.mongoose;
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        'email': {
            type: String,
            required: [true, 'Required']
        },
        'password': {
            type: String,
            required: [true, 'Required']
        },
        'firstName': {
            type: String,
            required: [true, 'Required']
        },
        'lastName': {
            type: String,
            required: [true, 'Required']
        },
        'accessToken': String,
        'refreshToken': String,
        'accessTokenExpires': Number,
        'refreshTokenExpires': Number,
    });

    if (typeof module !== 'undefined' && module.exports) {
        // If this is being run on backend, export the module
        module.exports = mongoose.model('user', userSchema);
    } else {
        // If this is being run on frontend, attach to window
        window.myApp.userSchema = userSchema;
    }
})();
