"use client";

import { useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function login() {
    if (
      user === "admin" &&
      pass === "123456"
    ) {
      document.cookie =
        "civihub_user=Admin; path=/";
      document.cookie =
        "civihub_role=superadmin; path=/";

      window.location.href = "/dashboard";
      return;
    }

    if (
      user === "police" &&
      pass === "123456"
    ) {
      document.cookie =
        "civihub_user=Police Officer; path=/";
      document.cookie =
        "civihub_role=police; path=/";

      window.location.href = "/dashboard";
      return;
    }

    alert("Invalid credentials");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "linear-gradient(135deg,#eef2ff,#f8fafc)",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: "white",
          padding: 28,
          borderRadius: 28,
          boxShadow:
            "0 20px 50px rgba(0,0,0,.08)",
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "#64748b",
            fontWeight: 700,
          }}
        >
          CIVIHUB STAFF ACCESS
        </div>

        <h1
          style={{
            fontSize: 34,
            fontWeight: 800,
            marginTop: 8,
            color: "#0f172a",
          }}
        >
          Secure Login
        </h1>

        <input
          placeholder="Username"
          value={user}
          onChange={(e) =>
            setUser(e.target.value)
          }
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) =>
            setPass(e.target.value)
          }
          style={input}
        />

        <button
          onClick={login}
          style={btn}
        >
          Login
        </button>

        <div
          style={{
            marginTop: 18,
            fontSize: 13,
            color: "#64748b",
          }}
        >
          Demo users:
          <br />
          admin / 123456
          <br />
          police / 123456
        </div>
      </div>
    </main>
  );
}

const input = {
  width: "100%",
  marginTop: 14,
  padding: "16px",
  borderRadius: "18px",
  border: "1px solid #e5e7eb",
  fontSize: 16,
};

const btn = {
  width: "100%",
  marginTop: 18,
  padding: "16px",
  borderRadius: "18px",
  border: "none",
  background: "#22c55e",
  color: "white",
  fontWeight: 800,
  fontSize: 16,
  cursor: "pointer",
};