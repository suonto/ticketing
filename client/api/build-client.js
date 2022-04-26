import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We're on the server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx',
      headers: req.headers,
    });
  } else {
    return axios.create();
  }
};
