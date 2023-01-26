const axios = require("axios");
const oauth = require("axios-oauth-client");
const {
  urls: { authentication }
} = require("./constants");

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const getAuthorizationCode = oauth.client(axios.create(), {
  url: authentication,
  grant_type: "client_credentials",
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  scope: "account:read account:write data:read data:write data:create"
});

async function getAccessToken() {
  const { access_token } = await getAuthorizationCode();
  return access_token;
}

module.exports = getAccessToken;
