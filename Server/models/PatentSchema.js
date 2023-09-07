const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const PatentSchema = mongoose.Schema({
  name: String,
  inventor: String ,
  description: String,
  status: { type: Boolean, default: false }
}, { timestamps: true });

const PatentModel = mongoose.model('Patent', PatentSchema);

module.exports = PatentModel;
