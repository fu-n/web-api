//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()
// let should = chai.expect()

chai.use(chaiHttp)


describe('wallet module', () => {
    it('1. create wallet success', (done) => {

    	let wallet = {
            mnemonic_phrase: "brain surround have swap horror body response double fire dumb bring hazard"
        }
        
        chai.request(server)
            .post('/api/wallet/create')
            .send(wallet)
            .set('Content-Type', 'application/json')
        	.set('Accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
              	done();
            });
        
    });

    it('2. create wallet mnemonic phrase required', (done) => {

    	let wallet = {}
        
        chai.request(server)
            .post('/api/wallet/create')
            .send(wallet)
            .set('Content-Type', 'application/json')
        	.set('Accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(422);
              	done();
            });
        
    });

    it('3. create wallet mnemonic phrase <= 12 words', (done) => {

    	let wallet = {
            mnemonic_phrase: "brain surround have"
        }
        
        chai.request(server)
            .post('/api/wallet/create')
            .send(wallet)
            .set('Content-Type', 'application/json')
        	.set('Accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(422);
              	done();
            });
        
    });
});