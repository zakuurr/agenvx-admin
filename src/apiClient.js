import axios from "axios";

const API_ROOT = "http://localhost/agenvx/";
const GET_COMPANY_ID = API_ROOT + "company/"
const LOGIN = "users/login"
const REGISTER = "users/register"
const LEADERBOARD_INPUT = "leaderboard/input"
const LEADERBOARD_LIST = "leaderboard/list"
const ADD_RATING = "ratings/add"
const ADD_ASSET = "asset/create"
const GET_VIDEO = "asset/list/video/"
const GET_BOOK = "asset/list/book/"

const apiClient = axios.create({
  baseURL: API_ROOT,
  headers: {
    "Content-Type": "application/json",
  },
});

export {
  apiClient,
  GET_COMPANY_ID,
  LOGIN,
  REGISTER,
  LEADERBOARD_INPUT,
  LEADERBOARD_LIST,
  ADD_RATING,
  GET_VIDEO,
  GET_BOOK,
  ADD_ASSET
};
