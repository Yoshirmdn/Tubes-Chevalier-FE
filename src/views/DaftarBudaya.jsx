import React from "react";
import Navbar from "./komponen/navbar";
import berita1 from "../assets/img-beranda/berita1.png";

export default function DaftarBudaya() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen mb-10">
        <h2 className="font-semibold header5 text-center mt-16">
          Budaya di Bandung Raya
        </h2>
        <div class="h-10 text-center w-full flex justify-center items-center relative mt-3">
          <div class="relative w-8 h-8 bg-[#D9D9D9] after:after-content after:w-[165px] after:h-[1px] after:bg-[#D9D9D9] after:absolute after:top-[50%] after:left-12 before:after-content before:w-[165px] before:h-[1px] before:bg-[#D9D9D9] before:absolute before:top-[50%] before:right-12"></div>
        </div>
        <div className="mx-44 relative mt-5">
          <div className="flex  items-center gap-2 relative after:after-content after:min-w-[80%] after:h-[1px] after:left-[16.5%] after:absolute after:bg-[#D9D9D9]">
            <div className="w-3 h-3 bg-[#D9D9D9] rounded-full"></div>
            <p className="text-body-bold">Budaya dari Bandung</p>
          </div>
        </div>
        <div
          id="DaftarBudaya"
          className="h-auto bg-white flex md:mx-20 justify-center items-center mt-3"
        >
          <div className="flex flex-wrap justify-center items-start gap-5">
            {/* CONTAINER ARTIKEL */}
            {/* Container 1 */}

            <div className=" bg-slate-50 shadow-md rounded-lg h-[360px] w-[310px] p-2">
              <div>
                <h1 className="font-semibold text-2xl p-2">Tari di Bandung</h1>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <img
                  src={berita1}
                  alt=""
                  className=" object-cover  rounded-md"
                />
                <div className="flex justify-between items-center w-full mt-4"></div>
                <button className="w-full rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-2 py-3 flex justify-center items-center mt-4">
                  <p className="font-medium ">Lihat lebih banyak</p>
                </button>
              </div>
            </div>

            {/* Container 2 */}
            <div className=" bg-slate-50 shadow-md rounded-lg h-[360px] w-[310px] p-2">
              <div>
                <h1 className="font-semibold text-2xl p-2">
                  Wayang di Bandung
                </h1>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <img
                  src={berita1}
                  alt=""
                  className=" object-cover  rounded-md"
                />
                <div className="flex justify-between items-center w-full mt-4"></div>
                <button className="w-full rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-2 py-3 flex justify-center items-center mt-4">
                  <p className="font-medium ">Lihat lebih banyak</p>
                </button>
              </div>
            </div>

            {/* Container 3 */}
            <div className=" bg-slate-50 shadow-md rounded-lg h-[360px] w-[310px] p-2">
              <div>
                <h1 className="font-semibold text-2xl p-2">
                  Kuliner di Bandung
                </h1>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <img
                  src={berita1}
                  alt=""
                  className=" object-cover  rounded-md"
                />
                <div className="flex justify-between items-center w-full mt-4"></div>
                <button className="w-full rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-2 py-3 flex justify-center items-center mt-4">
                  <p className="font-medium ">Lihat lebih banyak</p>
                </button>
              </div>
            </div>

            {/* Container 4 */}
            <div className="bg-slate-50 shadow-md rounded-lg h-[360px] w-[310px] p-2">
              <div>
                <h1 className="font-semibold text-2xl p-2">Musik di Bandung</h1>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={berita1} alt="" className="object-cover rounded-md" />
                <div className="flex justify-between items-center w-full mt-4"></div>
                <button className="w-full rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-2 py-3 flex justify-center items-center mt-4">
                  <p className="font-medium">Lihat lebih banyak</p>
                </button>
              </div>
            </div>

            {/* Container 5 */}
            <div className="bg-slate-50 shadow-md rounded-lg h-[360px] w-[310px] p-2">
              <div>
                <h1 className="font-semibold text-2xl p-2">
                  Alat Musik di Bandung
                </h1>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={berita1} alt="" className="object-cover rounded-md" />
                <div className="flex justify-between items-center w-full mt-4"></div>
                <button className="w-full rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-2 py-3 flex justify-center items-center mt-4">
                  <p className="font-medium">Lihat lebih banyak</p>
                </button>
              </div>
            </div>

            {/* Container 6 */}
            <div className="bg-slate-50 shadow-md rounded-lg h-[360px] w-[310px] p-2">
              <div>
                <h1 className="font-semibold text-2xl p-2">
                  {" "}
                  Senjata Adat di Bandung
                </h1>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={berita1} alt="" className="object-cover rounded-md" />
                <div className="flex justify-between items-center w-full mt-4"></div>
                <button className="w-full rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-2 py-3 flex justify-center items-center mt-4">
                  <p className="font-medium">Lihat lebih banyak</p>
                </button>
              </div>
            </div>

            {/* Container 7 */}

            <div className="bg-slate-50 shadow-md rounded-lg h-[360px] w-[310px] p-2">
              <div>
                <h1 className="font-semibold text-2xl p-2">
                  Rumah Adat di Bandung
                </h1>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={berita1} alt="" className="object-cover rounded-md" />
                <div className="flex justify-between items-center w-full mt-4"></div>
                <button className="w-full rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-2 py-3 flex justify-center items-center mt-4">
                  <p className="font-medium">Lihat lebih banyak</p>
                </button>
              </div>
            </div>

            {/* Container 8 */}
            <div
              className="bg-slate-50 shadow-md rounded-lg h-[360px] w-[310px]
            p-2"
            >
              <div>
                <h1 className="font-semibold text-2xl p-2">
                  Museum di Bandung
                </h1>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={berita1} alt="" className="object-cover rounded-md" />
                <div className="flex justify-between items-center w-full mt-4"></div>
                <button className="w-full rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-2 py-3 flex justify-center items-center mt-4">
                  <p className="font-medium">Lihat lebih banyak</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
