const request = require('request-promise-native');
const headers = require('../data/headers');

function optsConstructor(uri, method, body) {
    let options = {
        uri: uri,
        method: method,
        headers: headers,
        body: body,
        resolveWithFullResponse: true,
        json: true
    };

    return options;
}

function sendRestRequestWithHeader(uri, method, body) {
    let options = optsConstructor(uri, method, body);

    return request(options).then((response) => {
        return response;
    });
}

module.exports = sendRestRequestWithHeader;