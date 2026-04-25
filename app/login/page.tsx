"use client";

import { useState } from "react";
import style from "./login.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

import googleSvg from "@/public/google.svg";
import hideImg from "@/public/pass_show.png";
import showImg from "@/public/pass_hide.png";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("okk", process.env.NEXT_PUBLIC_BACKEND_URL)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }


      // ✅ STORE TOKEN
      localStorage.setItem("access_token", data.access_token);

      // ✅ REDIRECT
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href =
      "https://100-js-backend-2.vercel.app/auth/google/login";
  };

  return (
    <div className={style.loginPage}>
      <div className={style.loginDetaisl}>
        <form className={style.formLogin} onSubmit={handleSubmit}>
          <div className={style.contentTitel}>
            <h2 className={style.loginTitle}>Welcome Back 👋</h2>
            <p className={style.loginPara}>
              Login to continue your session
            </p>
          </div>

          {/* GOOGLE LOGIN */}
          <div className={style.socialLogin}>
            <button
              type="button"
              onClick={handleGoogle}
              className={style.googleButton}
            >
              <Image
                src={googleSvg}
                alt="Google"
                width={24}
                height={24}
                className={style.googleIcon}
                priority
              />
              Continue with Google
            </button>
          </div>

          {/* EMAIL LOGIN */}
          <div className={style.loginPageEMAIL}>
            <label>Email</label>
            <input
              type="email"
              className={style.inputLogin}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label>Password</label>
            <div className={style.passIn}>
              <input
                type={passwordHidden ? "password" : "text"}
                className={style.inputLogin}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className={style.passBtn}
                onClick={() => setPasswordHidden(!passwordHidden)}
              >
                <Image
                  src={passwordHidden ? showImg : hideImg}
                  alt="toggle"
                  width={20}
                  height={20}
                />
              </button>
            </div>

            <div className={style.noAccSignUp}>
              <p>No account?</p>
              <a href="/signup">Sign Up</a>
            </div>

            {error && <p className={style.errorMessage}>{error}</p>}

            <button type="submit" className={style.loginButton}>
              {loading ? "Logging in..." : "Login"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}