import axios from "axios";
export const axize = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    "Content-Type": "application/json",
    header: {
      Authorization: token
    }
  });
};
