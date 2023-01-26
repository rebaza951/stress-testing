const axios = require('axios');
const { getRequestParams } = require('../helpers');

async function getProjectUsers(accesstoken) {
  const { url, config } = getRequestParams(accesstoken, 'getProjectUsers');
  try {
    const {
      data: { results: users }
    } = await axios.get(url, config);
    return users;
  } catch (error) {
    console.log('Error while trying to GET Project Users', error.message);
    throw error;
  }
}

module.exports = getProjectUsers;
