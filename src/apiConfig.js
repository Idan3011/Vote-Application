import axios from "axios";

const instance = axios.create({
  baseURL: "https://6571bc0fd61ba6fcc0136591.mockapi.io",
});

export default instance;
