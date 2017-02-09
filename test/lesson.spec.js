var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var User = require('../schemas/userSchema');
var should = chai.should();
chai.use(chaiHttp);


describe('lesson api', function() {
    var lessonId;
    var userId;
    before(function(done) {
        User.findOne({}, function(err, user){
            userId = user._id;
            done();
        });
    });

    describe('/lesson POST endpoint', function() {
        it('should add a lesson with valid data', function(done) {
            var validActivity = { duration: 120, title: 'xyz'};
            chai.request(server)
                .post('/lesson')
                .set('user_id', userId)
                .send(validActivity)
                .end(function(err, res){
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('duration');
                    res.body.should.have.property('title');
                    res.body.should.have.property('_user');
                    res.body.should.have.property('_id');
                    lessonId = res.body._id;
                    done();
                });
        });

        it('should NOT add a lesson with invalid data', function(done) {
            var invalidLesson = {password: 'derp'};
            chai.request(server)
                .post('/lesson')
                .send(invalidLesson)
                .end(function(err, res){
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    done();
                });
        });
    });

    describe('/lesson GET endpoint', function() {
        it('should list ALL activities', function(done) {
            chai.request(server)
                .get('/lesson')
                .send()
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/lesson/:id GET endpoint', function() {
        it('should return a lesson with a valid ID', function(done) {
            chai.request(server)
                .get('/lesson/' + lessonId)
                .send()
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should NOT return a lesson with an invalid ID', function(done) {
            chai.request(server)
                .get('/lesson/thisisabadid')
                .send()
                .end(function(err, res){
                    res.should.have.status(404);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/lesson/:id PUT endpoint', function() {
        it('should update a lesson with valid data and id', function(done) {
            chai.request(server)
                .put('/lesson/' + lessonId)
                .send({ duration: 30, title: '123'})
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should NOT update a lesson with invalid data', function(done) {
            chai.request(server)
                .put('/lesson/' + lessonId)
                .send({duration: null})
                .end(function(err, res){
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });


        it('should NOT update an lesson with an invalid id', function(done) {
            chai.request(server)
                .put('/lesson/123invalidid')
                .send()
                .end(function(err, res){
                    res.should.have.status(404);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    describe('/lesson/:id DELETE endpoint', function () {
        it('should delete a lesson with a valid ID', function(done){
            chai.request(server)
                .delete('/lesson/' + lessonId)
                .send()
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should NOT delete an lesson with an invalid ID', function(done){
            chai.request(server)
                .delete('/lesson/invalidid123')
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
