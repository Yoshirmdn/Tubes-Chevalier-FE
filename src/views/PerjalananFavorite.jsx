import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axios/axios";
import MapsView from "../components/MapsView";
import Loading from "../components/Loading";
import imageOffice from "../assets/images/image-office.png";
import iconLocation from "../assets/icons/icon-location.svg";
import iconCalendar from "../assets/icons/icon-calendar.svg";
import iconRoad from "../assets/icons/icon-road.svg";
import iconStar from "../assets/icons/icon-star.png";
import iconMoneyBag from "../assets/icons/icon-moneyBagClear.png";
import iconCar from "../assets/icons/icon-car.svg";
import iconMotorcycle from "../assets/icons/icon-motorcycle.svg";
import iconBus from "../assets/icons/icon-bus.svg";
import iconPlane from "../assets/icons/icon-plane.svg";
import iconTrain from "../assets/icons/icon-train.svg";
import iconMiniArrow from "../assets/icons/icon-miniArrow.svg";
import iconTrash from "../assets/icons/icon-trash.svg";
import iconEdit from "../assets/icons/icon-edit.svg";
import iconPaper from "../assets/icons/icon-paper.png";
import AddDestinationModal from "../components/AddDestinationModal";
import toast from "react-hot-toast";

export default function PerjalananFavorite() {
  const navigate = useNavigate();
  const { travelPlanId } = useParams();
  const [isModalDestinationOpen, setIsModalDestinationOpen] = useState(false);
  const [travelPlan, setTravelPlan] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [destinations, setDestinations] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [isComponentLoading, setIsComponentloading] = useState(false);
  const [isDestinationLoading, setIsDestinationLoading] = useState(false);

  useEffect(() => {
    getTravelPlanData();
  }, []);

  const getTravelPlanData = async () => {
    setIsComponentloading(true);
    axiosClient
      .get(`/travel-plans/${travelPlanId}`)
      .then(async (res) => {
        if (res.data && (res.data.statusCode === 201 || res.data.statusCode === 200)) {
          setTravelPlan(res.data.data);
          setStartLocation(res.data.data.start_location);
          setDestinations(res.data.data.destinations);
        } else if (res.data && res.data.statusCode === 404) {
          toast.error(res.data.message);
          navigate("/404");
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.statusCode === 422) {
          toast.error(err.response.message);
        } else if (err.response && err.response.data && err.response.data.statusCode === 404) {
          toast.error(err.response.data.message);
          navigate("/404");
        } else {
          console.error(err);
          toast.error("Failed to fetch travel plan");
        }
      })
      .finally(() => {
        setIsloading(false);
        setIsComponentloading(false);
      });
  };

  const handleAddDestinationSubmit = (e, data) => {
    e.preventDefault();
    setIsDestinationLoading(true);

    const destinationPayload = {
      startAt: data.startAt,
      endAt: data.endAt,
      vehicle: data.vehicle,
      financialTransportation: data.financialRecords.total === 0 ? 0 : data.financialRecords.transportation,
      financialLodging: data.financialRecords.total === 0 ? 0 : data.financialRecords.lodging,
      financialConsumption: data.financialRecords.total === 0 ? 0 : data.financialRecords.consumption,
      financialEmergencyFund: data.financialRecords.total === 0 ? 0 : data.financialRecords.emergencyFund,
      financialSouvenir: data.financialRecords.total === 0 ? 0 : data.financialRecords.souvenir,
      financialTotal: data.financialRecords.total,
      locationName: data.detailLocation.name,
      locationPlaceId: data.detailLocation.place_id,
      locationAddress: data.detailLocation.address,
      locationLng: data.detailLocation.location.lng,
      locationLat: data.detailLocation.location.lat,
    };

    axiosClient
      .post(`/travel-plans/${travelPlanId}/destinations`, destinationPayload)
      .then((res) => {
        if (res.data.statusCode === 200 || res.data.statusCode === 201) {
          toast.success(res.data.message);

          getTravelPlanData();
          setIsModalDestinationOpen(false);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response.data?.statusCode === 422) {
          toast.error(response.data?.message);
        } else {
          toast.error(response.data?.message);
        }
      })
      .finally(() => {
        setIsDestinationLoading(false);
      });
  };

  const handleCloseModalDestinationOpen = () => {
    setIsModalDestinationOpen(false);
  };

  return (
    <>
      {!isLoading && (
        <>
          <section className="min-h-screen mb-20">
            <div className="lg:flex ">
              <div className="lg:w-2/3 xl:w-[68%] w-full">
                <div className="flex flex-col justify-center items-center">
                  {/* bg image */}
                  <div className="bg-gray-600 w-full">
                    <img src={imageOffice} alt="Background Office" className="w-full object-cover object-center md:h-44 sm:h-40 h-32" />
                  </div>

                  <TravelRecapCard travelPlan={travelPlan} />
                </div>

                <div className="flex justify-between items-center mt-[-5rem] mx-4 sm:mx-6 md:mx-8">
                  <h4 className="titel1-bold">Wisata Kamu</h4>
                  <button type="button" onClick={() => setIsModalDestinationOpen(true)} className="flex items-center gap-2 jbDropShadow rounded-md p-2 md:p-2.5 bg-white hover:bg-slate-50 transition">
                    <span className="material-symbols-outlined text-[1.2rem] md:text-[1.8rem]">add_circle</span>
                    <p className="text-body">Tambah Destinasi Wisata</p>
                  </button>
                </div>

                <div className="mt-4 mx-4 sm:mx-6 md:mx-8">
                  {!isComponentLoading &&
                    destinations &&
                    destinations.length > 0 &&
                    destinations.map((destination, index) => {
                      let distance = 0;
                      if (index === 0) {
                        distance = calculateHaversineDistance(startLocation, destination.detail_location);
                      } else {
                        distance = calculateHaversineDistance(destinations[index - 1].detail_location, destination.detail_location);
                      }
                      return <TravelDestinationCard destination={destination} key={index} distance={distance} getTravelPlanData={getTravelPlanData} />;
                    })}
                  {isComponentLoading && <h4 className="text-caption">Loading destinations data...</h4>}
                  {!isComponentLoading && (!destinations || (destinations && destinations.length === 0)) && <h4 className="text-caption">No destination data</h4>}
                </div>
              </div>

              {/* MAPS */}
              <div className="fixed h-screen lg:w-1/3 xl:w-[32%] top-0 right-0 hidden lg:block">
                <MapsView />
              </div>
            </div>
          </section>
          {isModalDestinationOpen && <AddDestinationModal isOpen={isModalDestinationOpen} onClose={handleCloseModalDestinationOpen} handleSubmit={handleAddDestinationSubmit} isLoading={isDestinationLoading} />}
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
}

const TravelRecapCard = ({ travelPlan }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    setIsLoading(true);
    axiosClient
      .get("/user")
      .then((res) => {
        setUserProfile(res.data.data.user);
      })
      .catch((err) => {
        const response = err.response;
        console.error(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {!isLoading && (
        <div className="w-full px-6 sm:px-20 md:px-28 lg:px-24 relative overfow top-[-95px] lg:top-[-120px] flex justify-center items-center">
          <div className="xl:w-4/5 w-full h-auto jbDropShadow bg-white rounded-md relative md:p-5 p-4">
            <h3 className="titel1-bold break-all">{travelPlan.name}</h3>
            <div className="flex justify-between gap-4 md:gap-3 items-center md:mt-2 p-2 md:px-4">
              <div className="flex items-center w-auto py-2 px-3 jbDropShadow md:py-2.5 md:px-3 gap-1.5 lg:gap-2.5 rounded-md md:justify-between md:gap-2">
                <img src={iconLocation} alt="Location" className="w-5 md:w-6 lg:w-7" />
                <p className="titel2">{travelPlan.start_location.name}</p>
              </div>

              <p className="titel2-bold">Sampai</p>

              <div className="flex items-center w-auto py-2 px-3 jbDropShadow md:py-2.5 md:px-3 gap-1.5 rounded-md md:justify-between md:gap-2 lg:gap-2.5">
                <img src={iconLocation} alt="Location" className="w-5 md:w-6 lg:w-7" />
                <p className="titel2">{travelPlan.destinations.length > 0 ? travelPlan.destinations[travelPlan.destinations.length - 1].detail_location.name : "-"}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:gap-3.5 mt-1 md:mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-2">
                  <img src={iconCalendar} alt="Calendar" className="w-5 md:w-6 lg:w-7" />
                  <p className="text-body">{travelPlan.destinations.length > 0 ? formatDateRange(travelPlan.startAt, travelPlan.endAt) : "-"}</p>
                </div>
                <div>
                  <img src={userProfile.avatar} alt="Jabaraya Maskot" className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover object-center" />
                </div>
              </div>

              <div className="grid grid-cols-3 justify-between gap-1.5">
                <div className="flex items-center justify-start gap-1.5">
                  <img src={iconMoneyBag} alt="Money" className="w-5 md:w-6 lg:w-7" />
                  <p className="text-body text-wrap break-all">{travelPlan.destinations.length > 0 ? toRupiah(travelPlan.estimation) : "-"}</p>
                </div>

                <div className="flex items-center justify-center gap-1.5">
                  <img src={iconRoad} alt="Road" className="w-5 md:w-6 lg:w-7" />
                  <p className="text-body text-wrap break-all">{travelPlan.destinations.length > 0 ? `${Math.trunc(travelPlan.totalDistance)} KM` : "-"} </p>
                </div>

                <div className="flex items-center justify-end gap-1.5">
                  <img src={iconCalendar} alt="Calendar" className="w-5 md:w-6 lg:w-7" />
                  <p className="text-body text-wrap break-all">{travelPlan.destinations.length > 0 ? calculateDaysBetweenDates(travelPlan.startAt, travelPlan.endAt) : "-"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="w-full px-6 sm:px-20 md:px-28 lg:px-24 relative overfow top-[-95px] lg:top-[-120px] flex justify-center items-center">
          <div className="xl:w-4/5 w-full h-auto jbDropShadow bg-white rounded-md relative md:p-5 p-4">
            <div className="rounded-lg w-24 h-4 md:h-5 bg-slate-200 animate-pulse"></div>
            <div className="rounded-lg w-full mt-3 h-5 md:h-7 bg-slate-200 animate-pulse"></div>
            <div className="flex justify-between items-center gap-3">
              <div className="rounded-lg w-32 mt-3 h-6 md:h-8 bg-slate-200 animate-pulse"></div>
              <div className="rounded-full w-10 h-10 md:h-12 md:w-12 mt-3 bg-slate-200 animate-pulse"></div>
            </div>
            <div className="rounded-lg w-full mt-3 h-4 md:h-8 bg-slate-200 animate-pulse"></div>
          </div>
        </div>
      )}
    </>
  );
};

const TravelDestinationCard = ({ destination, distance, getTravelPlanData }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRecomendation, setIsLoadingRecomendation] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [note, setNote] = useState(destination.note ? destination.note : "");
  const [isDestinationLoading, setIsDestinationLoading] = useState(false);
  const [placeRecomendations, setPlaceRecomendations] = useState(null);

  useEffect(() => {
    if (!placeRecomendations && isExpand) {
      setIsLoadingRecomendation(true);
      const payload = {
        locationLat: destination.detail_location.lat,
        locationLng: destination.detail_location.lng,
      };

      axiosClient
        .post(`/proxy/recomendation-places`, payload, {
          headers: {
            "X-HTTP-Method-Override": "GET",
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200 || res.data.statusCode === 201) {
            setPlaceRecomendations(res.data.data);
          } else {
            toast.error("Something went wrong!");
          }
        })
        .catch((err) => {
          const response = err.response;
          if (response.data.statusCode === 422) {
            if (response.data.errors) {
              toast.error(response.data?.message);
            } else {
              toast.error(response.data?.message);
            }
          } else {
            toast.error("Something went wrong!");
          }
        })
        .finally(() => {
          setIsLoadingRecomendation(false);
        });
    }
  }, [isExpand]);

  const handleDeleteDestination = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const promise = axiosClient
      .delete(`/travel-plans/${destination.travel_plan_id}/destinations/${destination.id}`)
      .then((res) => {
        if (res.data?.statusCode === 200) {
          getTravelPlanData();
        } else {
          toast.error("Failed to delete Travel Plan");
        }
      })
      .catch((err) => {
        const response = err.response;
        console.error(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
    toast.promise(promise, {
      loading: "Loading...",
      success: "Destination delete successfully",
      error: "Something went wrong!",
    });
  };

  const handleUpdateNoteSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    toast.loading("Loading...");

    const payload = {
      note: note ? (note.length > 0 ? note : "") : "",
    };

    axiosClient
      .post(`/travel-plans/${destination.travel_plan_id}/destinations/${destination.id}`, payload, {
        headers: {
          "X-HTTP-Method-Override": "PUT",
        },
      })
      .then((res) => {
        toast.dismiss();
        if (res.data.statusCode === 200 || res.data.statusCode === 201) {
          toast.success("Note has been updated");
          getTravelPlanData();
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        const response = err.response;
        toast.dismiss();
        if (response.data.statusCode === 422) {
          if (response.data.errors) {
            toast.error(response.data?.message);
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

  const handleEditDestinationSubmit = (e, data) => {
    e.preventDefault();

    setIsDestinationLoading(true);
    toast.loading("Loading...");

    const destinationPayload = {
      startAt: data.startAt,
      endAt: data.endAt,
      vehicle: data.vehicle,
      financialTransportation: data.financialRecords.total === 0 ? 0 : data.financialRecords.transportation,
      financialLodging: data.financialRecords.total === 0 ? 0 : data.financialRecords.lodging,
      financialConsumption: data.financialRecords.total === 0 ? 0 : data.financialRecords.consumption,
      financialEmergencyFund: data.financialRecords.total === 0 ? 0 : data.financialRecords.emergencyFund,
      financialSouvenir: data.financialRecords.total === 0 ? 0 : data.financialRecords.souvenir,
      financialTotal: data.financialRecords.total,
      locationName: data.detailLocation.name,
      locationPlaceId: data.detailLocation.place_id,
      locationAddress: data.detailLocation.address,
      locationLng: data.detailLocation.lng,
      locationLat: data.detailLocation.lat,
    };

    axiosClient
      .post(`/travel-plans/${destination.travel_plan_id}/destinations/${destination.id}`, destinationPayload, {
        headers: {
          "X-HTTP-Method-Override": "PUT",
        },
      })
      .then((res) => {
        toast.dismiss();
        if (res.data.statusCode === 200 || res.data.statusCode === 201) {
          toast.success("Destination has been updated");
          getTravelPlanData();
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        toast.dismiss();
        const response = err.response;
        if (response.data.statusCode === 422) {
          if (response.data.errors) {
            toast.error(response.data?.message);
          } else {
            toast.error(response.data?.message);
          }
        } else {
          toast.error("Something went wrong!");
        }
      })
      .finally(() => {
        setIsDestinationLoading(false);
      });
  };

  const handleCloseModalDestinationOpen = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="xl:p-4 lg:p-3.5 md:p-3 p-2.5 mt-4 jbDropShadow rounded-md transition-all duration-300">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-[10px] titel2-bold">{destination.detail_location.name}</h1>
          <button type="button" onClick={() => setIsExpand(!isExpand)} className="flex items-center bg-white hover:bg-slate-50 transition justify-center gap-2 md:gap-3 rounded-md jbDropShadow px-3 py-2 md:px-3.5 md:py-2.5">
            <img src={iconMiniArrow} alt="Arrow" className={`cursor-pointer xl:w-6 md:w-5 sm:w-4 w-3.5 transition-all duration-500 ${isExpand ? "" : "rotate-180"}`} />
            <p className="text-caption">Detail Perjalanan</p>
          </button>
        </div>

        {isExpand && <h3 className="text-body-bold mt-2">Estimasi Perjalanan</h3>}
        <div className="grid grid-cols-[1fr,1fr,1fr,1fr] w-full items-center jbDropShadow rounded-md mt-3 py-2 md:py-4 relative">
          <div className="flex flex-col h-full gap-1 justify-between pt-2 items-center border-r-[1px] border-[#A1A1A1] px-1.5 lg:px-2">
            <img src={iconMoneyBag} alt="Money" className="w-5 sm:w-6 md:w-7 lg:w-8" />
            <p className="text-body justify-self-end break-all">{toRupiah(destination.financial_record.total)}</p>
          </div>
          <div className="flex flex-col h-full gap-1 justify-between pt-2 items-center border-r-[1px] border-[#A1A1A1]">
            <img
              src={
                destination.vehicle === "car"
                  ? iconCar
                  : destination.vehicle === "motorcycle"
                  ? iconMotorcycle
                  : destination.vehicle === "bus"
                  ? iconBus
                  : destination.vehicle === "plane"
                  ? iconPlane
                  : destination.vehicle === "train"
                  ? iconTrain
                  : iconCar
              }
              alt="Vehicle"
              className="w-4 sm:w-5 md:w-6"
            />
            <p className="text-body justify-self-end">
              {destination.vehicle === "car"
                ? "Mobil"
                : destination.vehicle === "motorcycle"
                ? "Sepeda Motor"
                : destination.vehicle === "bus"
                ? "Bus"
                : destination.vehicle === "plane"
                ? "Pesawat"
                : destination.vehicle === "train"
                ? "Kereta"
                : "-"}
            </p>
          </div>
          <div className="flex flex-col h-full gap-1 justify-between pt-2 items-center border-r-[1px] border-[#A1A1A1]">
            <img src={iconRoad} alt="Road" className="w-3.5 sm:w-4 md:w-5 lg:w-6" />
            <p className="text-body justify-self-end">{Math.trunc(distance)} Km</p>
          </div>
          <div className="flex flex-col h-full gap-1 justify-between pt-2 items-center">
            <img src={iconCalendar} alt="Calendar" className="w-3.5 sm:w-4 md:w-5 lg:w-6" />
            <p className="text-body justify-self-end">{calculateDaysBetweenDates(destination.startAt, destination.endAt)}</p>
          </div>
        </div>

        {isExpand && (
          <>
            {isExpand && <h3 className="text-body-bold mt-3 md:mt-4">Rekomendasi Tempat</h3>}
            <div className="mt-3 md:mt-4">
              {isLoadingRecomendation && <h1 className="text-caption">Loading...</h1>}
              {!isLoadingRecomendation && placeRecomendations && placeRecomendations.length === 0 && <h1 className="text-caption">No recomendation data</h1>}
              {!isLoadingRecomendation && placeRecomendations && placeRecomendations.length > 0 && (
                <>
                  <div className="w-full grid grid-cols-3 place-content-between p-1 gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3">
                    {placeRecomendations &&
                      placeRecomendations.map((placeRecomendation, index) => {
                        return (
                          <div className="flex flex-col gap-1 md:gap-2 justify-between jbDropShadow rounded-md p-1 md:p-2 h-full" key={index}>
                            <div className="flex flex-col gap-1 md:gap-2">
                              <img src={placeRecomendation.thumbnail} alt={"thumbnail"} className="w-full object-center object-cover h-20 sm:h-24 md:h-36 lg:h-40 rounded-md" />
                              <h1 className="text-caption-bold">{placeRecomendation.name}</h1>
                              <div className="flex flex-row gap-2.5 items-center">
                                <img src={iconStar} alt="rating" className="w-3.5 sm:w-4 md:w-5 lg:w-6 h-auto" />
                                <p className="text-caption">{placeRecomendation.rating ? placeRecomendation.rating : "-"}</p>
                              </div>
                              <div className="flex flex-row gap-2.5 items-center">
                                <img src={iconRoad} alt="distance" className="w-3.5 sm:w-4 md:w-5 lg:w-6 h-auto" />
                                <p className="text-caption">
                                  {Math.trunc(calculateHaversineDistance({ lat: destination.detail_location.lat, lng: destination.detail_location.lng }, { lat: placeRecomendation.lat, lng: placeRecomendation.lng }, "m"))} M
                                </p>
                              </div>
                            </div>

                            <a href={placeRecomendation.maps_link} target="_blank" className="text-caption text-white w-full text-center py-2 rounded-lg bg-[#3C90E8] hover:bg-[#3c8fe8e3] transition place-self-end">
                              Cek tempat
                            </a>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {isExpand && (
          <>
            <form className="mt-3 flex flex-col gap-3 md:gap-4" method="post" onSubmit={(e) => handleUpdateNoteSubmit(e)}>
              {isExpand && (
                <label htmlFor="input-destination-note" className="text-body-bold">
                  Note
                </label>
              )}
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={isLoading}
                placeholder="List catatan jalan-jalan kamu disini!"
                className="bg-[#E7E7E7] px-4 py-2.5 md:py-3 lg:py-3.5 rounded-xl outline-none border-none text-caption focus:border-none focus:outline-none focus:ring-1 focus:ring-[#838383] placeholder:text-[#8E8E8E] text-black"
              />
              <button
                type="submit"
                className="place-self-end flex flex-row gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-5 justify-between items-center py-1.5 px-3 sm:py-2 sm:px-3.5 bg-white hover:bg-slate-50 transition rounded-md w-max jbDropShadow mt-1 md:mt-2"
                disabled={isLoading}
              >
                <img src={iconPaper} alt="Save" className="w-3.5 sm:w-4 md:w-5 lg:w-6" />
                <p className="text-caption">Simpan</p>
              </button>
            </form>
          </>
        )}

        <div className="w-full flex gap-3 md:gap-6 items-center mt-4">
          <button onClick={(e) => handleDeleteDestination(e)} type="button" disabled={isLoading} className="jbDropShadow p-2 px-3 rounded-md flex items-center justify-center gap-2 bg-white hover:bg-slate-50 transition">
            <img src={iconTrash} alt="Delete" className="w-3.5 sm:w-4 md:w-5 lg:w-6" />
            <p className="text-caption">Hapus perjalanan</p>
          </button>
          <button onClick={() => setIsEditModalOpen(true)} type="button" disabled={isLoading} className="jbDropShadow p-2 px-3 rounded-md flex items-center justify-center gap-2 bg-white hover:bg-slate-50 transition">
            <img src={iconEdit} alt="Edit" className="w-3.5 sm:w-4 md:w-5 lg:w-6" />
            <p className="text-caption">Edit Perjalananmu!</p>
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <AddDestinationModal isOpen={isEditModalOpen} onClose={handleCloseModalDestinationOpen} handleSubmit={handleEditDestinationSubmit} isLoading={isDestinationLoading} placeholder={"Edit Perjalanan"} initialValue={destination} />
      )}
    </>
  );
};

function formatDateRange(startDate, endDate) {
  const options = { year: "numeric", month: "long", day: "numeric" };

  const formattedStartDate = new Date(startDate).toLocaleDateString("id-ID", options);
  const formattedEndDate = new Date(endDate).toLocaleDateString("id-ID", options);

  return `${formattedStartDate} - ${formattedEndDate}`;
}

const toRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

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

const calculateHaversineDistance = (coords1, coords2, type = "km") => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = type === "km" ? 6371 : 6371e3;
  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);
  const deltaLat = toRad(coords2.lat - coords1.lat);
  const deltaLng = toRad(coords2.lng - coords1.lng);

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};
