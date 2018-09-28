import {BaseTest} from '../BaseTest';
import * as mongoose from 'mongoose';

describe('Job postings REST test', () => {

    const test = new BaseTest();

    const req = {
        title: 'string',
        category: 'IT',
        dateStart: '2012-12-12',
        dateEnd: '2012-12-15',
        companyName: 'string'
    };

    const badreqCategory = {
        title: 'string',
        category: 'ITx',
        dateStart: '2012-12-12',
        dateEnd: '2012-12-15',
        companyName: 'string'
    };

    const badreqDate = {
        title: 'string',
        category: 'IT',
        dateStart: '2012-12-15',
        dateEnd: '2012-12-12',
        companyName: 'string'
    };

    before((done) => {
        mongoose.connect(process.env.MONGODBTEST_URI, {useNewUrlParser: true});
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', () => {
            console.log('Connected to db.');
            done();
        });
    });

    it('it should add a new posting', (done) => {
        test.chai.request(test.server)
            .post(`${test.route}/postings`)
            .send(req)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                done();
            });
    });

    it('it should get postings array', (done) => {
        test.chai.request(test.server)
            .get(`${test.route}/postings`)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.an('array');
                done();
            });
    });

    it('it should fail on incorrect category in payload', (done) => {
        test.chai.request(test.server)
            .post(`${test.route}/postings`)
            .send(badreqCategory)
            .end((err, res) => {
                res.status.should.equal(422);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                done();
            });
    });

    it('it should fail on dates conflict', (done) => {
        test.chai.request(test.server)
            .post(`${test.route}/postings`)
            .send(badreqDate)
            .end((err, res) => {
                res.status.should.equal(422);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                done();
            });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            console.log('db drop');
            done();
        });
    });

});
