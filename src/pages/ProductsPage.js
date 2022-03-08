import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductsTable from "../components/ProductsTable";
import { UserState } from "../context/UserProvider";

const ProductsPage = () => {
  const [status, setStatus] = useState();
  const [products, setProducts] = useState();
  const { user } = UserState();
  useEffect(() => {
    handleStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleStatus = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      if (status) {
        const { data } = await axios.get(
          `https://product-enquiry.herokuapp.com/product-enquiry?status=${status}`,
          config
        );
        setProducts(data);
      } else {
        const { data } = await axios.get(
          `https://product-enquiry.herokuapp.com/product-enquiry`,
          config
        );
        setProducts(data);
      }
    } catch (error) {
      if (error) console.log(error.message);
      return;
    }
    // console.log(status);
  };
  // console.log(products);
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <label htmlFor="status">Product Status : </label>
        <select
          name="status"
          id="status"
          onChange={(e) => setStatus(e.target.value)}
          style={{ maxWidth: "250px", marginLeft: "10px" }}
        >
          <option value="enquired">enquired</option>
          <option value="pending">pending</option>
          <option value="resolved">resolved</option>
        </select>
        <button
          style={{
            font: "inherit",
            padding: "0.2rem 1.2rem",
            cursor: "pointer",
            borderRadius: "4px",
            backgroundColor: "#7ce924",
            color: "white",
            border: "1px solid #a4f177",
            margin: "0rem 1rem",
          }}
          onClick={handleStatus}
        >
          Submit
        </button>
      </div>
      <ProductsTable products={products} />
    </>
  );
};

export default ProductsPage;
