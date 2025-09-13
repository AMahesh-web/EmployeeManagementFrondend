import { defineStore } from "pinia";

export const uiStock = defineStore("stockUi", {
  state: () => ({
    addItem: false,
    updateItem: false,
  }),

  actions: {
    openAddItem() {
      this.addItem = true;
    },
    closeAddItem() {
      this.addItem = false;
    },
    openEditForm() {
      this.updateItem = true;
    },
    closeEditForm() {
      this.updateItem = false;
    },
  },
});
