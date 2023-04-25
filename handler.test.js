'use strict'

const constantes = require('../resources/constantes')
const handler = require('../handler')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const data = require('../controllers/data')

describe('handler.create', function () {
    it('debe retornar codigo de mensaje 200', async () => {
        let context = {}
        let event = muckEvent()
        let stub_data = sinon.stub(data, 'create').returns()
        await handler.create(event, context, (error, data) => {
            expect(data.statusCode).to.equal(constantes.SUCESSFULL_EXECUTION)
        })
        stub_data.restore()
    })
})

function muckEvent() {
    let event = {
        "requestContext": {},
        "queryStringParameters":{},
        "headers": {
        },
        "body": JSON.stringify({
            "marca": "Apple",
            "referencia": "Iphone X"
        })
    }
}