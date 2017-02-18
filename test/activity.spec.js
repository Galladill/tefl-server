var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var User = require('../schemas/userSchema');
var should = chai.should();
chai.use(chaiHttp);


describe('activity api', function() {
    var activityId;
    var userId;
    before(function(done) {
        User.findOne({}, function(err, user){
            userId = user._id;
            done();
        });
    });

    describe('/activity POST endpoint', function() {
        it('should add an activity with valid data', function(done) {
            var validActivity = { duration: 20, title: 'xyz', description: 'abc', level: 'any'};
            chai.request(server)
                .post('/activity')
                .set('user_id', userId)
                .send(validActivity)
                .end(function(err, res){
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('duration');
                    res.body.should.have.property('title');
                    res.body.should.have.property('description');
                    res.body.should.have.property('_user');
                    res.body.should.have.property('_id');
                    activityId = res.body._id;
                    done();
                });
        });

        it('should NOT add an activity with invalid data', function(done) {
            var inValidActivity = {password: 'derp'};
            chai.request(server)
                .post('/activity')
                .send(inValidActivity)
                .end(function(err, res){
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    done();
                });
        });
    });

    describe('/activity GET endpoint', function() {
        it('should list ALL activities', function(done) {
            chai.request(server)
                .get('/activity')
                .send()
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/activity/:id GET endpoint', function() {
        it('should return an activity with a valid ID', function(done) {
            chai.request(server)
                .get('/activity/' + activityId)
                .send()
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should NOT return an activity with an invalid ID', function(done) {
            chai.request(server)
                .get('/activity/thisisabadid')
                .send()
                .end(function(err, res){
                    res.should.have.status(404);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/activity/:id PUT endpoint', function() {
        it('should update an activity with valid data and id', function(done) {
            chai.request(server)
                .put('/activity/' + activityId)
                .send({ duration: 30, title: '123', description: 'drm'})
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should NOT update an activity with invalid data', function(done) {
            chai.request(server)
                .put('/activity/' + activityId)
                .send({duration: null})
                .end(function(err, res){
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });


        it('should NOT update an activity with an invalid id', function(done) {
            chai.request(server)
                .put('/activity/123invalidid')
                .send()
                .end(function(err, res){
                    res.should.have.status(404);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    describe('/activity/:id DELETE endpoint', function () {
        it('should delete an activity with a valid ID', function(done){
            chai.request(server)
                .delete('/activity/' + activityId)
                .send()
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should NOT delete an activity with an invalid ID', function(done){
            chai.request(server)
                .delete('/activity/invalidid123')
                .send()
                .end(function(err, res){
                    res.should.have.status(404);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
