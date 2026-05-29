import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080";
// the login used for the owner is at the file dedicated for the teacher user
const OwnerService = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

OwnerService.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token"); // Adjust the key name as needed

    // Add token to headers if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error: ", error);
    return Promise.reject(error); // Fixed: added 'return'
  },
);

OwnerService.interceptors.response.use(
  (response) => {
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
export async function getOwnerResource() {
  const response = await OwnerService.get("api/admin_page", {
    withCredentials: true,
  });
  return response.data;
}
export async function addTeacher(teacher) {
  const response = await OwnerService.post("api/Admin/save_teacher", teacher, {
    withCredentials: true,
  });
  return response.data;
}
export async function deleteStudent(id) {
  const response = await OwnerService.delete("teacher/delete/" + id, {
    withCredentials: true,
  });
  return response.data;
}
export async function getClassData(className) {
  const response = await OwnerService.get("api/class_page/" + className, {
    withCredentials: true,
  });
  return response.data;
}

export default OwnerService;
