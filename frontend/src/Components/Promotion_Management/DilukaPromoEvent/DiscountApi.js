import api from "./api";

class DiscountAPI {
  // Create discount
  static createDiscount(data) {
    return api.post("/api/discounts", data);
  }

  // Get all discounts
  static getDiscounts() {
    return api.get("/api/discounts");
  }

  // Get discount by id
  static getDiscountById(id) {
    return api.get(`/api/discounts/${id}`);
  }

  // Update discount
  static updateDiscount(values) {
    const { id, data } = values;
    return api.patch(`/api/discounts/${id}`, data);
  }

  // Delete discount
  static deleteDiscount(id) {
    return api.delete(`/api/discounts/${id}`);
  }

  // Get discounts count
  static getDiscountsCount() {
    return api.get("/api/discounts/count");
  }
}

export default DiscountAPI;
