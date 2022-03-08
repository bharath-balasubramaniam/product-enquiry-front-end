import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
const validateEmail = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
function FormField() {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        contact: "",
        productName: "",
        productQuantity: "",
        productDescription: "",
        remarks: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = "Name is Required";
        if (!values.email) {
          errors.email = "E-mail is Required";
        } else if (!validateEmail.test(values.email)) {
          errors.email = "E-mail is invalid";
        }
        if (!values.contact) errors.contact = "Contact number is Required";
        if (!values.productName)
          errors.productName = "Product Name is Required";
        if (!values.productQuantity)
          errors.productQuantity = "Quantity is Required";
        if (!values.productDescription)
          errors.productDescription = "Description is Required";
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(true);
        }, 500);
        try {
          const { data } = await axios.post(
            "https://product-enquiry.herokuapp.com/product-enquiry/",
            { ...values }
          );
          console.log(data);
        } catch (error) {
          console.log(error.message);
        }
        console.log(values);
        alert("Check the given values in the console!");
      }}
    >
      {({ isSubmitting, handleReset }) => {
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
                      />
                      <ErrorMessage name="productDescription" />
                    </div>
                  </div>
                  <div className="row" style={{ margin: "10px 0px" }}>
                    <div className="col">
                      <label htmlFor="remarks">Add Remarks if you wish!</label>
                      <div></div>
                      <Field
                        as="textarea"
                        name="remarks"
                        id="remarks"
                        style={{ height: "15vh", width: "50%" }}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="Col" style={{ margin: "10px 0px" }}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        submit
                      </button>
                      <button
                        type="reset"
                        onClick={handleReset}
                        className="btn btn-danger"
                        style={{ marginLeft: "20px" }}
                      >
                        Reset
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
  );
}
export default FormField;
