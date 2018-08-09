const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const resources = require("../data/resources");
const requestTypes = require("../data/requestTypes");
const logger = require("../lib/logger.js").logger;
const DELETE = 'Delete';
const POST = "Post";
const ID_MULTIPLIER = 5001; // the biggest section "Photos" has 5000 entries

requestTypes.map((request) => { // runs a separate describe for each type of request

    describe(`${request.type} Tests`, () => {
        resources.forEach((resource) => { // runs tests for different data types (comments, posts, users)
            const testData = require(`../data/${resource.name}/Positive${resource.filename}`); // requiring resource test data
            const schema = require(`../data/${resource.name}/schema${resource.filename}`); // requiring resource json schema

            testData.forEach((data) => { // runs tests for each element in test data
                let response;
                const id = data.id; // parseInt(data.uri.split('/')[2], 10);

                before(async () => {
                    let uri = `${env.uri}/${resource.name}/${id}`;
                    const method = request.type.toUpperCase();
                    if (request.type === POST) {
                        uri = uri.slice(0, -1); // POST requests need to be sent to the common uri
                        data.id *= ID_MULTIPLIER; // POST body data must have unique id
                    }
                    logger.action('Sending request to ' + uri);
                    response = await sendRequest(uri, method, data);
                });

                it(`Check response code of ${resource.singular} ` + id, () => {
                    logger.check(`Checking response code of ${resource.singular} ` + id);
                    expect(response.statusCode).to.eql(request.codeSuccess);
                });

                it(`Check response message of ${resource.singular} ` + id, () => {
                    logger.check(`Checking response message of ${resource.singular} ` + id);
                    expect(response.statusMessage).to.eql(request.messageSuccess);
                });

                it(`Check response body of ${resource.singular} ` + id, () => {
                    logger.check(`Checking response body of ${resource.singular} ` + id);
                    if (request.type === DELETE) {
                        expect(response.body).to.eql({});
                    } else {
                        logger.action('Validating response JSON schema');
                        expect(validate(response.body, schema)).to.eql(true);
                    }
                });

                if (request.bodyIsRequired) {
                    it(`Compare recieved data with sent data in ${resource.singular} ` + id, () => {
                        logger.check(`Comparing recieved data with sent data in ${resource.singular} ` + id);
                        expect(response.body).to.eql(data);
                    });
                }

            });
        });
    });

});