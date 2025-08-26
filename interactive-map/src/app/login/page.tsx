"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";

export default function Login() {

    // Placeholder for form validation logic
    const validateForm = async () => {

        return true;
    }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const isValid = await validateForm();
    if (isValid) {
      // Handle successful login logic here
      console.log("Form is valid. Proceed with login.");
    } else {
      // Handle form errors here
      console.log("Form is invalid. Show errors.");
    }
  };
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center pt-5">
      <div
        className="bg-dark p-5 rounded shadow mb-4"
        style={{ width: "500px", height: "fit-content" }}
      >
        <div className="text-center mb-4">
          <h1 className="h2 fw-bold text-white mb-2">Log In</h1>
          <p className="text-light mb-0">Please log into continue</p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-white">Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Log In
          </Button>
        </Form>
      </div>

      <div className="text-center">
        <p className="mb-2">Already have an account?</p>
        <Link
          href="/sign-up"
          className="text-primary text-decoration-none fw-bold"
        >
          Sign-up
        </Link>
      </div>
    </div>
  );
}
