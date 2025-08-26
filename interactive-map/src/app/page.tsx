"use client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Link href="/sign-up" className="btn btn-primary btn-lg">
          Get Started
        </Link>
      </div>
    </>
  );
}
