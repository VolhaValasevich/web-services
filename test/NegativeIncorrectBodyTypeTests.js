const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const codes = require("../data/statusCodes");
const resources = require("../data/resources");
const bodyTypes = require("../data/negative/incorrectBodyTypes");
const method = "POST";

describe('Incorrect Body Type Tests', () => {
    bodyTypes.forEach((type) => {
        describe(`Sending requests with ` + type.info, () => {
            resources.forEach((resource) => {
                const uri = env.uri + resource.uri;
                let response;

                before(async () => {
                    response = await sendRequest(uri, method, type.body);
                });

                it(`should return correct error code after sending ${type.info} to ${uri}`, async () => {
                    expect(response.statusCode).to.eql(codes.internalServerError.code);
                });

                it(`should return correct error message after sending ${type.info} to ${uri}`, async () => {
                    expect(response.statusMessage).to.eql(codes.internalServerError.message);
                });

            });
        });
    });
});