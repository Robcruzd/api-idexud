'use strict'

const ALPHANUMERIC_REGEX = /^[0-9a-zA-ZáéíóúÁÉÍÓÚ!"#$%&'()*+,-.\/:;<>=?@\[\]\\^_`{}|~ ]+$/
const NUMERIC_REGEX = /^[0-9]+$/
const SERVER_ERROR = 502
const SUCESSFULL_EXECUTION = 200

module.exports = {
    ALPHANUMERIC_REGEX,
    SERVER_ERROR,
    SUCESSFULL_EXECUTION,
    NUMERIC_REGEX
}
