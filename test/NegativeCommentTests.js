const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const getComment = require('../data/negativeComments');
const env = require('../endpoint/test');
const STATUS_CODE = 'statusCode';

chai.use(chaiAsPromised);

describe('Negative Comment Tests', () => {

    getComment.map((data) => {
        let response;
        let id = parseInt(data.uri.split('/')[2]);

        before(async () => {
            data.uri = env.uri + data.uri;
        });

        it('Check unexistent comment ' + id, () => {
            expect(sendRequest(data)).to.be.eventually.rejectedWith(Error).and.have.property(STATUS_CODE, data.statusCode);
        });
    })

});