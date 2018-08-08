const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const codes = require("../data/statusCodes");
const sections = require("../data/sections");

describe('POST Tests', () => {

    sections.map((section) => {
        const requests = require(`../data/${section.name}/PostPositive${section.filename}`);
        const schema = require(`../data/${section.name}/schema${section.filename}`);

        requests.map((data) => {
            let response;
            let id = data.body.id;

            before(async () => {
                data.uri = env.uri + data.uri;
                response = await sendRequest(data);
            });

            it(`Check response code of ${section.singular} ` + id, () => {
                expect(response.statusCode).to.eql(codes.created);
            });

            it(`Validate response body of ${section.singular} ` + id, () => {
                expect(validate(response.body, schema)).to.eql(true);
            });

            it(`Compare recieved data with sent data in ${section.singular} ` + id, () => {
                expect(response.body).to.eql(data.body);
            });
        });
    });
});