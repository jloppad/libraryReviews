import { DataProvider, GetListParams, GetOneParams } from "@refinedev/core";
import axios from "axios";

const API_URL = "https://api-wabm.onrender.com";

export const customDataProvider: DataProvider = {
  getApiUrl: () => API_URL, 

  getList: async ({ resource, pagination, filters, sorters }: GetListParams) => {
    try {
      const response = await axios.get(`${API_URL}/${resource}`, {
        params: { ...pagination, ...filters, ...sorters },
      });
      const data = response.data[resource];

      return {
        data,
        total: data.length,
      };
    } catch (error) {
      throw new Error("Error fetching data");
    }
  },

  getOne: async ({ resource, id }: GetOneParams) => {
    try {
      const response = await axios.get(`${API_URL}/${resource}/${id}`);
      return {
        data: response.data,
      };
    } catch (error) {
      throw new Error("Error fetching data");
    }
  },

  create: async ({ resource, variables }) => {
    try {
      const response = await axios.post(`${API_URL}/${resource}`, variables);
      return {
        data: response.data,
      };
    } catch (error) {
      throw new Error("Error creating data");
    }
  },

  update: async ({ resource, id, variables }) => {
    try {
      const response = await axios.put(`${API_URL}/${resource}/${id}`, variables);
      return {
        data: response.data,
      };
    } catch (error) {
      throw new Error("Error updating data");
    }
  },

  deleteOne: async ({ resource, id }) => {
    try {
      const response = await axios.delete(`${API_URL}/${resource}/${id}`);
      return {
        data: response.data,
      };
    } catch (error) {
      throw new Error("Error deleting data");
    }
  },
};
