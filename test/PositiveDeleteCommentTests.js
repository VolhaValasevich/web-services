const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const getComment = require('../data/comments/DeletePositiveComments');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const schema = require("../data/comments/commentSchema");
const codes = require("../data/statusCodes");

describe('DELETE Comment Tests', () => {

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

    });
});