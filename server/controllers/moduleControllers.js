const { response } = require("express");
const asyncHandler = require("express-async-handler");
const Module = require("../models/moduleModel");

const axios = require("axios");
const { search } = require("../routes/moduleRoutes");

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
  const url = "https://api.nusmods.com/v2/2021-2022/moduleList.json";
  const data = await axios.get(url);
  const { searchQuery } = request.params;

  if (!data.data) {
    response.status(400);
    throw new Error("Fetch Failed!");
  }

  const module = data.data.filter((x) => x.moduleCode.includes(searchQuery));

  response.json(module);
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

const getModulefromNUSMODS = async (req, res) => {
  const url = "https://api.nusmods.com/v2/2021-2022/moduleList.json";
  const response = await axios.get(url);
  if (response) {
    res.json(response.data);
  } else {
    res.status(422);
    throw new Error("Fetch All Modules Failed");
  }
};

module.exports = {
  registerModule,
  findModule,
  getModuleList,
  getModulefromNUSMODS,
};
