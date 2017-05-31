import axios from "axios";

// TODO Add better error handling
const token = window.localStorage.getItem("userToken");
const axiosInstance = axios.create({
  baseURL: "api/",
  headers: { "x-access-token": token }
});

/**
 * Takes care of user created errors, returns a promise which could be handled at the component side
 * TODO use interceptors for this
 */
function prepareResponse(response) {
  if (!response.data) return;

  const serverResponse = response.data;
  const code = serverResponse.code;

  // if login, edit the axiosInstance
  if (code === "B118") {
    axiosInstance.defaults.headers["x-access-token"] =
      serverResponse.data.token;
  }

  if (serverResponse.error.error) {
    const error = Object.assign({}, { code }, serverResponse.error);
    return Promise.reject(error);
  } else {
    return Promise.resolve(serverResponse.data);
  }
}

/**
 * Main export
 */
const APIProvider = {
  get: endpoint => axiosInstance.get(endpoint).then(prepareResponse),
  query: (endpoint, queryParams) =>
    axiosInstance.get(endpoint, { params: queryParams }).then(prepareResponse),
  post: (endpoint, payload) =>
    axiosInstance.post(endpoint, payload).then(prepareResponse),
  put: (endpoint, payload) =>
    axiosInstance.put(endpoint, payload).then(prepareResponse),
  delete: endpoint => axiosInstance.delete(endpoint)
};

export default APIProvider;
