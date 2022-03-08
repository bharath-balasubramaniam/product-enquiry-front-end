import React from "react";
import { Link } from "react-router-dom";
function ProductModal({ info, onClose }) {
  return (
    <div
      style={{
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "6px",
        backgroundColor: "white",
        padding: "1rem",
        textAlign: "center",
        width: "30rem",
        zIndex: "100",
        position: "fixed",
        top: "20vh",
        left: "calc(50% - 15rem)",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
        Product Information
      </h1>
      <div className="modal-wrapper">
        <p className="info-title">
          Name : <span className="info"> {info.name}</span>
        </p>
        <p className="info-title">
          Mobile no : <span className="info"> {info.contact}</span>
        </p>
        <p className="info-title">
          Product name : <span className="info"> {info.productName}</span>
        </p>
        <p className="info-title">
          Quantity: <span className="info"> {info.productQuantity}</span>
        </p>
        <p className="info-title">
          Description : <span className="info"> {info.productDescription}</span>
        </p>
        <p className="info-title">
          Remarks : <span className="info"> {info.remarks}</span>
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Link to={`/product/${info._id}`}>
            <button className="btn">Edit</button>
          </Link>
          <button className="btn btn--alt" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
