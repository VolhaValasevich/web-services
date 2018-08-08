const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const getComment = require('../data/comments/PostPositiveComments');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const schema = require("../data/comments/commentSchema");
const codes = require("../data/statusCodes");

describe('POST Comment Tests', () => {

    getComment.map((data) => {
        let response;
        let id = data.body.id;

        before(async () => {
            data.uri = env.uri + data.uri;
            response = await sendRequest(data);
        });

        it("Check response code of comment" + id, () => {
            expect(response.statusCode).to.eql(codes.created);
        });

        it('Validate response body of comment ' + id, () => {
            expect(validate(response.body, schema)).to.eql(true);
        });

        it("Check the email of comment " + id, () => {
            expect(response.body.email).to.match(/\w+@\w+.\w{1,5}/);
        });
    });
});