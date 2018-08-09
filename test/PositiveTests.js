const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const sections = require("../data/sections");
const requestTypes = require("../data/requestTypes");
const DELETE = 'Delete';

requestTypes.map((request) => {

    describe(`${request.type} Tests`, () => {
        sections.map((section) => {
            const templates = require(`../data/${section.name}/${request.type}Positive${section.filename}`);
            const schema = require(`../data/${section.name}/schema${section.filename}`);

            templates.map((data) => {
                let response;
                let id = parseInt(data.uri.split('/')[2], 10);

                before(async () => {
                    data.uri = env.uri + data.uri;
                    response = await sendRequest(data);
                });

                it(`Check response code of ${section.singular} ` + id, () => {
                    expect(response.statusCode).to.eql(request.codeSuccess);
                });

                it(`Validate response body of ${section.singular} ` + id, () => {
                    if (request.type === DELETE) {
                        expect(response.body).to.eql({});
                    } else {
                        expect(validate(response.body, schema)).to.eql(true);
                    }
                });

                if (request.bodyRequired) {
                    it(`Compare recieved data with sent data in ${section.singular} ` + id, () => {
                        expect(response.body).to.eql(data.body);
                    });
                }

            });
        });
    });

});