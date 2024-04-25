import axios from "axios";

export default axios.create({
    baseURL : "http://localhost:8002/Homable/apis",
    headers: {
        "Content-type": "application/json"
      }
})