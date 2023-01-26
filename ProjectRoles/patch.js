require("dotenv").config({ path: "../.env" });

const fs = require("fs");
const { getAccessToken } = require("../helpers");
const { patchProjectUser } = require("../apis");

async function main() {
  const data = fs.readFileSync("users.json", "utf8");
  let users = JSON.parse(data);
  const user = users.shift();
  console.log( 'left users: ' + users.length);

  const accessToken = await getAccessToken();
  await patchProjectUser(accessToken, user);

  fs.writeFile('users.json', JSON.stringify(users), (err) => {
    if (err) throw err;
    // console.log('Data written to file');
  });
}

main();
