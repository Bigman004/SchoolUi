import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080";
// the login used for the owner is at the file dedicated for the teacher user
const DeveloperService = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

DeveloperService.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Add token to headers if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers,
    });

    return config;
  },
  (error) => {
    console.error("Request Error: ", error);
    return Promise.reject(error); // Fixed: added 'return'
  },
);

DeveloperService.interceptors.response.use(
  (response) => {
    console.log("Response: ", {
      status: response.status,
      data: response.data,
      statusText: "created",
      url: response.config.url,
    });
    return response;
  },
  (error) => {
    console.error("Response Error: ", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  },
);

export async function getDeveloperResource(d) {
  var date = d;
  if (date === undefined) date = "";

  const response = await DeveloperService.get("/monitor/dev_log?date=" + date, {
    withCredentials: true,
  });
  return response.data;
}
export async function getDeveloperResourceByPage(page, d) {
  var date = d;
  if (date === undefined) date = "";
  const response = await DeveloperService.get(
    `/monitor/dev_log?page=${page}&date=${date}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
}
export async function addSchool(school) {
  const response = await DeveloperService.post("developer/add_school", school, {
    withCredentials: true,
  });
  return response;
}

export async function getSearchResult(searchBy, searchParam, page, d) {
  var date = d;
  if (date === undefined) date = "";
  const response = await DeveloperService.get(
    `/monitor/dev_log?searchBy=${searchBy}&searchParam=${searchParam}&page=${page}&date=${date}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export default DeveloperService;
