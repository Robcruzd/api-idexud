'use strict'

const DynamoHelper = require('../resources/dynamo_helper')
const constantes = require('../resources/constantes')
const dynamo = new DynamoHelper()

async function insertItem (data) {
  console.log(`${process.env.LOG_ENVIRONMENT} -> start insertItem... ${JSON.stringify(data)}`)
  if (data.codigoEstudiantil && constantes.ALPHANUMERIC_REGEX.test(data.codigoEstudiantil) && 
      data.identificacion && constantes.NUMERIC_REGEX.test(data.identificacion) &&
      data.nombre && constantes.ALPHANUMERIC_REGEX.test(data.nombre) && 
      data.programa && constantes.ALPHANUMERIC_REGEX.test(data.programa)){
    const params = {
      TableName: process.env.TABLE_ESTUDIANTE,
      Item: {
        codigoEstudiantil: data.codigoEstudiantil,
        identificacion: data.identificacion,
        nombre: data.nombre,
        programa: data.programa,
        fechaCreacion: new Date().toLocaleString('en-US',{ timeZone: 'America/Bogota'})
      }  
    }
    await dynamo.saveData(params)
    console.log(`${process.env.LOG_ENVIRONMENT} -> end insertEstudiante successful`)
  } else {
    console.error(`${process.env.LOG_ENVIRONMENT} -> throws insertEstudiante... incomplete data`)
    throw new TypeError('El campo codigoEstudiantil es requerido') 
  }
}

//aws dynamodb create-table --table-name estudiantes-dev --attribute-definitions AttributeName=codigoEstudiantil,AttributeType=S --key-schema AttributeName=codigoEstudiantil,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --profile developer
// serverless deploy --aws-profile developer --envrt dev
// serverless remove --aws-profile developer --envrt dev

async function getAllItems () {
    console.log(`${process.env.LOG_ENVIRONMENT} -> start getAllItems...`)
    const params = {
      TableName: process.env.TABLE_ESTUDIANTE  
    } 
    const data = await dynamo.loadData(params)
    console.log(`${process.env.LOG_ENVIRONMENT} -> end getAllProducts successfull with ${JSON.stringify(data)}`)
    return data.Items
}

async function getItem (data) {
  console.log(`${process.env.LOG_ENVIRONMENT} -> start getItem ${JSON.stringify(data)}`)
  if (data.codigoEstudiantil && constantes.ALPHANUMERIC_REGEX.test(data.codigoEstudiantil)){
    const params = {
      TableName: process.env.TABLE_ESTUDIANTE,
      Key: {
        codigoEstudiantil: data.codigoEstudiantil,
      }  
    }
    const item = await dynamo.getData(params)
    console.log(`${process.env.LOG_ENVIRONMENT} -> end getItem successful`)
    return item
  } else {
    console.error(`${process.env.LOG_ENVIRONMENT} -> throws getItem... incomplete data`)
    throw new TypeError('El campo codigoEstudiantil es requerido') 
  }
}

async function updateItem (data) {
  console.log(`${process.env.LOG_ENVIRONMENT} -> start updateItem... ${JSON.stringify(data)}`)
  if (data.codigoEstudiantil && constantes.ALPHANUMERIC_REGEX.test(data.codigoEstudiantil) && 
      data.identificacion && constantes.NUMERIC_REGEX.test(data.identificacion) &&
      data.nombre && constantes.ALPHANUMERIC_REGEX.test(data.nombre) && 
      data.programa && constantes.ALPHANUMERIC_REGEX.test(data.programa)){
    const params = {
      TableName: process.env.TABLE_ESTUDIANTE,
      Key: {
        codigoEstudiantil: data.codigoEstudiantil,
      },
      UpdateExpression: "SET identificacion = :ide, nombre = :nom, programa = :pro, fechaCreacion = :fec",
      ExpressionAttributeValues: {
        ":ide": data.identificacion,
        ":nom": data.nombre,
        ":pro": data.programa,
        ":fec": new Date().toLocaleString('en-US',{ timeZone: 'America/Bogota'})
      },
      ReturnValues: "ALL_NEW",
    }
    const item = await dynamo.updateData(params)
    console.log(`${process.env.LOG_ENVIRONMENT} -> end updateItem successful`)
    return item
  } else {
    console.error(`${process.env.LOG_ENVIRONMENT} -> throws updateItem... incomplete data`)
    throw new TypeError('El campo codigoEstudiantil es requerido') 
  }
}

async function deleteItem (data) {
  console.log(`${process.env.LOG_ENVIRONMENT} -> start deleteItem... ${JSON.stringify(data)}`)
  if (data.codigoEstudiantil && constantes.ALPHANUMERIC_REGEX.test(data.codigoEstudiantil)){
    const params = {
      TableName: process.env.TABLE_ESTUDIANTE,
      Key: {
        codigoEstudiantil: data.codigoEstudiantil,
      }  
    }
    const item = await dynamo.deleteData(params)
    console.log(`${process.env.LOG_ENVIRONMENT} -> end deleteItem successful`)
    return item
  } else {
    console.error(`${process.env.LOG_ENVIRONMENT} -> throws insertProduct... incomplete data`)
    throw new TypeError('El campo codigoEstudiantil es requerido') 
  }
}

module.exports = {
   insertItem, getAllItems, getItem, updateItem, deleteItem
}

