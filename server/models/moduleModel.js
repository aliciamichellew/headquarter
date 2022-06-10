const mongoose = require("mongoose");

const moduleTemplate = new mongoose.Schema({
  moduleCode: {
    type: String,
    required: true,
    unique: true,
  },
  moduleTitle: {
    type: String,
    required: true,
  },
});

const Module = mongoose.model("modules", moduleTemplate);

module.exports = Module;
