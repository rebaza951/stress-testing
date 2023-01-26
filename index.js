require("dotenv").config();
const { getAccessToken } = require("./helpers");
const { getProjectUsers } = require("./apis");

async function main() {
  const accesstoken = await getAccessToken();
  const users = await getProjectUsers(accesstoken);
  console.log({ users });
}

main();
