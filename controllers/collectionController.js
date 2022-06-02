const { existsSync } = require("fs");

const { readFile, writeFile } = require("fs").promises;

// utils & helpers
const myPipe = require("../helpers/myPipe");
const {
  createNewHeadersArray,
  capitalizeFirstChar,
  createTemplate,
} = require("./utils/newCollectionUtils");

const checkIfModelCreateNewModel = async (req, res, next) => {
  const { collection } = req.params;
  const { tempFilePath } = req.files.file;

  const captCollection = capitalizeFirstChar(collection);
  const path = `./models/${captCollection}.js`;

  if (!existsSync(path)) {
    // make pure functions
    const createCollectionTemplate = createTemplate(collection)(captCollection);
    const readCsv = async (tempFilePath) => {
      const file = await readFile(tempFilePath, "utf8");
      return file;
    };
    const writeModel = async (template) => {
      await writeFile(path, template);
    };
    // pipe pure functions
    const createModelFromCsv = myPipe(
      readCsv,
      createNewHeadersArray,
      createCollectionTemplate,
      writeModel
    );
    createModelFromCsv(tempFilePath);
  }

  res.status(200).json({ success: true, collection, tempFilePath });
};

module.exports = {
  checkIfModelCreateNewModel,
};
