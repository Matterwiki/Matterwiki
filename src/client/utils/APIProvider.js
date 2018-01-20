import axios from "axios";

// TODO Add better error handling
// TODO use something light weight like `unfetch`
const token = window.localStorage.getItem("userToken");
const axiosInstance = axios.create({
  baseURL: "/api/",
  headers: { "x-access-token": token }
});

/**
 * Takes care of user created errors, returns a promise which could be handled at the component side
 */
function prepareResponse(response) {
  if (!response.data) {
    return;
  }

  const { url } = response.config;
  const { data } = response;

  // if login, edit the axiosInstance
  if (url.includes("login")) {
    axiosInstance.defaults.headers["x-access-token"] = data.token;
  }

  return data;
}

function prepareError({ response }) {
  return Promise.reject({
    status: response.status,
    ...response.data
  });
}

const get = endpoint =>
  axiosInstance
    .get(endpoint)
    .then(prepareResponse)
    .catch(prepareError);

const query = (endpoint, queryParams) =>
  axiosInstance
    .get(endpoint, { params: queryParams })
    .then(prepareResponse)
    .catch(prepareError);

const post = (endpoint, payload) =>
  axiosInstance
    .post(endpoint, payload)
    .then(prepareResponse)
    .catch(prepareError);

const put = (endpoint, payload) =>
  axiosInstance
    .put(endpoint, payload)
    .then(prepareResponse)
    .catch(prepareError);

const deleteReq = endpoint => axiosInstance.delete(endpoint).catch(prepareError);

/**
 * Main export
 */
const APIProvider = {
  get,
  query,
  post,
  put,
  delete: deleteReq
};

export default APIProvider;
