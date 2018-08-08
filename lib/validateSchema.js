const Validator = require('jsonschema').Validator;
const validator = new Validator();

function validate(json, schema) {
    const result = validator.validate(json, schema);
    if (result.errors.length === 0) {
        return true;
    } else {
        // put logger here
        return false;
    }
}

module.exports = validate;