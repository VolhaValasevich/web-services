const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const sections = require("../data/sections");
const requestTypes = require("../data/requestTypes");
const DELETE = 'Delete';
const POST = "Post";
const ID_MULTIPLIER = 5001; // the biggest section "Photos" has 5000 entries

requestTypes.map((request) => { // runs a separate describe for each type of request

    describe(`${request.type} Tests`, () => {
        sections.map((section) => { // runs tests for different data types (comments, posts, users)
            const testData = require(`../data/${section.name}/Positive${section.filename}`); // requiring section test data
            const schema = require(`../data/${section.name}/schema${section.filename}`); // requiring section json schema

            testData.map((data) => { // runs tests for each element in test data
                let response;
                let id = parseInt(data.uri.split('/')[2], 10);
                const uri = data.uri;

                before(async () => {
                    data.uri = env.uri + uri;
                    data.method = request.type.toUpperCase();
                    if (request.type === POST) {
                        data.uri = data.uri.slice(0, -1); // POST requests need to be sent to the common uri
                        data.body.id *= ID_MULTIPLIER; // POST body data must have unique id
                    }
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