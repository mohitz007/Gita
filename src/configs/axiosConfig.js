import axios from 'axios';



export const instance = axios.create({
    baseURL: 'https://www.gitasupersite.iitk.ac.in',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });