import { create } from "zustand";

export const useStore = create((set) => ({
  // ── state ──────────────────────────────────────────────
  user: {
    name:     "",
    username: "",
    email:    "",
    mobile:   "",
  },

  categories: [],

  notes: localStorage.getItem("super_app_notes") || "",

  // ── actions ────────────────────────────────────────────

  // saves registration data
  setUser: (userData) => set({ user: userData }),

  // saves selected entertainment categories
  setCategories: (categoryArray) => set({ categories: categoryArray }),

  // saves notes and persists to localStorage immediately
  setNotes: (noteText) => {
    localStorage.setItem("super_app_notes", noteText);
    set({ notes: noteText });
  },

  // wipes everything (useful for logout / reset)
  resetStore: () => {
    localStorage.removeItem("super_app_notes");
    set({
      user:       { name: "", username: "", email: "", mobile: "" },
      categories: [],
      notes:      "",
    });
  },
}));