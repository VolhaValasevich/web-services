const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const codes = require("../data/statusCodes");
const sections = require("../data/sections");
const method = 'GET';

describe(method + ' Tests', () => {
    sections.map((resource) => {
        const testData = require(`../data/${resource.name}/Positive${resource.filename}`);
        const schema = require(`../data/${resource.name}/schema${resource.filename}`);

        testData.map((data) => {
            let response;
            const id = data.id;

            before(async () => {
                let uri = `${env.uri}/${resource.name}/${id}`;
                response = await sendRequest(uri, method, data);
            });

            it(`Check response code of ${resource.singular} ` + id, () => {
                expect(response.statusCode).to.eql(codes.ok);
            });

            it(`Validate response body of ${resource.singular} ` + id, () => {
                expect(validate(response.body, schema)).to.eql(true);
            });
        });
    });
});