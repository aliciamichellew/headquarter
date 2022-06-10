const { response } = require("express");
const asyncHandler = require("express-async-handler");
const Module = require("../models/moduleModel");

const registerModule = asyncHandler(async (request, response) => {
  const { moduleCode, moduleTitle } = request.body;

  const moduleExists = await Module.findOne({ moduleCode });

  if (moduleExists) {
    response.status(400);
    throw new Error("Module Already Exists");
  }

  const module = await Module.create({
    moduleCode,
    moduleTitle,
  });

  if (module) {
    response.status(201).json({
      _id: module._id,
      moduleCode: module.moduleCode,
      moduleTitle: module.moduleTitle,
    });
  } else {
    response.status(400);
    throw new Error("Error Occured! ");
  }
});

const findModule = asyncHandler(async (request, response) => {
  const { moduleCode } = request.body;

  const module = await Module.findOne({ moduleCode });

  if (module) {
    response.json({
      _id: module._id,
      moduleCode: module.moduleCode,
      moduleTitle: module.moduleTitle,
    });
  } else {
    response.status(400);
    throw new Error("Module not Found!");
  }
});

const getModuleList = async (req, res) => {
  const moduleList = await Module.find().lean();

  if (moduleList) {
    res.json({
      moduleList,
    });
  } else {
    res.status(422);
    throw new Error("Fetch All Modules Failed");
  }
};
module.exports = { registerModule, findModule, getModuleList };
