import React, { useRef, useState } from "react";
import axiosClient from "../api/axios/axios";
import AvatarModal from "../components/AvatarModal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/plain.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [phoneValue, setPhoneValue] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [avatarFile, setAvatarFile] = useState("");
  const [avatarFileUrl, setAvatarFileUrl] = useState("");
  const [errors, setErrors] = useState(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const [selectedImage, setSelectedImage] = useState("https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-null.png?alt=media");

  function handleFileChange(e) {
    if (e.target.files.length > 0) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatarFile(e.target.files[0]);
      setAvatarFileUrl(url);
      setSelectedImage(url);
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsloading(true);
    const payload = {
      name: name,
      phone: phoneValue,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    if (selectedImage === avatarFileUrl) {
      payload.avatarImage = avatarFile;
    } else {
      payload.avatarUrl = selectedImage;
    }

    axiosClient
      .post("/auth/register", payload)
      .then((res) => {
        localStorage.setItem("USER_ROLE", res.data.data.user.role);
        localStorage.setItem("ACCESS_TOKEN", res.data.data.token);
        setErrors(null);
        if (res.data.data.user.role == "user") {
          navigate("/");
          toast.success(res.data?.message);
        } else if (res.data.data.user.role === "admin") {
          navigate("/dashboard");
          toast.success(res.data?.message);
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response.data.statusCode === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            toast.error(response.data?.message);
          }
        } else {
          toast.error("Something went wrong!");
        }
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <div className="flex min-h-screen">
      <div className="md:w-2/4 w-full bg-gradient-to-b from-[#3C90E8] to-[#1D1DA0] flex justify-center items-center md:p-0 px-10 sm:px-16">
        <form encType="multipart/form-data" onSubmit={handleRegister} method="post" className="bg-white rounded-[20px] p-8 w-full xl:mx-36 lg:mx-16 md:mx-10 flex flex-col justify-between gap-3 md:my-5 my-10">
          <h1 className="titel2-bold text-center">Daftarin akun kamu</h1>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="name" className="titel2 mb-1">
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama"
                className="outline-none ring-0 text-caption border-none jbDropShadow rounded-2xl px-4 py-3 md:py-4 placeholder:text-[#AEAEAE] bg-white"
                required
              />
              {errors &&
                errors.name &&
                errors.name.map((error, index) => (
                  <small key={index} className="text-red-600">
                    {error}
                  </small>
                ))}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="titel2 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                className="outline-none ring-0 text-caption border-none jbDropShadow rounded-2xl px-4 py-3 md:py-4 placeholder:text-[#AEAEAE] bg-white"
                required
              />
              {errors &&
                errors.email &&
                errors.email.map((error, index) => (
                  <small key={index} className="text-red-600">
                    {error}
                  </small>
                ))}
            </div>

            <div className="flex flex-col">
              <label htmlFor="name" className="titel2 mb-1">
                Nomor Telepon
              </label>
              <PhoneInput
                containerClass="outline-none ring-0 text-titel border-none font-sans placeholder:font-Urbanist jbDropShadow rounded-2xl  placeholder:text-[#AEAEAE] placeholder:text-caption bg-white md:tracking-wide tracking-normal placeholder:tracking-normal"
                inputClass="!border-none !font-Urbanist !w-full !h-full rounded-2xl !pl-14 !py-3 !px-4 md:!py-[18px] md:tracking-wide tracking-normal placeholder:tracking-normal placeholder:text-[#AEAEAE] placeholder:text-caption text-titel"
                buttonClass="!border-none !rounded-l-2xl h-full w-1/12"
                dropdownClass="rounded-3xl"
                searchClass=""
                country={"id"}
                placeholder="Masukkan nomor telepon"
                value={phoneValue}
                onChange={(value) => setPhoneValue(value)}
              />
              {errors &&
                errors.phone &&
                errors.phone.map((error, index) => (
                  <small key={index} className="text-red-600">
                    {error}
                  </small>
                ))}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="titel2 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="outline-none ring-0 text-titel border-none font-sans placeholder:font-Urbanist jbDropShadow rounded-2xl px-4 py-2 md:py-3.5 placeholder:text-[#AEAEAE] placeholder:text-caption bg-white md:tracking-wide tracking-normal placeholder:tracking-normal"
                required
              />
              {errors &&
                errors.password &&
                errors.password.map((error, index) => (
                  <small key={index} className="text-red-600">
                    {error}
                  </small>
                ))}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password_confirmation" className="titel2 mb-1">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Masukkan password"
                className="outline-none ring-0 text-titel border-none font-sans placeholder:font-Urbanist jbDropShadow rounded-2xl px-4 py-2 md:py-3.5 placeholder:text-[#AEAEAE] placeholder:text-caption bg-white md:tracking-wide tracking-normal placeholder:tracking-normal"
                required
              />
              {errors &&
                errors.password_confirmation &&
                errors.password_confirmation.map((error, index) => (
                  <small key={index} className="text-red-600">
                    {error}
                  </small>
                ))}
            </div>

            <button
              type="submit"
              className={`text-body-bold bg-jabarayaColors-700 text-white mt-2 py-3 md:py-4 rounded-2xl transition-all flex justify-center items-center ${isLoading ? "bg-jabarayaColors-800" : "hover:bg-jabarayaColors-800"}`}
              disabled={isLoading}
            >
              {isLoading ? <div className="border-gray-300 lg:h-6 lg:w-6 w-4 h-4 animate-spin rounded-full border-2 border-t-white" /> : "Buat Akun"}
            </button>
          </div>

          <p className="text-center text-caption">
            Sudah punya akun?
            <a href={"/login"} className="text-caption-bold ml-1 hover:underline cursor-pointer">
              Masuk disini
            </a>
          </p>
        </form>
      </div>

      <div className="w-2/4 justify-center items-center flex-col hidden md:flex">
        <h1 className="header5-bold">Jabaraya</h1>
        <div className="mt-6 jbDropShadow px-8 pt-5 rounded-[20px] flex flex-col justify-center mb-3 pb-4">
          <div className="flex flex-col xl:w-80 lg:w-64 md:w-60">
            <h1 className="header5-bold text-center">Buat profile kamu</h1>
            <img src={selectedImage} alt="Avatar" className="rounded-full my-6 self-center lg:w-52 lg:h-52 md:h-48 md:w-48 object-center object-cover" />
            <button className="text-body-bold text-white bg-jabarayaColors-700 p-2 rounded-[10px] hover:bg-jabarayaColors-800 transition mb-2" onClick={() => setShowAvatarModal(true)}>
              Atur Profile
            </button>
            {errors &&
              errors.avatarImage &&
              errors.avatarImage.map((error, index) => (
                <small key={index} className="text-red-600">
                  {error}
                </small>
              ))}
          </div>

          <AvatarModal open={showAvatarModal} onClose={() => setShowAvatarModal(false)}>
            <h1 className="titel1-bold">Tentukan foto profile kamu</h1>

            <div className="container grid grid-cols-3 justify-center items-center xl:-ml-2 lg:-ml-10 md:-ml-16 xl:scale-100 lg:scale-90 md:scale-75 gap-32 lg:gap-0 xl:my-6 lg:my-5 md:-my-3">
              <div className="h-full flex">
                <input
                  type="radio"
                  name="avatarSelect"
                  id="radio-form-image1"
                  value={"https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-1.png?alt=media"}
                  className="opacity-0"
                  onClick={() => setSelectedImage("https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-1.png?alt=media")}
                />
                <label htmlFor="radio-form-image1" className="flex flex-col justify-between group">
                  <div className="w-max h-max">
                    <img
                      alt="Avatar Man"
                      src={"https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-1.png?alt=media"}
                      width={200}
                      className={`rounded-full my-8 cursor-pointer xl:w-44 xl:h-44 lg:h-40 lg:w-40 md:w-[150px] md:h-[150px]`}
                    />
                  </div>
                  <h1 className={`titel2 text-center group-hover:underline ${selectedImage === "https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-1.png?alt=media" && "underline"}`}>
                    Laki-laki
                  </h1>
                </label>
              </div>
              <div className="h-full flex">
                <input
                  type="radio"
                  name="avatarSelect"
                  id="radio-form-image2"
                  value={"https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-2.png?alt=media"}
                  className="opacity-0"
                  onClick={() => setSelectedImage("https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-2.png?alt=media")}
                />
                <label htmlFor="radio-form-image2" className="flex flex-col h-full justify-between group">
                  <div className="w-max h-max">
                    <img
                      alt="Avatar Woman"
                      src={"https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-2.png?alt=media"}
                      className={`rounded-full my-8 cursor-pointer object-cover xl:w-[185px] xl:h-[185px] lg:w-[172px] lg:h-[172px] md:w-[155px] md:h-[155px] object-center`}
                      style={{ objectPosition: "50% 20%" }}
                    />
                  </div>
                  <h1 className={`titel2 text-center group-hover:underline ${selectedImage === "https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-2.png?alt=media" && "underline"}`}>
                    Perempuan
                  </h1>
                </label>
              </div>
              <div className="w-max h-full flex flex-col justify-between group xl:ml-8 lg:ml-9 md:ml-5">
                <div className="w-1/2">
                  <input type="file" name="avatarSelect" id="radio-form-image3" className="opacity-0" onChange={handleFileChange} />
                  <label htmlFor="radio-form-image3" className="flex flex-col justify-between my-auto">
                    {avatarFileUrl ? (
                      <img alt="Avatar File Upload" src={avatarFileUrl} className="rounded-full xl:w-[158px] xl:h-[158px] lg:h-[153px] lg:w-[153px] md:h-[135px] md:w-[135px] mx-auto cursor-pointer object-cover object-center" />
                    ) : (
                      <div className="rounded-full cursor-pointer bg-[#D9D9D9] xl:w-[158px] xl:h-[158px] lg:h-[153px] lg:w-[153px] md:h-[135px] md:w-[135px] mx-auto my-auto" />
                    )}
                  </label>
                </div>
                <h1 className={`titel2 text-center group-hover:underline text-nowrap w-1/2 ${selectedImage === avatarFileUrl && "underline"}`} style={{ "align-items": "self-end" }}>
                  Pilih Foto
                </h1>
              </div>
            </div>

            <button className="btn btn-light w-full text-body-bold text-white bg-jabarayaColors-700 p-2 rounded-[10px] hover:bg-jabarayaColors-800 transition" onClick={() => setShowAvatarModal(false)}>
              Simpan Profile
            </button>
          </AvatarModal>
        </div>
        <h4>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, rerum! Omnis, quia.</h4>
      </div>
    </div>
  );
}
