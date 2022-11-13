import axios from 'axios';
const BACKEND_APP_URL = "http://localhost:8080/api";


export const loginUser = (username, password) => {

  return axios({
    url: BACKEND_APP_URL + "/auth/login",
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({
      "email": username,
      "password": password
    })
  });
}

export const getAllUsers = () => {

  return axios({
    url: BACKEND_APP_URL + "/users_with_status",
    headers: { 'Content-Type': 'application/json', 'token': '' + localStorage.getItem('token') },
    method: "GET"
  });
}

export const getAllUsersWithUserRole = () => {

  return axios({
    url: BACKEND_APP_URL + "/users_with_user_role",
    headers: { 'Content-Type': 'application/json', 'token': '' + localStorage.getItem('token') },
    method: "GET"
  });
}

export const getUserById = (userId) => {
  return axios({
    url: BACKEND_APP_URL + "/users/" + userId,
    headers: { 'Content-Type': 'application/json', 'token': '' + localStorage.getItem('token') },
    method: "GET"
  });
}

export const logoutUser = (userId) => {
  return axios({
    url: BACKEND_APP_URL + "/auth/signout/" + userId,
    method: "POST",
    headers: { 'Content-Type': 'application/json' }
  });
}
export const csvFileUpload = (file) => {
  const formData = new FormData();
  formData.append('file', file)
  return axios({
    url: BACKEND_APP_URL + "/file/upload/" + localStorage.getItem("userId"),
    method: "POST",
    headers: { 'Content-Type': 'multipart/form-data', 'token': '' + localStorage.getItem('token') },
    data: formData
  });
}

export const registerUser = (fname, lname, email, password) => {
  console.log("register user called" + JSON.stringify({
    "firstName": fname,
    "lastName": lname,
    "password": password,
    "email": email
  }));
  return fetch(BACKEND_APP_URL + "/auth/register", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "firstName": fname,
      "lastName": lname,
      "password": password,
      "email": email
    })
  });
}

export const readData = () => {

  return axios({
    url: BACKEND_APP_URL + "/file",
    method: "GET",
    headers: { 'Content-Type': 'application/json', 'token': '' + localStorage.getItem('token') },
  });
}

export const updatePassword = (email, password) => {
  console.log("register user called" + JSON.stringify({
    "password": password,
    "email": email
  }));
  return fetch(BACKEND_APP_URL + "/auth/reset-password", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  });
}
