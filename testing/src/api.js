import axios from "axios";
import md5 from "md5";

const BASE_URL =
  "https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=412039294c3da4d7d9c47671d49470f5";
const API_KEY = "412039294c3da4d7d9c47671d49470f5";
const PUBLIC_KEY = "412039294c3da4d7d9c47671d49470f5";
const PRIVATE_KEY = "6e748f37d8d430903965d48d14f2944280c69c32";
let ts = new Date().getTime();
let hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

export const getCharacters = async () => {
  try {
    const response = await axios.get(`${BASE_URL}&ts=${ts}&hash=${hash}`);
    return response.data.data.results;
  } catch (error) {
    console.error(error);
  }
};

export default getCharacters;
