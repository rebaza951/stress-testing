const { config, urls } = require("./constants");

module.exports = function getRequestParams(accesstoken, urlName) {
  config.headers.Authorization += ` ${accesstoken}`;
  return {
    url: urls[urlName],
    config
  };
};
