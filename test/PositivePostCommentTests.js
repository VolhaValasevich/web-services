const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const getComment = require('../data/comments/PostPositiveComments');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const schema = require("../data/comments/commentSchema");

describe('POST Comment Tests', () => {

    getComment.map((data) => {
        let response;
        let id = data.body.id;

        before(async () => {
            data.uri = env.uri + data.uri;
            response = await sendRequest(data);
        });

        it('Validate response body of comment ' + id, () => {
            expect(validate(response, schema)).to.eql(true);
        });

        it("Check the email of comment " + id, () => {
            expect(response.email).to.match(/\w+@\w+.\w{1,5}/);
        });
    });
});