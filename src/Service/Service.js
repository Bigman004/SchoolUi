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
  },
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
  },
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
    },
  );
  return response;
};
export const getStudentResult = async (info) => {
  const response = await Service.get("/result/" + info, {
    withCredentials: true,
  });
  return response.data;
};
export const listResult = async () => {
  const response = await Service.get("/result/", {
    withCredentials: true,
  });
  return response.data;
};
export async function postResultbyterm(info, result) {
  const response = await Service.post("result/" + info, result, {
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
    },
  );
  return response;
}

export async function getTeacher() {
  const response = await Service.get("teacher/teacherInfo", {
    withCredentials: true,
  });
  return response.data;
}
export async function addStudent(student) {
  const response = await Service.post("teacher/add_student", student, {
    withCredentials: true,
  });
  return response.data;
}
export async function markStudentById(id, attend) {
  const response = await Service.post(`teacher/mark/${id}`, attend, {
    withCredentials: true,
  });
  return response.data;
}
export async function getAttendanceDate(date) {
  const response = await Service.post("teacher/attendance/date", date, {
    withCredentials: true,
  });
  return response;
}
export async function printResult(info) {
  const response = await Service.get("result/" + info, {
    withCredentials: true,
  });
  return response.data;
}
export default Service;
