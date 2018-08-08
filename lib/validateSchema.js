const Validator = require('jsonschema').Validator;
const validator = new Validator();

function validate(json, schema) {
    validator.validate(json, schema);
}

module.exports = validate;