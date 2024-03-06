import axios from "axios";

const client = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/todos/1`,
});

export default client;
