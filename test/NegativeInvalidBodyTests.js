const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const codes = require("../data/statusCodes");
const resources = require("../data/resources");
const method = "POST";

describe('Incorrect Body Type Tests', () => {
    resources.forEach((resource) => {
        describe(resource.filename, () => {
            const invalidData = require("../data/negative/invalid" + resource.filename);
            const uri = env.uri + resource.uri;
            let response;
            invalidData.forEach((data) => {

                before(async () => {
                    response = await sendRequest(uri, method, data.body);
                });

                it(`should return correct error code after sending body with ${data.info} to ${uri}`, async () => {
                    expect(response.statusCode).to.eql(codes.badRequest.code);
                });

                it(`should return correct error message after sending body with ${data.info} to ${uri}`, async () => {
                    expect(response.statusMessage).to.eql(codes.badRequest.message);
                });

            });
        });

    });
});