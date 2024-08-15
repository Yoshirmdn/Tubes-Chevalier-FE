import React, { useEffect, useState } from "react";
import berita1 from "../assets/img-beranda/berita1.png";
import iconMiniArrow from "../assets/icons/icon-miniArrow.svg";
import logout from "../assets/img-beranda/logout.png";
import lock from "../assets/img-beranda/lock.png";
import idk from "../assets/img-beranda/idk.png";
import tulis from "../assets/icons/icon-edit.svg";
import iconArrowLeft from "../assets/icons/icon-miniArrowLeft.svg";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axios/axios";
import Loading from "../components/Loading";
import AvatarModal from "../components/AvatarModal";
import toast from "react-hot-toast";

export default function ProfileSettings() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    getProfileData();
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    const logoutPromise = axiosClient
      .post("/auth/logout")
      .then(() => {
        localStorage.removeItem("USER_ROLE");
        localStorage.removeItem("ACCESS_TOKEN");
        navigate("/");
      })
      .catch((err) => {
        const response = err.response;
        console.error(response);
      });
    toast.promise(logoutPromise, {
      loading: "Loading...",
      success: "User logout successfully",
      error: "Something went wrong!",
    });
  };

  const getProfileData = async () => {
    axiosClient
      .get("/user")
      .then((res) => {
        setUserProfile(res.data.data.user);
      })
      .catch((err) => {
        const response = err.response;
        console.error(response);
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      {userProfile ? (
        <section className="mt-24 sm:mt-28 xl:px-20 lg:px-16 sm:px-14 pb-20">
          <button type="button" onClick={() => navigate(-1)} className="flex flex-row bg-white hover:bg-slate-50 transition jbDropShadow gap-3 items-center justify-center rounded-md py-1.5 px-4 mx-4 sm:mx-0">
            <img src={iconArrowLeft} alt="Arrow" className="md:2.5 w-2" />
            <h4 className="titel2">Kembali</h4>
          </button>

          <div className="sm:mt-4 mt-2 grid grid-cols-3 gap-4">
            <ProfileInformation userProfile={userProfile} getProfileData={getProfileData} />
            <ProfileUpdateDataInput getProfileData={getProfileData} />
          </div>

          <div className="flex flex-col justify-center lg:justify-start mt-8 sm:mt-4 mx-4 sm:mx-0 bg-white transition-all">
            <ProfileChangePassword />
          </div>

          <div className="flex justify-end mt-4 mx-4 sm:mx-0">
            <button type="button" onClick={(e) => handleLogout(e)} className="bg-white hover:bg-slate-50 transtition jbDropShadow py-1.5 px-4 flex flex-row gap-2 justify-center items-center rounded-md place-self-end">
              <img src={logout} alt="Logout Icon" className="w-auto h-auto" />
              <h1 className="titel2">Log out</h1>
            </button>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}

const ProfileUpdateDataInput = ({ getProfileData }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUserDataSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {};
    if (name.length > 0) {
      payload.name = name;
    }
    if (phone.length > 0) {
      payload.phone = phone;
    }
    if (email.length > 0) {
      payload.email = email;
    }
    axiosClient
      .post(`/user`, payload, {
        headers: {
          "X-HTTP-Method-Override": "PUT",
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200 || res.data.statusCode === 201) {
          setName("");
          setEmail("");
          setPhone("");
          getProfileData();
          setErrors(null);
          toast.success(res.data?.message);
        } else {
          toast.error("Something went wrong!");
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
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="bg-white jbDropShadow rounded-lg lg:col-span-2 col-span-3 mx-4 sm:mx-0 sm:mt-0 mt-2">
        <form method="post" className="md:p-6 p-4 flex flex-col md:gap-4 gap-3" onSubmit={(e) => handleUpdateUserDataSubmit(e)}>
          <div className="flex flex-col lg:gap-3 sm:gap-2.5 gap-2">
            <h2 className="titel1-bold">Nama</h2>
            <div className="col-span-2 sm:col-span-1 flex jbDropShadow gap-3 items-center justify-between rounded-lg py-1 px-4">
              <label htmlFor="input-name" className="flex items-center border-r border-[#BDBBBB] h-[65%] w-max pr-3">
                <img className="md:w-6 md:h-6 w-5 h-5" src={tulis} alt="Location Icon" />
              </label>
              <input
                id="input-name"
                type="text"
                className="text-[#595959] bg-transparent text-body rounded-lg border-none outline-none focus:ring-0 focus:border-none focus:outline-none w-full py-2.5 px-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ubah nama"
                disabled={isLoading}
              />
            </div>
            {errors &&
              errors.name &&
              errors.name.map((error, index) => (
                <small key={index} className="text-red-600">
                  {error}
                </small>
              ))}
          </div>

          <div className="flex flex-col lg:gap-3 sm:gap-2.5 gap-2">
            <h2 className="titel1-bold">Nomor Telepon</h2>
            <div className="col-span-2 sm:col-span-1 flex jbDropShadow gap-3 items-center justify-between rounded-lg py-1 px-4">
              <label htmlFor="input-phone" className="flex items-center border-r border-[#BDBBBB] h-[65%] w-max pr-3">
                <img className="md:w-6 md:h-6 w-5 h-5" src={tulis} alt="Location Icon" />
              </label>
              <input
                id="input-phone"
                type="number"
                className="text-[#595959] bg-transparent text-body rounded-lg border-none outline-none focus:ring-0 focus:border-none focus:outline-none w-full py-2.5 px-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ubah nomor telepon"
                disabled={isLoading}
              />
            </div>
            {errors &&
              errors.phone &&
              errors.phone.map((error, index) => (
                <small key={index} className="text-red-600">
                  {error}
                </small>
              ))}
          </div>

          <div className="flex flex-col lg:gap-3 sm:gap-2.5 gap-2">
            <h2 className="titel1-bold">Email</h2>
            <div className="col-span-2 sm:col-span-1 flex jbDropShadow gap-3 items-center justify-between rounded-lg py-1 px-4">
              <label htmlFor="input-email" className="flex items-center border-r border-[#BDBBBB] h-[65%] w-max pr-3">
                <img className="md:w-6 md:h-6 w-5 h-5" src={tulis} alt="Location Icon" />
              </label>
              <input
                id="input-email"
                type="email"
                className="text-[#595959] bg-transparent text-body rounded-lg border-none outline-none focus:ring-0 focus:border-none focus:outline-none w-full py-2.5 px-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ubah email"
                disabled={isLoading}
              />
            </div>
            {errors &&
              errors.email &&
              errors.email.map((error, index) => (
                <small key={index} className="text-red-600">
                  {error}
                </small>
              ))}
          </div>

          <button type="submit" disabled={isLoading} className="px-4 py-1.5 rounded-md ml-auto bg-white hover:bg-slate-50 transition jbDropShadow text-black self-start flex items-center">
            {isLoading ? (
              <div className="border-gray-300 lg:h-6 lg:w-6 w-4 h-4 animate-spin rounded-full border-2 border-t-white xl:mx-12 lg:mx-10 md:mx-8 sm:mx-6 mx-4" />
            ) : (
              <>
                <img src={tulis} alt="Icon" className="w-5 h-5 mr-2 " />
                <p className="titel2">Simpan Data</p>
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

const ProfileInformation = ({ userProfile, getProfileData }) => {
  const [avatarFile, setAvatarFile] = useState("");
  const [avatarFileUrl, setAvatarFileUrl] = useState("");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [errors, setErrors] = useState(null);

  function handleFileChange(e) {
    if (e.target.files.length > 0) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatarFile(e.target.files[0]);
      setAvatarFileUrl(url);
      setSelectedImage(url);
    }
  }

  const handleSubmitChangeAvatar = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let payload = {};
    if (selectedImage === avatarFileUrl) {
      payload.avatarImage = avatarFile;
    } else {
      payload.avatarUrl = selectedImage;
    }
    axiosClient
      .post(`/user`, payload, {
        headers: {
          "X-HTTP-Method-Override": "PUT",
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200 || res.data.statusCode === 201) {
          getProfileData();
          setShowAvatarModal(false);
          setErrors(null);
          setAvatarFile("");
          setAvatarFileUrl("");
          setSelectedImage("");
          toast.success("Avatar changed successfully");
        } else {
          toast.error("Something went wrong!");
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
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className="w-full bg-white sm:jbDropShadow shadow-[0px_2px_2px_1px_rgba(0,0,0,0.10)] sm:rounded-lg flex flex-col items-center lg:col-span-1 col-span-3 sm:py-8 py-6 px-4">
        <img src={userProfile.avatar} alt="Avatar" className="lg:w-36 lg:h-36 w-24 h-24 rounded-full object-cover object-center" />
        <button type="button" onClick={() => setShowAvatarModal(true)} className="mt-4 bg-white jbDropShadow text-gray rounded-md hover:bg-slate-50 transition flex items-center justify-between px-4 py-2">
          <img src={tulis} alt="" className="lg:w-6 sm:w-5 w-4 items-center" />
          <h1 className="ml-2 titel2 items-center">Ganti Profile</h1>
        </button>
        <div className="mt-4 text-center">
          <h2 className="titel1-bold">{userProfile.name}</h2>
          <div className="flex sm:flex-col flex-row sm:items-center sm:justify-center mt-2 gap-1 space-x-2 sm:space-x-0">
            <p className="mb-2 sm:mb-0 titel2">{userProfile.phone}</p>
            <p className="mb-2 sm:mb-0 sm:ml-4 titel2">{userProfile.email}</p>
          </div>
        </div>
      </div>

      <AvatarModal
        open={showAvatarModal}
        onClose={() => {
          setShowAvatarModal(false);
          setIsLoading(false);
        }}
      >
        <h1 className="titel1-bold">Tentukan foto profile kamu</h1>

        <div className="container grid grid-cols-3 justify-center items-center xl:-ml-2 lg:-ml-10 md:-ml-16 xl:scale-100 lg:scale-90 md:scale-75 gap-32 lg:gap-0 xl:my-6 lg:my-5 md:-my-3">
          <div className="h-full flex">
            <input
              type="radio"
              name="avatarSelect"
              id="radio-form-image1"
              value={"https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-1.png?alt=media"}
              className="opacity-0"
              disabled={isLoading}
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
              <h1 className={`titel2 text-center group-hover:underline ${selectedImage === "https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-1.png?alt=media" && "underline"}`}>Laki-laki</h1>
            </label>
          </div>
          <div className="h-full flex">
            <input
              type="radio"
              name="avatarSelect"
              id="radio-form-image2"
              value={"https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-2.png?alt=media"}
              className="opacity-0"
              disabled={isLoading}
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
              <h1 className={`titel2 text-center group-hover:underline ${selectedImage === "https://firebasestorage.googleapis.com/v0/b/jabaraya-test.appspot.com/o/avatars%2Fdefault-avatar-2.png?alt=media" && "underline"}`}>Perempuan</h1>
            </label>
          </div>
          <div className="w-max h-full flex flex-col justify-between group xl:ml-8 lg:ml-9 md:ml-5">
            <div className="w-1/2">
              <input type="file" name="avatarSelect" id="radio-form-image3" className="opacity-0" onChange={handleFileChange} disabled={isLoading} />
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

        <div className="mb-2">
          {errors &&
            errors.avatarImage &&
            errors.avatarImage.map((error, index) => (
              <small key={index} className="text-red-600">
                {error}
              </small>
            ))}
        </div>

        <button disabled={isLoading} type="button" className="btn btn-light w-full text-body-bold text-white bg-jabarayaColors-700 p-2 rounded-[10px] hover:bg-jabarayaColors-800 transition" onClick={(e) => handleSubmitChangeAvatar(e)}>
          {isLoading ? <div className="border-gray-300 lg:h-6 lg:w-6 w-4 h-4 animate-spin rounded-full border-2 border-t-white mx-auto my-0.5" /> : "Simpan Profile"}
        </button>
      </AvatarModal>
    </>
  );
};

const ProfileChangePassword = () => {
  const [currPassword, setCurrPassword] = useState("");
  const [currPasswordConfirmation, setCurrPasswordConfirmation] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      current_password: currPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation,
    };
    axiosClient
      .post(`/user/change-password`, payload)
      .then((res) => {
        if (res.data.statusCode === 200 || res.data.statusCode === 201) {
          setNewPassword("");
          setNewPasswordConfirmation("");
          setCurrPassword("");
          setCurrPasswordConfirmation("");
          setErrors(null);
          toast.success(res.data.message);
          setIsChangePasswordOpen(false);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response.data.statusCode === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors(null);
            toast.error(response.data?.message);
          }
        } else {
          toast.error("Something went wrong!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="w-full jbDropShadow rounded-lg md:p-6 p-4 transition-all">
        <div className="flex justify-between items-center transition-all">
          <div className="flex justify-between items-center md:gap-3 gap-2 cursor-pointer" onClick={() => setIsChangePasswordOpen(!isChangePasswordOpen)}>
            <img src={lock} alt="Icon" className="lg:w-7 sm:w-6 w-5 flex justify-end" />
            <h1 className="titel2">Ganti Password</h1>
          </div>
          <img
            src={iconMiniArrow}
            alt="Arrow"
            className={`cursor-pointer lg:w-9 md:w-8 sm:w-7 w-6 md:px-2 md:py-3 px-1.5 py-2.5 bg-white jbDropShadow rounded-lg transition-all duration-500 ${isChangePasswordOpen ? "" : "rotate-180"}`}
            onClick={() => setIsChangePasswordOpen(!isChangePasswordOpen)}
          />
        </div>

        {isChangePasswordOpen && (
          <form className={`mt-5 flex flex-col md:gap-4 gap-3`} method="post" onSubmit={(e) => handleSubmitChangePassword(e)}>
            <div className="flex flex-col lg:gap-3 sm:gap-2.5 gap-2">
              <h2 className="titel1-bold">Password Lama</h2>
              <div className="col-span-2 sm:col-span-1 flex jbDropShadow gap-3 items-center justify-between rounded-lg py-1 px-4">
                <input
                  id="input-currPassword"
                  type="password"
                  className="text-[#595959] bg-transparent placeholder:text-body font-sans placeholder:font-Urbanist rounded-lg border-none outline-none focus:ring-0 focus:border-none focus:outline-none w-full sm:py-2.5 py-2 px-1"
                  value={currPassword}
                  onChange={(e) => setCurrPassword(e.target.value)}
                  placeholder="Masukkan password lama"
                  disabled={isLoading}
                  required
                />
              </div>
              {errors &&
                errors.current_password &&
                errors.current_password.map((error, index) => (
                  <small key={index} className="text-red-600">
                    {error}
                  </small>
                ))}
            </div>
            <div className="flex flex-col lg:gap-3 sm:gap-2.5 gap-2">
              <h2 className="titel1-bold">Buat Password Baru</h2>
              <div className="col-span-2 sm:col-span-1 flex jbDropShadow gap-3 items-center justify-between rounded-lg py-1 px-4">
                <input
                  id="input-newPassword"
                  type="password"
                  className="text-[#595959] bg-transparent placeholder:text-body font-sans placeholder:font-Urbanist rounded-lg border-none outline-none focus:ring-0 focus:border-none focus:outline-none w-full sm:py-2.5 py-2 px-1"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Buat Password Baru"
                  disabled={isLoading}
                  required
                />
              </div>
              {errors &&
                errors.current_password &&
                errors.current_password.map((error, index) => (
                  <small key={index} className="text-red-600">
                    {error}
                  </small>
                ))}
            </div>
            <div className="flex flex-col lg:gap-3 sm:gap-2.5 gap-2">
              <h2 className="titel1-bold">Konfirmasi Password Baru</h2>
              <div className="col-span-2 sm:col-span-1 flex jbDropShadow gap-3 items-center justify-between rounded-lg py-1 px-4">
                <input
                  id="input-newPasswordConfirmation"
                  type="password"
                  className="text-[#595959] bg-transparent placeholder:text-body font-sans placeholder:font-Urbanist rounded-lg border-none outline-none focus:ring-0 focus:border-none focus:outline-none w-full sm:py-2.5 py-2 px-1"
                  value={newPasswordConfirmation}
                  onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                  placeholder="Konfirmasi Password Baru"
                  disabled={isLoading}
                  required
                />
              </div>
              {errors &&
                errors.new_password_confirmation &&
                errors.new_password_confirmation.map((error, index) => (
                  <small key={index} className="text-red-600">
                    {error}
                  </small>
                ))}
            </div>
            <button type="submit" disabled={isLoading} className="flex flex-row w-max bg-white hover:bg-slate-50 transition jbDropShadow gap-3 items-center justify-center rounded-md py-2 px-4 titel2 mt-2">
              {isLoading ? <div className="border-gray-300 lg:h-6 lg:w-6 w-4 h-4 animate-spin rounded-full border-2 border-t-white xl:mx-10 lg:mx-8 md:mx-6 sm:mx-5 mx-4 my-0.5" /> : "Simpan Data"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};
