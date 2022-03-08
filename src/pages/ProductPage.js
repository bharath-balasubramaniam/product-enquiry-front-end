import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ProductPage = () => {
  const { user } = UserState();
  const [product, setProduct] = useState();
  const location = useLocation();
  const history = useHistory();
  const fetchProduct = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://product-enquiry.herokuapp.com/product-enquiry/${
          location.pathname.split("/")[2]
        }`,
        config
      );
      setProduct(data);
    } catch (error) {
      if (error) console.log(error.message);
      return;
    }
  };
  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar />
      <Formik
        initialValues={{
          remarks: product?.remarks,
          status: "enquired",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.remarks) errors.name = "Remarks is Required";

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };
            await axios.patch(
              `https://product-enquiry.herokuapp.com/product-enquiry/${
                location.pathname.split("/")[2]
              }`,
              { ...values },
              config
            );
          } catch (error) {
            console.log(error.message);
          }
          history.push("/products");
        }}
      >
        {() => {
          return (
            <div className="container" style={{ marginTop: "7vh" }}>
              <div className="row">
                <div className="col-12">
                  <Form>
                    <div className="row" style={{ margin: "10px 0px" }}>
                      <div className="col">
                        <label htmlFor="name">Name</label>
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          value={product?.name}
                          disabled
                          className="form-control"
                        />
                        <ErrorMessage name="name" />
                      </div>
                      <div className="col">
                        <label htmlFor="email">Email</label>
                        <Field
                          id="email"
                          name="email"
                          type="text"
                          value={product?.email}
                          disabled
                          className="form-control"
                        />
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className="row" style={{ margin: "10px 0px" }}>
                      <div className="col">
                        <label htmlFor="contact">Contact number</label>
                        <Field
                          id="contact"
                          name="contact"
                          type="text"
                          value={product?.contact}
                          disabled
                          className="form-control"
                        />
                        <ErrorMessage name="contact" />
                      </div>
                      <div className="col">
                        <label htmlFor="prodName">Product Name</label>
                        <Field
                          id="prodName"
                          name="productName"
                          type="text"
                          value={product?.productName}
                          disabled
                          className="form-control"
                        />
                        <ErrorMessage name="productName" />
                      </div>
                    </div>
                    <div className="row" style={{ margin: "10px 0px" }}>
                      <div className="col">
                        <label htmlFor="quantity">Product Quantity</label>
                        <Field
                          name="productQuantity"
                          id="quantity"
                          type="number"
                          min="1"
                          value={product?.productQuantity}
                          disabled
                          className="form-control"
                        />
                        <ErrorMessage name="productQuantity" />
                      </div>
                      <div className="col">
                        <label htmlFor="desc">Product Description</label>
                        <Field
                          id="desc"
                          name="productDescription"
                          type="text"
                          className="form-control"
                          value={product?.productDescription}
                          disabled
                        />
                        <ErrorMessage name="productDescription" />
                      </div>
                    </div>
                    <div className="row" style={{ margin: "10px 0px" }}>
                      <div className="col">
                        <label htmlFor="remarks">
                          Add Remarks if you wish!
                        </label>
                        <div></div>
                        <Field
                          as="textarea"
                          name="remarks"
                          id="remarks"
                          placeholder={product?.remarks}
                          style={{ height: "15vh", width: "50%" }}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="status">Product Status</label>
                        <Field
                          as="select"
                          name="status"
                          id="status"
                          className="form-control"
                        >
                          <option value="enquired">enquired</option>
                          <option value="pending">pending</option>
                          <option value="resolved">resolved</option>
                        </Field>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="Col" style={{ margin: "10px 0px" }}>
                        <button type="submit" className="btn btn-primary">
                          submit
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default ProductPage;
