import React from "react";
import Navbar from "./komponen/navbar";
import kelinci from "../assets/img-beranda/berita1.png";

export default function PerjalananFavorite() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen">
        <div className="grid grid-cols-[1fr,500px] ">
          {/* BAG 1 */}
          <div className="w-full ">
            <div className="bg-gray-600 w-full h-[200px]"></div>
            {/* KOTAK  */}
            <div className="w-[550px] h-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white rounded-md mx-auto overfow top-[-130px] relative py-6 px-5">
              <h3 className="titel2-bold ">Perjalanan Bulan Juli!</h3>
              {/* SECT 1 */}
              <div className="flex justify-between items-center mt-[14px] p-2 px-4 ">
                <div className="flex items-center  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-3 rounded-md justify-between gap-2">
                  <span class="material-symbols-outlined">location_on</span>
                  <p className="text-caption-bold">Tangerang</p>
                </div>
                <p className="text-caption-bold">Sampai</p>
                <div className="flex items-center  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-3 rounded-md justify-between gap-2">
                  <span class="material-symbols-outlined">location_on</span>
                  <p className="text-caption-bold">Paris Van Java</p>
                </div>
              </div>
              {/* SEC 2 */}
              <div className="flex items-center justify-between mt-[1rem] ">
                <div className="flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined">calendar_today</span>
                  <p className="font-medium">1 jul - 10 jul 2004</p>
                </div>
                <div>
                  <img
                    src={kelinci}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full "
                  />
                </div>
              </div>
              {/* SEC 3 */}
              <div className="flex items-center justify-between mt-[1.3rem]">
                <div className="flex items-center justify-center gap-1">
                  <span class="material-symbols-outlined">calendar_today</span>
                  <p className="font-medium">Rp. 2.000.000</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span class="material-symbols-outlined">calendar_today</span>
                  <p className="font-medium">120 KM</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span class="material-symbols-outlined">calendar_today</span>
                  <p className="font-medium">5 Hari</p>
                </div>
              </div>
            </div>
            {/* BAG 2*/}
            <div className="w-full flex justify-between items-center px-[2rem] mt-[-5rem]">
              <h4 className="header5-bold text-[1rem]">Wisata Kamu </h4>
              <button className="flex items-center gap-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg px-3 py-4 ">
                <span class="material-symbols-outlined text-[2.2rem]">
                  add_circle
                </span>
                <p className="font-medium text-xl">Tambah Destinasi Wisata</p>
              </button>
            </div>
            {/* BAG 3 */}
            <div className="mt-4 px-[2rem]">
              <div className="p-3 mt-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl titel2-bold">Lembang</h1>
                  <div className="flex items-center justify-center gap-2 p-3 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                    <span class="material-symbols-outlined">
                      keyboard_arrow_down
                    </span>
                    <p>Detail Perjalanan</p>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr,1fr,1fr,1fr] w-full px-10 items-center p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-md mt-4 py-4">
                  <div className="flex flex-col gap-1 justify-center items-center border-r-[1px] border-black">
                    {" "}
                    <span class="material-symbols-outlined text-3xl">
                      local_atm
                    </span>
                    <p className="font-medium">Rp. 1.000.000</p>
                  </div>
                  <div className="flex flex-col gap-1 justify-center items-center border-r-[1px] border-black">
                    {" "}
                    <span class="material-symbols-outlined text-3xl">
                      directions_car
                    </span>
                    <p className="font-medium">Mobil</p>
                  </div>
                  <div className="flex flex-col gap-1 justify-center items-center border-r-[1px] border-black">
                    <span class="material-symbols-outlined text-3xl">road</span>
                    <p className="font-medium">120 Km</p>
                  </div>
                  <div className="flex flex-col gap-1 justify-center items-center">
                    {" "}
                    <span class="material-symbols-outlined text-3xl">
                      calendar_month
                    </span>
                    <p className="font-medium">5 Hari</p>
                  </div>
                </div>
                <div className="w-full flex gap-6 items-center mt-4">
                  <button className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-2 px-3 rounded-md flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined">delete</span>
                    <p className="text-caption">Hapus perjalanan</p>
                  </button>
                  <button className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-2 px-3 rounded-md flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined">edit_square</span>
                    <p className="text-caption">Edit Perjalananmu!</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MAPS */}
          <aside className="bg-slate-500 h-[40rem]">
            <p className="text-center my-auto">MAPS </p>
          </aside>
        </div>
      </section>
    </>
  );
}
