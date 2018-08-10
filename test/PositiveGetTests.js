const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const codes = require("../data/statusCodes");
const resources = require("../data/resources");
const logger = require("../lib/logger.js").logger;
const method = 'GET';

describe(method + ' Tests', () => {
    resources.map((resource) => {
        const testData = require(`../data/${resource.name}/Positive${resource.filename}`);
        const schema = require(`../data/${resource.name}/schema${resource.filename}`);
        describe(resource.filename, () => {
            testData.map((data) => {
                let response;
                const id = data.id;

                before(async () => {
                    let uri = `${env.uri}/${resource.name}/${id}`;
                    logger.action('Sending request to ' + uri);
                    response = await sendRequest(uri, method, data);
                });

                it(`Check response code of ${resource.singular} ` + id, () => {
                    expect(response.statusCode).to.eql(codes.ok.code);
                });

                it(`Check response message of ${resource.singular} ` + id, () => {
                    expect(response.statusMessage).to.eql(codes.ok.message);
                });

                it(`Check response body of ${resource.singular} ` + id, () => {
                    expect(validate(response.body, schema)).to.eql(true);
                });

            });
        });
    });
});