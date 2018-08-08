const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const getComment = require('../data/comments/PutPositiveComments');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const schema = require("../data/comments/commentSchema");
const codes = require("../data/statusCodes");

describe('PUT Comment Tests', () => {

    getComment.map((data) => {
        let response;
        let id = parseInt(data.uri.split('/')[2], 10);

        before(async () => {
            data.uri = env.uri + data.uri;
            response = await sendRequest(data);
        });

        it("Check response code of comment " + id, () => {
            expect(response.statusCode).to.eql(codes.ok);
        });

        it('Validate response body of comment ' + id, () => {
            expect(validate(response.body, schema)).to.eql(true);
        });

        it("Compare recieved data with sent data in comment " + id, () => {
            data.body.id = id; // comment's id adjusts automatically
            expect(response.body).to.eql(data.body);
        });

        it("Check the email of comment " + id, () => {
            expect(response.body.email).to.match(/\w+@\w+.\w{1,5}/);
        });
    });
});