const tokenKey = 'ld-token';

export const TokenService = {
  getToken(token = tokenKey) {
    return localStorage.getItem(token);
  },
  removeToken(token = tokenKey) {
    localStorage.removeItem(token);
  },
  setToken(data, token = tokenKey) {
    localStorage.setItem(token, data);
  },
};
