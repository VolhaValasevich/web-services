const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const codes = require("../data/statusCodes");
const testData = require(`../data/negative/badRequest`);

describe('Bad Request Tests', () => {
    testData.forEach((data) => {
        const uri = env.uri;
        let response;

        before(async () => {
            response = await sendRequest(uri, data.method, data);
        });

        it(`should return correct error code after sending ${data.method} request to ${uri}`, async () => {
            expect(response.statusCode).to.eql(codes.badRequest.code);
        });

        it(`should return correct error message after sending ${data.method} request to ${uri}`, async () => {
            expect(response.statusMessage).to.eql(codes.badRequest.message);
        });

    });
});