require("dotenv").config({ path: "../.env" });

const fs = require('fs');
const { getAccessToken } = require("../helpers");
const { getProjectUsers } = require("../apis");

async function main() {
  console.log(">> Setting Project Data");
  const accessToken = await getAccessToken();
  const { data: { pagination: { limit, totalResults } } } = await getProjectUsers(accessToken);
  const projectData = {
    pages: Math.ceil(totalResults/limit),
    limit: limit
  };
  console.log({totalResults, limit, projectData})

  fs.writeFile('projectData.json', JSON.stringify(projectData), (err) => {
    if (err) throw err;
    // console.log('> data file updated');
  });
  fs.writeFile('users.json', JSON.stringify([]), (err) => {
    if (err) throw err;
    // console.log('> data file updated');
  });
}

main();