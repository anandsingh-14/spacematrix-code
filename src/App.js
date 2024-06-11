import { useEffect } from "react";
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setMessage(`Welcome ${data.firstName}`);
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("message", `Welcome ${data.firstName}`);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setMessage("error");
    }
  };
  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));
    setMessage(sessionStorage.getItem("message"));
  }, [isLoggedIn]);
  console.log(sessionStorage.getItem("isLoggedIn"));
  console.log(sessionStorage.getItem("message"));
  return (
    <div>
      {!isLoggedIn ? (
        <div className="App">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            style={{ marginBottom: "30px" }}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleLogin}
            style={{ marginTop: "30px" }}
          >
            Sign In
          </button>
        </div>
      ) : (
        <h1>{message}</h1>
      )}
    </div>
  );
}
