"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Link from "next/link";
import { CreateUserAPI, emailExists, usernameExists } from "../lib/sign-up-service";

export default function SignUp() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const checkEmailExists = async (email: string): Promise<boolean> => {
    return emailExists(email);
  };

  const checkUsernameExists = async (username: string): Promise<boolean> => {
    return usernameExists(username);
  };

  const validateForm = async () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    //Username validation
    if (!formData.username) {
      newErrors.username = "Username is required.";
    } else {
      const usernameExists = await checkUsernameExists(formData.username);
      if (usernameExists) {
        newErrors.username = "This username is already taken.";
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please provide a valid email address.";
    } else {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        newErrors.email = "This email is already registered.";
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 6 characters long.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number.";
    } else if (!/[\W_]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character.";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const isValid = await validateForm();
    setValidated(true);

    if (isValid) {
      CreateUserAPI(formData.email, formData.password, "user");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center pt-5">
      <div
        className="bg-dark p-5 rounded shadow mb-4"
        style={{ width: "500px", height: "fit-content" }}
      >
        <div className="text-center mb-4">
          <h1 className="h2 fw-bold text-white mb-2">Sign Up</h1>
          <p className="text-light mb-0">Please sign up to continue</p>
        </div>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label className="text-white">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              isInvalid={validated && !!errors.username}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.username || "Please provide a valid username."}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-white">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              isInvalid={validated && !!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email || "Please provide a valid email."}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              isInvalid={validated && !!errors.password}
              required
            />
            <div className="mt-2">
              <div
                className={`small ${
                  formData.password.length >= 8 ? "text-success" : "text-light"
                } mb-1`}
              >
                • At least 8 characters
              </div>
              <div
                className={`small ${
                  /[A-Z]/.test(formData.password)
                    ? "text-success"
                    : "text-light"
                } mb-1`}
              >
                • One uppercase letter
              </div>
              <div
                className={`small ${
                  /[a-z]/.test(formData.password)
                    ? "text-success"
                    : "text-light"
                } mb-1`}
              >
                • One lowercase letter
              </div>
              <div
                className={`small ${
                  /[0-9]/.test(formData.password) ? "text-success" : "text-fail"
                } mb-1`}
              >
                • One number
              </div>
              <div
                className={`small ${
                  /[\W_]/.test(formData.password)
                    ? "text-success"
                    : "text-light"
                }`}
              >
                • One special character
              </div>
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.password || "Please provide a valid password."}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
            <Form.Label className="text-white">Re-enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              isInvalid={validated && !!errors.confirmPassword}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword || "Please re-enter the same password."}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>
      </div>

      <div className="text-center">
        <p className="mb-2">Already have an account?</p>
        <Link
          href="/login"
          className="text-primary text-decoration-none fw-bold"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
