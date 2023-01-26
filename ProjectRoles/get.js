require("dotenv").config({ path: "../.env" });

const fs = require('fs');
const { getAccessToken } = require("../helpers");
const { getProjectUsers } = require("../apis");

async function main() {
  console.log(">> Getting users ... ")
  const getUsersToken = await getAccessToken();
  const {data: {results: users}} = await getProjectUsers(getUsersToken);
  const noInsightUsers = users
    .filter(user =>
      user.products.some(
        (product) => product.key === "insight" && product.access === "none"
      )
    )
    .map(user => {
      user.products = user.products.map(p => {
        if (p.key === 'insight' && p.access === 'none') {
          p.access = user.accessLevels.projectAdmin ? 'administrator' : 'member';
        }
        return p;
      });
      return user;
    });

  const usersJson = fs.readFileSync("users.json", "utf8");
  let usersParsed = JSON.parse(usersJson);

  fs.writeFile('users.json', JSON.stringify([...usersParsed, ...noInsightUsers]), (err) => {
    if (err) throw err;
    // console.log('> data file updated');
  });
  console.log('Users found: ' + noInsightUsers.length);
}

main();