import axios from "axios";
import { base_url } from "./base_url";

// axios POST request
const options = {
  url: "http://localhost:3000/api/home",
  method: "get",
  headers: {
    // Accept: "application/json",
    // "Content-Type": "application/json;charset=UTF-8",
  },

};

export default async function getApi() {
  await axios.get(`${base_url}/account/signin/`)
  .then((res) => {
    console.log(res.status);
  })
  .catch((err)=>{
    console.log(err.status);

  })
}
