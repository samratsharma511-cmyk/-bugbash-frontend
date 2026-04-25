"use client";

import { useState } from "react";
import style from "./login.module.css";
import { useRouter } from "next/navigation";
import googleSvg from "@/public/google.svg";
import Image from "next/image";
import hideImg from "@/public/pass_show.png";
import showImg from "@/public/pass_hide.png";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [Error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://100-js-backend-2.vercel.app/auth/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError("Invalid credentials");
        return;
      }

      localStorage.setItem("access_token", data.access_token);

      // ✅ YOUR FLOW
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const passHideShow = () => {
    setPasswordHidden(!passwordHidden);
  };

  // ✅ KEEP SAME (as you said)
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
            <h6 className={style.loginPara}>
              Login to continue your session
            </h6>
          </div>

          {/* GOOGLE */}
          <div className={style.socialLogin}>
            <button
              type="button"
              onClick={handleGoogle}
              className={style.googleButton}
            >
              <Image src={googleSvg} className={style.googleIcon} alt="Google" />
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
                onClick={passHideShow}
              >
                <Image
                  src={passwordHidden ? showImg : hideImg}
                  alt="toggle"
                />
              </button>
            </div>

            <div className={style.noAccSignUp}>
              <p>No account?</p>
              <a href="/signup">Sign Up</a>
            </div>

            {Error && <p className={style.errorMessage}>{Error}</p>}

            <button type="submit" className={style.loginButton}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}