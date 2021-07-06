const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");

const init = async () => {
  try {
    await db.sync();
    app.listen(PORT, () => console.log(`Garlic and saphires on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
