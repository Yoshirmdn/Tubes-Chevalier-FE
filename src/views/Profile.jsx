import React, { useEffect, useState } from "react";
import Navbar from "./komponen/navbar";
import axiosClient from "../api/axios/axios";
import Loading from "../components/Loading";
import tropical from "../assets/img-beranda/tropical.png";
import money from "../assets/img-beranda/money.png";
import iconCar from "../assets/icons/icon-car.svg";
import iconMotorcycle from "../assets/icons/icon-motorcycle.svg";
import iconBus from "../assets/icons/icon-bus.svg";
import iconPlane from "../assets/icons/icon-plane.svg";
import iconTrain from "../assets/icons/icon-train.svg";
import jalan from "../assets/img-beranda/jalan.png";
import jam from "../assets/img-beranda/jam.png";
import iconSettings from "../assets/icons/icon-settings.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [travelPlans, setTravelPlans] = useState(null);

  useEffect(() => {
    getProfileData();
    getTravelPlans();
  }, []);

  const getTravelPlans = () => {
    setIsLoading(true);

    axiosClient
      .get(`/travel-plans`)
      .then((res) => {
        if (res.data) {
          setTravelPlans(res.data.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        const response = err.response;
        console.error(response);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
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
        console.log(response);
      });
  };

  return (
    <>
      {userProfile ? (
        <section className="mt-16 sm:mt-28 xl:px-20 lg:px-16 sm:px-14 pb-20">
          <main className="flex flex-col items-center justify-center ">
            <div className="px-6 py-8 flex-col md:flex-row w-full sm:rounded-xl sm:jbDropShadow shadow-[0px_2px_2px_1px_rgba(0,0,0,0.10)] flex justify-start items-center md:gap-5 gap-1">
              <div className="rounded-full flex justify-center items-center">
                <img src={`${userProfile.avatar}`} alt="profile" className="lg:w-32 lg:h-32 md:w-28 md:h-28 sm:w-24 sm:h-24 w-32 h-32 mx-auto rounded-full object-cover object-center" />
              </div>
              <div className="h-auto flex flex-col md:text-start text-center gap-2">
                <h2 className="titel1-bold text-xl">{userProfile.name}</h2>
                <span className="flex items-center justify-start gap-4">
                  <h3 className="titel2">{userProfile.phone ? userProfile.phone : ""}</h3>
                  <h3 className="mb-1 titel2">{userProfile.email}</h3>
                </span>

                <button type="button" onClick={() => navigate("/profile/settings")} className="p-2 rounded-md font-semibold flex justify-center items-center gap-2 jbDropShadow hover:bg-slate-50 transition">
                  <img src={iconSettings} alt="Settings Icon" className="lg:w-7 sm:w-6 w-5" />
                  <h3 className="text-body">Pengaturan & Edit Profile</h3>
                </button>
              </div>
            </div>
            <div className="md:mt-8 mt-6 w-full px-4 sm:px-0">
              <h1 className="titel1-bold text-start md:mb-8 mb-4">Daftar Perjalanan</h1>

              {isLoading && <h4 className="text-caption">Loading travel data...</h4>}

              {!isLoading && travelPlans && travelPlans.length > 0 && (
                <div className="flex flex-col gap-5 md:gap-8">
                  {travelPlans.map((travelPlan, index) => {
                    return <TravelCard key={index} travelPlan={travelPlan} getTravelPlans={getTravelPlans} />;
                  })}
                </div>
              )}

              {!isLoading && (!travelPlans || (travelPlans && travelPlans.length === 0)) && <h4 className="text-caption">No data travel has been added yet</h4>}
            </div>
          </main>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}

const TravelCard = ({ travelPlan, getTravelPlans }) => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState("-");
  const [duration, setDuration] = useState("-");
  const [isLoading, setIsLoading] = useState(false);
  const destinations = travelPlan.destinations;

  useEffect(() => {
    function calculateDaysBetweenDates(date1, date2) {
      const startDate = new Date(date1);
      const endDate = new Date(date2);

      const timeDifference = endDate - startDate;

      let dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      if (dayDifference === 0) {
        dayDifference = 1;
      }

      return `${dayDifference} Hari`;
    }

    if (destinations.length > 0) {
      let vehicleData = [];
      destinations.map((destination) => {
        vehicleData.push(destination.vehicle);
      });

      let uniqueArray = [...new Set(vehicleData)];
      uniqueArray = uniqueArray.map((item) => item.charAt(0).toUpperCase() + item.slice(1));

      setVehicles(uniqueArray.join(", ") + ".");
      setDuration(calculateDaysBetweenDates(travelPlan.startAt, travelPlan.endAt));
    }
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    axiosClient
      .delete(`/travel-plans/${id}`)
      .then((res) => {
        if (res.data?.statusCode === 200) {
          toast.success(res.data?.message);
          getTravelPlans();
        } else {
          toast.error("Failed to delete Travel Plan");
        }
      })
      .catch((err) => {
        const response = err.response;
        toast.error("Failed to delete Travel Plan");
        console.error(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-[#2F70B5] jbDropShadow rounded-xl p-4">
      <div className="flex gap-3 text-white items-center">
        <img src={tropical} alt="" className="w-[30px] h-[30px] " />
        <h3 className="font-semibold  text-[16px] md:text-xl">{travelPlan.name}</h3>
      </div>
      <div>
        <div className="grid md:grid-cols-4 grid-cols-2 mt-5 gap-2 md:gap-5">
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg flex-1">
            <img src={money} alt="" className="h-[20px] w-[20px] " />
            <p className=" text-[12px] md:text-[15px] font-semibold text-[#1C426B] ">{toRupiah(travelPlan.estimation)}</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg flex-1">
            <img
              src={
                destinations.length > 0
                  ? destinations[0].vehicle === "car"
                    ? iconCar
                    : destinations[0].vehicle === "motorcycle"
                    ? iconMotorcycle
                    : destinations[0].vehicle === "bus"
                    ? iconBus
                    : destinations[0].vehicle === "plane"
                    ? iconPlane
                    : destinations[0].vehicle === "train"
                    ? iconTrain
                    : iconCar
                  : iconCar
              }
              alt="Vehicle"
              className="h-[20px] w-[20px] icon-blue-color"
            />
            <p className=" text-[12px] md:text-[15px] font-semibold text-[#1C426B] capitalize">{vehicles}</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg flex-1">
            <img src={jalan} alt="" className="h-[20px] w-[20px] " />
            <p className=" text-[12px] md:text-[15px] font-semibold text-[#1C426B]">{Math.trunc(travelPlan.totalDistance)} KM</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg flex-1">
            <img src={jam} alt="" className="h-[20px] w-[20px] " />
            <p className=" text-[12px] md:text-[15px] font-semibold text-[#1C426B] ">{duration}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5 text-white">
          <h1 className="font-medium text-[12px] md:text-[20px] text-nowrap">{travelPlan.start_location.name}</h1>
          <div className="w-full h-[1px] flex items-center ml-3">
            <span className="w-full border-b-[2px] border-dotted border-white h-[1px] "></span>
            <span className="material-symbols-outlined ">chevron_right</span>
          </div>
          <h1 className="font-medium text-[12px] md:text-[20px] text-nowrap">{travelPlan.destinations.length > 0 ? travelPlan.destinations[travelPlan.destinations.length - 1].detail_location.name : ""}</h1>
        </div>

        <div className="flex gap-2 items-center justify-center mt-4">
          <button
            type="button"
            className="text-[#1C426B] flex justify-center p-2 md:p-3 flex-1 bg-white rounded-lg hover:bg-slate-200 transition font-semibold text-[12px] md:text-xl "
            onClick={() => navigate(`/perjalananfavorite/${travelPlan.id}`)}
            disabled={isLoading}
          >
            Lihat rencana Perjalanan
          </button>
          <button
            type="button"
            className="bg-transparent rounded-lg md:rounded-xl transition-all group"
            onClick={(e) => {
              handleDelete(e, travelPlan.id);
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="border-gray-300 lg:h-6 lg:w-6 w-4 h-4 animate-spin rounded-full border-2 border-t-white m-2 md:my-3" />
            ) : (
              <span className="material-symbols-outlined border text-[16px] p-2 md:text-[1.7rem] text-white border-white group-hover:bg-slate-50 transition group-hover:text-jabarayaColors-900 rounded-lg md:rounded-xl md:py-3 md:px-[15px]">
                delete
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const toRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
