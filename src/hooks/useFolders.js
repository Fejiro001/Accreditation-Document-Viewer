import { create } from "zustand";
import api from "../api";

const ROOT_FOLDER_ID = import.meta.env.VITE_ROOT_FOLDER_ID;

/**
 * Custom hook to manage folder-related state and actions.
 *
 * This hook provides state management for a root folder, and a method to fetch root folders from the API.
 *
 * @constant {string} ROOT_FOLDER_ID - The ID of the root folder, sourced from environment variables.
 * @function fetchRootFolders - Asynchronously fetches root folders from the API and updates the state.
 * @property {Array} rootFolders - An array to store the fetched root folders.
 */

export const useFolders = create((set) => ({
  rootFolders: [],
  fetchRootFolders: async () => {
    try {
      const response = await api.get(`/folders/${ROOT_FOLDER_ID}`);
      set({ rootFolders: response.data.filter((folder) => folder.isFolder) });
    } catch (error) {
      console.error("Error fetching root folders:", error);
    }
  },
}));
