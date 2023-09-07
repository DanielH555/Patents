const PatentModel = require('../models/PatentSchema')

async function add(req, res) {

 console.log(req.body);
  const { name, inventor, description } = req.body
  const newPatent = { name, inventor, description }
  try {
    const result = await PatentModel.create(newPatent)
  } catch (error) { throw error }
  res.send(req.body)
}

async function gettingPatents(req, res) {
  try {
    const result = await PatentModel.find()
    res.send(result)
  } catch (error) {
    throw error

  }
}

async function getById(req, res) {
  const name = req.params.id
  let obj = { name: name }

  try {
    const result = await PatentModel.find(obj)
    
    res.send(result)
  } catch (error) {
    throw error

  }
}

async function updating(req, res) {
  console.log(req.params.id)
  const id = req.params.id
  try {
    const updatedPatents = await PatentModel.findByIdAndUpdate(id, req.body)
  } catch (error) {
    throw error
  }
  res.send('The item was successfully updated.')
}

async function deleting(req, res) {
console.log(req.params.id);
  const id = req.params.id
  try {
    await PatentModel.findByIdAndDelete(id)
  } catch (error) {
    throw error
  }
  res.send('The item was deleted successfully.')
}

module.exports = { add, gettingPatents, updating, deleting, getById }


