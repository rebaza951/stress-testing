const { BASE_PATH, CONSTRUCTION, PROJECT_ID, USER_ID, OFF_SET } = process.env;

module.exports = {
  urls: {
    authentication: `${BASE_PATH}/authentication/v1/authenticate`,
    getProjectUsers: `${BASE_PATH}${CONSTRUCTION}/admin/v1/projects/${PROJECT_ID}/users?offset=${OFF_SET}`,
    patchProjectUser: `${BASE_PATH}${CONSTRUCTION}/admin/v1/projects/${PROJECT_ID}/users`
  },
  userId: USER_ID,
  config: {
    headers: {
      Authorization: 'Bearer',
      'user-id': USER_ID
    }
  }
};
