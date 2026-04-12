import React from "react";
import DevProcess from "./Error/DevProcess";
import OwnerNav from "./OwnerNav";

const CheckPayment = () => {
  return (
    <>
      <OwnerNav />
      <div className="check-payment">
        <DevProcess />
      </div>
    </>
  );
};

export default CheckPayment;
