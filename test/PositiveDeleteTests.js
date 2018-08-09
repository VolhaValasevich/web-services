const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const codes = require("../data/statusCodes");
const resources = require("../data/resources");
const logger = require("../lib/logger.js").logger;
const method = 'DELETE';

describe(method + ' Tests', () => {
    resources.map((resource) => {
        const testData = require(`../data/${resource.name}/Positive${resource.filename}`);

        testData.map((data) => {
            let response;
            const id = data.id;

            before(async () => {
                let uri = `${env.uri}/${resource.name}/${id}`;
                logger.action('Sending request to ' + uri);
                response = await sendRequest(uri, method, data);
            });

            it(`Check response code of ${resource.singular} ` + id, () => {
                logger.check(`Checking response code of ${resource.singular} ` + id);
                expect(response.statusCode).to.eql(codes.ok);
            });

            it(`Validate response body of ${resource.singular} ` + id, () => {
                logger.check(`Checking response body of ${resource.singular} ` + id);
                expect(response.body).to.eql({});
            });
        });
    });
});