import React from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useDiscountCount } from "../../../hooks/useDiscountData";
import { usePromoEventCount } from "../../../hooks/usePromoEventData";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the data from the react-query hook
  const { data: discountCount } = useDiscountCount();
  const { data: promoEventCount } = usePromoEventCount();
  //
  return (
    <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}</strong>
        </div>
      )}

      <div className="row">
        <h2 className="mb-3">
          {/* greeting message based on the time of the day */}
          {new Date().getHours() < 12
            ? "Good Morning"
            : new Date().getHours() < 18
            ? "Good Afternoon"
            : "Good Evening"}
          , {user && user.name}
        </h2>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">💰 Discounts</h5>
              <p className="card-text fs-4 fw-bold">
                {discountCount ? discountCount?.data?.count : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">🎉 Promo/Events</h5>
              <p className="card-text fs-4 fw-bold">
                {promoEventCount ? promoEventCount?.data?.count : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
