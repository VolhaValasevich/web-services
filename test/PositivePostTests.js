const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const codes = require("../data/statusCodes");
const sections = require("../data/sections");
const method = 'POST';
const ID_MULTIPLIER = 5001; // the biggest section "Photos" has 5000 entries

describe(method + ' Tests', () => {
    sections.map((resource) => {
        const testData = require(`../data/${resource.name}/Positive${resource.filename}`);
        const schema = require(`../data/${resource.name}/schema${resource.filename}`);

        testData.map((data) => {
            let response;
            // const id = data.id;

            before(async () => {
                data.id *= ID_MULTIPLIER; // POST body data must have unique id
                let uri = `${env.uri}/${resource.name}/`;
                response = await sendRequest(uri, method, data);
            });

            after(() => {
                data.id /= ID_MULTIPLIER;
            });

            it(`Check response code of ${resource.singular} ` + data.id, () => {
                expect(response.statusCode).to.eql(codes.created);
            });

            it(`Validate response body of ${resource.singular} ` + data.id, () => {
                expect(validate(response.body, schema)).to.eql(true);
            });

            it(`Compare recieved data with sent data in ${resource.singular} ` + data.id, () => {
                expect(response.body).to.eql(data);
            });
        });
    });
});