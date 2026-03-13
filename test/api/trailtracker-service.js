import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const trailtrackerService = {
  trailtrackerUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.trailtrackerUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.trailtrackerUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.trailtrackerUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.trailtrackerUrl}/api/users`);
    return res.data;
  },

  async createCategory(category) {
    const res = await axios.post(`${this.trailtrackerUrl}/api/categories`, category);
    return res.data;
  },

  async deleteAllCategories() {
    const response = await axios.delete(`${this.trailtrackerUrl}/api/categories`);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${this.trailtrackerUrl}/api/categories/${id}`);
    return response;
  },

  async getAllCategories() {
    const res = await axios.get(`${this.trailtrackerUrl}/api/categories`);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.trailtrackerUrl}/api/categories/${id}`);
    return res.data;
  },

  async getAllTrails() {
    const res = await axios.get(`${this.trailtrackerUrl}/api/trails`);
    return res.data;
  },

  async createTrail(id, trail) {
    const res = await axios.post(`${this.trailtrackerUrl}/api/categories/${id}/trails`, trail);
    return res.data;
  },

  async deleteAllTrails() {
    const res = await axios.delete(`${this.trailtrackerUrl}/api/trails`);
    return res.data;
  },

  async getTrail(id) {
    const res = await axios.get(`${this.trailtrackerUrl}/api/trails/${id}`);
    return res.data;
  },

  async deleteTrail(id) {
    const res = await axios.delete(`${this.trailtrackerUrl}/api/trails/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.trailtrackerUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
