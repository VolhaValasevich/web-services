const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const codes = require("../data/statusCodes");
const sections = require("../data/sections");

describe('GET Tests', () => {
    sections.map((section) => {
        const requests = require(`../data/${section.name}/GetPositive${section.filename}`);
        const schema = require(`../data/${section.name}/schema${section.filename}`);

        requests.map((data) => {
            let response;
            let id = parseInt(data.uri.split('/')[2], 10);

            before(async () => {
                data.uri = env.uri + data.uri;
                response = await sendRequest(data);
            });

            it(`Check response code of ${section.singular} ` + id, () => {
                expect(response.statusCode).to.eql(codes.ok);
            });

            it(`Validate response body of ${section.singular} ` + id, () => {
                expect(validate(response.body, schema)).to.eql(true);
            });
        });
    });
});