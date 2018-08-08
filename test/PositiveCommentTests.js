const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const getComment = require('../data/positiveComments');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const schema = require("../data/commentSchema");

describe('Positive Comment Tests', () => {

    getComment.map((data) => {
        let response;
        let id = parseInt(data.uri.split('/')[2], 10);

        before(async () => {
            data.uri = env.uri + data.uri;
            response = await sendRequest(data);
        });

        it('Validate response body of comment ' + id, () => {
            expect(validate(response, schema)).to.eql(true);
        });

        /* it('Verifying Comment email with id ' + id, () => {
            expect(response.email).to.match(/\w+@\w+.\w{1,5}/);
        });

        it('Verifying Comment body with id ' + id, () => {
            expect(response.body).to.be.a('string');
        });*/
    });

});