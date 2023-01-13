import axios from 'axios';

const token = localStorage.getItem('token');

export const api = axios.create({
 
  baseURL: "http://localhost:3001",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const apiUser = axios.create({
 
  baseURL: "https://randomuser.me",
 
});
