const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const validate = require("../lib/validateSchema.js");
const codes = require("../data/statusCodes");
const resources = require("../data/resources");
const logger = require("../lib/logger.js").logger;
const method = 'PUT';

describe(method + ' Tests', () => {
    resources.map((resource) => {
        const testData = require(`../data/${resource.name}/Positive${resource.filename}`);
        const schema = require(`../data/${resource.name}/schema${resource.filename}`);

        testData.forEach((dataPut) => {
            let response;
            const id = dataPut.id;

            before(async () => {
                let uri = `${env.uri}/${resource.name}/${id}`;
                logger.action('Sending request to ' + uri);
                response = await sendRequest(uri, method, dataPut);
            });

            it(`Check response code of ${resource.singular} ` + id, () => {
                logger.check(`Checking response code of ${resource.singular} ` + id);
                expect(response.statusCode).to.eql(codes.ok);
            });

            it(`Checking response body of ${resource.singular} ` + id, () => {
                logger.check(`Checking response body of ${resource.singular} ` + id);
                expect(validate(response.body, schema)).to.eql(true);
            });

            it(`Compare recieved data with sent data in ${resource.singular} ` + id, () => {
                logger.check(`Comparing recieved data with sent data in ${resource.singular} ` + id);
                expect(response.body).to.eql(dataPut);
            });
        });
    });
});