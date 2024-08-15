import React, { useRef, useState } from "react";
import axiosClient from "../api/axios/axios";
import kelinci from "../assets/img-beranda/kelinci.png";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsloading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsloading(true);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/auth/login", payload)
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("USER_ROLE", res.data.data.user.role);
        localStorage.setItem("ACCESS_TOKEN", res.data.data.token);
        navigate("/");
      })
      .catch((err) => {
        const response = err.response;
        if (response.data.statusCode === 422) {
          toast.error(response.data.message);
        } else {
          window.location.replace("/login");
        }
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    window.location.replace(import.meta.env.VITE_API_BASE_URL + "/api/login/google");
  };

  const handleFacebookLogin = (event) => {
    event.preventDefault();
    window.location.replace(import.meta.env.VITE_API_BASE_URL + "/api/login/facebook");
  };

  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #ffffff",
            padding: "12px",
            color: "#ffffff",
            zIndex: "1000",
            backgroundColor: "#429eff",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#429eff",
          },
        }}
      />
      <div className="flex w-screen min-h-screen">
        <div className="w-2/4 justify-center items-center flex-col hidden md:flex">
          <h1 className="header5-bold">Jabaraya</h1>
          <img src={kelinci} alt="Maskot jabaraya" className="-mr-11 xl:w-80 lg:w-72 md:w-64" />
          <h4 className="header5-bold">Teman Perjalanan Bandungmu!</h4>
        </div>
        <div className="md:w-2/4 w-full bg-gradient-to-b from-[#3C90E8] to-[#1D1DA0] flex justify-center items-center md:p-0 px-10 sm:px-16">
          <form method="post" onSubmit={(e) => handleLogin(e)} className="bg-white rounded-[20px] p-8 w-full xl:mx-36 lg:mx-16 md:mx-10">
            <h1 className="titel2-bold text-center mb-3">Selamat datang! Silahkan masuk</h1>
            <div className="flex flex-col md:gap-4 gap-3">
              <div className="flex flex-col">
                <label htmlFor="email" className="titel2 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  ref={emailRef}
                  placeholder="Masukkan email"
                  className="outline-none ring-0 text-caption border-none jbDropShadow rounded-2xl px-4 py-3 md:py-4 placeholder:text-[#AEAEAE] bg-white"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="titel2 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  ref={passwordRef}
                  name="password"
                  placeholder="Masukkan password"
                  className="outline-none ring-0 text-titel border-none font-sans placeholder:font-Urbanist jbDropShadow rounded-2xl px-4 py-2 md:py-3.5 placeholder:text-[#AEAEAE] placeholder:text-caption bg-white md:tracking-wide tracking-normal placeholder:tracking-normal"
                  required
                />
              </div>

              <div className="w-full flex justify-end">
                <p className="text-center text-caption">
                  Lupa password?
                  <a href={"/login"} className="text-caption-bold ml-1 hover:underline">
                    Klik disini
                  </a>
                </p>
              </div>

              <button
                type="submit"
                className={`text-body-bold bg-jabarayaColors-700 text-white py-3 md:py-4 rounded-2xl transition-all flex justify-center items-center ${isLoading ? "bg-jabarayaColors-800" : "hover:bg-jabarayaColors-800"}`}
                disabled={isLoading}
              >
                {isLoading ? <div className="border-gray-300 lg:h-6 lg:w-6 w-4 h-4 animate-spin rounded-full border-2 border-t-white" /> : "Masuk"}
              </button>
            </div>

            <h3 className="text-center text-caption my-5">Atau</h3>

            <div className="flex flex-col mb-3">
              <button type="button" onClick={(e) => handleGoogleLogin(e)} className="text-body py-3 md:py-4 rounded-2xl mb-3 flex justify-center items-center gap-3 jbDropShadow hover:bg-slate-50 transition-all">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="lg:h-[25px] lg:w-[25px] h-[20px] w-[20px]" />
                Masuk dengan Google
              </button>
              <button type="button" onClick={(e) => handleFacebookLogin(e)} className="text-body py-3 md:py-4 rounded-2xl mb-3 flex justify-center items-center gap-3 jbDropShadow hover:bg-slate-50 transition-all">
                <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="facebook" className="lg:h-[25px] lg:w-[25px] h-[20px] w-[20px]" />
                Masuk dengan Facebook
              </button>
            </div>

            <p className="text-center text-caption">
              Tidak punya akun?
              <a href={"/register"} className="text-caption-bold ml-1 hover:underline">
                Buat akun disini
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
