import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function FormikForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
        setStatus(undefined);
        setTimeout(() => {
          setStatus({ success: true });
          setSubmitting(false);
          resetForm();
        }, 300);
      }}
    >
      {({ isSubmitting, status }) => (
        <Form noValidate>
          <div>
            <label htmlFor="username">Username </label>
            <Field id="username" name="username" type="text" placeholder="Enter username" />
            <div style={{ color: "#b00020", marginTop: "4px" }}>
              <ErrorMessage name="username" />
            </div>
          </div>

          <div>
            <label htmlFor="email">Email </label>
            <Field id="email" name="email" type="email" placeholder="Enter email" />
            <div style={{ color: "#b00020", marginTop: "4px" }}>
              <ErrorMessage name="email" />
            </div>
          </div>

          <div>
            <label htmlFor="password">Password </label>
            <Field id="password" name="password" type="password" placeholder="Enter password" />
            <div style={{ color: "#b00020", marginTop: "4px" }}>
              <ErrorMessage name="password" />
            </div>
          </div>

          {status?.success && (
            <p style={{ color: "#1b5e20", marginTop: "8px" }}>
              Registration submitted successfully!
            </p>
          )}

          <button type="submit" style={{ marginTop: "12px" }} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
}


