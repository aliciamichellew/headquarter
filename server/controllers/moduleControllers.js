const asyncHandler = require("express-async-handler");
const axios = require("axios");

const NUSMODS_MODULELIST_URL =
  "https://api.nusmods.com/v2/2021-2022/moduleList.json";
const NUSMODS_MODULE_URL = "https://api.nusmods.com/v2/2021-2022/modules";

const getModulefromNUSMODS = async (req, res) => {
  const response = await axios.get(NUSMODS_MODULELIST_URL);
  if (response) {
    res.json(response.data);
  } else {
    res.status(422);
    throw new Error("Fetch All Modules Failed");
  }
};

const findModule = asyncHandler(async (request, response) => {
  const data = await axios.get(NUSMODS_MODULELIST_URL);
  const { searchQuery } = request.params;

  if (!data.data) {
    response.status(400);
    throw new Error("Fetch Failed!");
  }

  const module = data.data.filter((x) => x.moduleCode.includes(searchQuery));

  response.json(module);
});

const findModulebyModuleCode = asyncHandler(async (request, res) => {
  const { moduleCode } = request.params;
  const url = `https://api.nusmods.com/v2/2021-2022/modules/${moduleCode.toUpperCase()}.json`;
  const response = await axios.get(url);
  if (response) {
    res.json({
      moduleCode: response.data.moduleCode,
      title: response.data.title,
    });
  } else {
    res.status(422);
    throw new Error("Module Not Found");
  }
});

module.exports = {
  findModule,
  getModulefromNUSMODS,
  findModulebyModuleCode,
};
