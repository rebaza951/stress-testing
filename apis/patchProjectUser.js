const axios = require("axios");
const { getRequestParams } = require("../helpers");

async function patchProjectUsers(accesstoken, { id, email, products }) {
  let { url, config } = getRequestParams(accesstoken, "patchProjectUser");
  url = `${url}/${id}`;
  const data = { products };
  console.log({ id, email });
  try {
    const { data: res } = await axios.patch(url, data, config);
    console.log("success!!");
    return res;
  } catch (error) {
    //console.log({error})
    console.log("Error while trying to PATCH Project User", error.message);
    throw error;
  }
}

module.exports = patchProjectUsers;
