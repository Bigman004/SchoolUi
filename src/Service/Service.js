import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080";

const Service = axios.create({
  baseURL: "https://java-application-latest-ywhd.onrender.com",
  headers: { "Content-Type": "application/json" },
});

Service.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token"); // Adjust the key name as needed

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
  }
);

Service.interceptors.response.use(
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
  }
);

export const listStudent2 = async () => {
  const response = await Service.get("/teacher/", {
    withCredentials: true,
  });
  return response.data;
};

export const postLoginDetails2 = async (regNo, password) => {
  const response = await Service.post(
    "/login",
    {
      id: 1,
      registrationNumber: regNo,
      password: password,
    },
    {
      withCredentials: true,
    }
  );
  return response;
};
export const getStudentResult = async (id) => {
  const response = await Service.get("/result/{id}", {
    withCredentials: true,
  });
  return response.data;
};
export const listResult = async () => {
  const response = await Service.get("/result/", {
    withCredentials: true,
  });
  return response;
};
export async function postResultbyterm(id, term, result) {
  const response = await Service.post("result/" + id + "/" + term, result, {
    withCredentials: true,
  });
  return response;
}
export async function getStudentDetails(id) {
  const response = await Service.get("teacher/edit/" + id, {
    withCredentials: true,
  });
  return response.data;
}
export async function postStudentDetails(student) {
  const response = await Service.post("teacher/edit/" + student.id, student, {
    withCredentials: true,
  });
  return response;
}
export async function changeUserPassword(user, password) {
  const response = await Service.post(
    `/change_password?password=${password}`,
    user,
    {
      withCredentials: true,
    }
  );
  return response;
}

export async function getTeacher() {
  const response = await Service.get("teacher/teacherInfo", {
    withCredentials: true,
  });
  return response.data;
}
export const listStudent = () => {
  return axios.get(REST_API_BASE_URL + "/teacher/", {
    withCredentials: true,
  });
};

export const postLoginDetails = (regNo, password) => {
  return axios.post(
    REST_API_BASE_URL + "/login",
    {
      id: 1,
      registrationNumber: regNo,
      password: password,
    },
    { withCredentials: true }
  );
};

export const fetchTeacher = () => {
  return axios.get(REST_API_BASE_URL + "/api/teacher", {
    withCredentials: true,
  });
};

export const submitStudent = () => {
  return axios.post("http://localhost:8080/api/students", student, {
    withCredentials: true,
  });
};
export default Service;
