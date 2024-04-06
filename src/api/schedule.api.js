import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export async function sendBasicInfo(data) {
  try {
    console.log(data);
    const response = await axios.post(`${url}/supervision/new`,data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function saveSchedule(data){
  try {
    console.log(data);
    const response = await axios.post(`${url}/supervision/save`,data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
