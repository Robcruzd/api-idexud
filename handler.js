'use strict';

const data = require('./controllers/data')
const constantes = require('./resources/constantes')

/**
 * Headers to send back to client
 */
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
}

/**
 * Function to send response to client
 * @param statusCode {number}
 * @param body {*}
 * @returns {{statusCode: *, headers: string, body: *}}
 */
const sendResponse = (statusCode, body) => {
  const response = {
    statusCode: statusCode,
    headers: headers,
    body: body
  }
return response
}



module.exports.create = async (event, context, callback) => {
  try {
    console.log(`init create estudiante ${JSON.stringify(event)}`)
    await data.insertItem(JSON.parse(event.body))
    return callback(null, sendResponse(constantes.SUCESSFULL_EXECUTION, JSON.stringify({
      message: 'Se creo con exito!'
    })))
  } catch (error) {
    console.error(error)
    if (error instanceof TypeError){
      return callback(null, sendResponse(constantes.SERVER_ERROR, JSON.stringify({
        message: error.message
      })))
    } else {
      return callback(null, sendResponse(constantes.SERVER_ERROR, JSON.stringify({
        message: error
      })))
    }
  }
}

module.exports.update = async (event, context, callback) => {
  try {
    console.log(`init update estudiante ${JSON.stringify(event)}`)
    await data.updateItem(JSON.parse(event.body))
    return callback(null, sendResponse(constantes.SUCESSFULL_EXECUTION, JSON.stringify({
      message: 'Se actualizó con exito!'
    })))
  } catch (error) {
    console.error(error)
    if (error instanceof TypeError){
      return callback(null, sendResponse(constantes.SERVER_ERROR, JSON.stringify({
        message: error.message
      })))
    } else {
      return callback(null, sendResponse(constantes.SERVER_ERROR, JSON.stringify({
        message: error
      })))
    }
  }
}

module.exports.getAll = async (event, context) => {
  try{
    console.log(`init getAll estudiantes ${JSON.stringify(event)}`)
    const datos = await data.getAllItems()
    return sendResponse(constantes.SUCESSFULL_EXECUTION, JSON.stringify(datos))
  } catch (error){
    console.error(error)
    return sendResponse(constantes.SERVER_ERROR, JSON.stringify(error))
  }
}

module.exports.getItem = async (event, context, callback) => {
  try{
    console.log(`init get estudiante ${JSON.stringify(event.pathParameters)}`)
    const datos = await data.getItem(event.pathParameters)
    return sendResponse(constantes.SUCESSFULL_EXECUTION, JSON.stringify(datos))
  } catch (error){
    console.error(error)
    if (error instanceof TypeError){
      return callback(null, sendResponse(constantes.SERVER_ERROR, JSON.stringify({
        message: error.message
      })))
    } else {
      return callback(null, sendResponse(constantes.SERVER_ERROR, JSON.stringify({
        message: error
      })))
    }
  }
}

module.exports.deleteItem = async (event, context, callback) => {
  try{
    console.log(`init delete estudiante ${JSON.stringify(event)}`)
    await data.deleteItem(event.pathParameters)
    return callback(null, sendResponse(constantes.SUCESSFULL_EXECUTION, JSON.stringify({
      message: 'Se eliminó con exito!'
    })))
  } catch (error){
    console.error(error)
    if (error instanceof TypeError){
      return callback(null, sendResponse(constantes.SERVER_ERROR, JSON.stringify({
        message: error.message
      })))
    } else {
      return callback(null, sendResponse(constantes.SERVER_ERROR, JSON.stringify({
        message: error
      })))
    }
  }
}
