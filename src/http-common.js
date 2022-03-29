import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44336/api/File",
  headers: {
    "Content-type": "application/json"
  }
});