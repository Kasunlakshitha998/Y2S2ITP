import api from "./api";

class PromoEventAPI {
  // Create promoEvent
  static createPromoEvent(data) {
    return api.post("/api/promo-events", data);
  }

  // Get all promoEvents
  static getPromoEvents() {
    return api.get("/api/promo-events");
  }

  // Get all active promoEvents
  static getActivePromoEvents() {
    return api.get("/api/promo-events/active");
  }

  // Get promoEvent by id
  static getPromoEventById(id) {
    return api.get(`/api/promo-events/${id}`);
  }

  // Update promoEvent
  static updatePromoEvent(values) {
    const { id, data } = values;
    return api.patch(`/api/promo-events/${id}`, data);
  }

  // Delete promoEvent
  static deletePromoEvent(id) {
    return api.delete(`/api/promo-events/${id}`);
  }

  // Get promoEvents count
  static getPromoEventsCount() {
    return api.get("/api/promo-events/count");
  }
}

export default PromoEventAPI;
