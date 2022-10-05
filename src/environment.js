const determineProductionMode = () => {
  if (process.env.NODE_ENV.match("test")) return false;
  return !(process.env.NODE_ENV && process.env.NODE_ENV.match("development"));
};

const isProductionMode = determineProductionMode();

const api_token = isProductionMode
  ? process.env.REACT_APP_PRODUCTION_API_KEY
  : process.env.REACT_APP_DEV_API_KEY;

const auth_header = {
  Authorization: `Bearer ${api_token}`,
};

const api_url = isProductionMode
  ? process.env.REACT_APP_PRODUCTION_API_URL
  : process.env.REACT_APP_DEV_API_URL;

module.exports = {
  AUTH_HEADER: auth_header,
  JWT_TOKEN_REQUEST_HEADER: "X-JWT-Token",
  API_URL: api_url,
};
