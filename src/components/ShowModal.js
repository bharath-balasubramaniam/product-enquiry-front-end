import React from "react";
import { useState } from "react";
import ProductBackdrop from "./ProductBackdrop";
import ProductModal from "./ProductModal";
import "./productModal.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
export const InfoButton = ({ info }) => {
  const [showModal, setShowModal] = useState();
  function showModalHandler() {
    setShowModal(true);
  }
  function closeModalHandler() {
    setShowModal(false);
  }
  return (
    <div>
      <VisibilityIcon
        style={{
          color: "blue",
          fontSize: "30px",
          cursor: "pointer",
        }}
        onClick={showModalHandler}
      />
      {showModal && <ProductBackdrop onClick={closeModalHandler} />}
      {showModal && <ProductModal info={info} onClose={closeModalHandler} />}
    </div>
  );
};
