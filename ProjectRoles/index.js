require("dotenv").config({ path: "../.env" });

const { map } = require('lodash');
const asyncBatch = require('async-batch').default;
const { getAccessToken } = require("../helpers");
const { getProjectUsers, patchProjectUser } = require("../apis");


async function main() {
  
  const getUsersToken = await getAccessToken();
  console.log({getUsersToken});
  const users = await getProjectUsers(getUsersToken);
  const noInsightUsers = users
  .filter(user =>
    user.products.some(
      (product) => product.key == "insight" && product.access == "none"
    )
  )
  .map(user => {
    user.products = user.products.map(p => {
      if (p.key == 'insight' && p.access == 'none') {
        p.access = user.accessLevels.projectAdmin ? 'administrator' : 'member';
      }
      return p;
    });
    return user;
  });
  
  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
   await sleep(10000);
  
  const token = await getAccessToken();
  console.log({token})
  const res = await patchProjectUser(token);
  console.log({res})
  return 
  
  const patchUserToken = await getAccessToken();
  await patchProjectUser(patchUserToken, noInsightUsers[0] )
  return
  const Parallelism = 2;
  const asyncMethod = async (user) => patchProjectUser(accesstoken, user );
  try {
    await asyncBatch([noInsightUsers[0]], asyncMethod, Parallelism);
  }catch (err) {
    console.log({err})
  }
  // const response = await patchProjectUser(accesstoken);
  // console.log({ response });
}

main();
