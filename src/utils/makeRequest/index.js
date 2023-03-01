import axios from "axios";
import { BACKEND_URL } from "../../constants/apiEndpoints";
import { ERROR_ROUTE } from "../../constants/routes";

const makeRequest = async (apiEndPoint, dynamicConfig, navigate) => {
  try {
    const requestDetails = {
      baseURL: BACKEND_URL,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
    };
    const { data } = await axios(requestDetails);
    return data;
  } catch (e) {
    const errorStatus = e.response?.status;
    if (navigate) {
      if (errorStatus) {
        navigate(`${ERROR_ROUTE}/${errorStatus}`);
      } else {
        navigate(ERROR_ROUTE);
      }
    }
    return null;
  }
};

export default makeRequest;
