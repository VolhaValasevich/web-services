const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const codes = require("../data/statusCodes");
const resources = require("../data/resources");
const testData = require(`../data/negative/wrongUri`);

describe('Wrong Uri Tests', () => {
    resources.forEach((resource) => {
        describe(resource.filename, () => {
            testData.forEach((data) => {
                data.uri.forEach((dataUri) => {

                    const uri = env.uri + resource.uri + dataUri;
                    let response;

                    before(async () => {
                        response = await sendRequest(uri, data.method, data);
                    });

                    it(`should return correct error code after sending ${data.method} request to ${uri}`, async () => {
                        expect(response.statusCode).to.eql(codes.notFound.code);
                    });

                    it(`should return correct error message after sending ${data.method} request to ${uri}`, async () => {
                        expect(response.statusMessage).to.eql(codes.notFound.message);
                    });

                });
            });
        });
    });
});