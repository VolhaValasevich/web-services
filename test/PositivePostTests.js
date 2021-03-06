const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const codes = require("../data/statusCodes");
const resources = require("../data/resources");
const method = 'POST';
const ID_MULTIPLIER = 5001; // the biggest section "Photos" has 5000 entries

describe(method + ' Tests', () => {
    resources.map((resource) => {
        const testData = require(`../data/positive/Positive${resource.filename}`);
        const schema = require(`../data/schemas/schema${resource.filename}`);
        describe(resource.filename, () => {
            testData.map((data) => {
                let response;
                const id = data.id;

                before(async () => {
                    data.id *= ID_MULTIPLIER; // POST body data must have unique id
                    let uri = `${env.uri}/${resource.name}/`;
                    response = await sendRequest(uri, method, data);
                });

                after(() => {
                    data.id /= ID_MULTIPLIER;
                });

                it(`Check response code of ${resource.singular} ` + id, () => {
                    expect(response.statusCode).to.eql(codes.created.code);
                });

                it(`Check response message of ${resource.singular} ` + id, () => {
                    expect(response.statusMessage).to.eql(codes.created.message);
                });

                it(`Check response body of ${resource.singular} ` + id, () => {
                    expect(validate(response.body, schema)).to.eql(true);
                });

                it(`Compare recieved data with sent data in ${resource.singular} ` + id, () => {
                    expect(response.body).to.eql(data);
                });
            });
        });
    });
});