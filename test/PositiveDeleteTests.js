const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const env = require('../endpoint/test');
const codes = require("../data/statusCodes");
const resources = require("../data/resources");
const method = 'DELETE';

describe(method + ' Tests', () => {
    resources.map((resource) => {
        const testData = require(`../data/positive/Positive${resource.filename}`);
        describe(resource.filename, () => {
            testData.map((data) => {
                let response;
                const id = data.id;

                before(async () => {
                    let uri = `${env.uri}/${resource.name}/${id}`;
                    response = await sendRequest(uri, method, data);
                });

                it(`Check response code of ${resource.singular} ` + id, () => {
                    expect(response.statusCode).to.eql(codes.ok.code);
                });

                it(`Check response message of ${resource.singular} ` + id, () => {
                    expect(response.statusMessage).to.eql(codes.ok.message);
                });

                it(`Check response body of ${resource.singular} ` + id, () => {
                    expect(response.body).to.eql({});
                });
            });
        });
    });
});