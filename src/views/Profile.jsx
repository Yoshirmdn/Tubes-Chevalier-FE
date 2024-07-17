import React from "react";
import Navbar from "./komponen/navbar";

export default function Profile() {
  return (
    <>
      <Navbar />
      {/* container 1 */}
      <section className="mt-10 mx-[13rem]">
        <div className="p-4 py-8 rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] flex justify-start items-center">
          <div className="rounded-full w-[150px] h-[150px]">
            <img
              src="https://randomuser.me/api/portraits/lego/2.jpg"
              alt="profile"
              className="w-32 h-32 mx-auto rounded-full ring-4"
            />
          </div>
          <div className="ml-5 h-auto flex flex-col  ">
            <h2 className="titel2-bold text-xl">Nama</h2>
            <h3 className="text-caption">Nomor Telepon</h3>
            <h3 className="mb-1 text-caption">Email</h3>
            <a
              href=""
              className="p-2 border border-gray-200 text-[13px] rounded-md font-semibold shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] flex justify-center items-center gap-2"
            >
              <span class="material-symbols-outlined">settings</span>
              Pengaturan & Edit Profile
            </a>
          </div>
        </div>
        {/* CONTAINER 2 */}
        <div className="mt-6 ">
          <h1 className="font-bold text-3xl">Daftar Perjalanan</h1>
          <div className="p-3 mt-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg">
            <h1 className="text-2xl titel2-bold">
              Perjalanan seru bulan Juli!
            </h1>
            <div className="flex w-full justify-between px-10 items-center relative p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-md mt-4 py-4">
              <span class="material-symbols-outlined text-3xl">local_atm</span>

              <span class="material-symbols-outlined text-3xl">
                directions_car
              </span>
              <span class="material-symbols-outlined text-3xl">road</span>
              <span class="material-symbols-outlined text-3xl">
                calendar_month
              </span>
            </div>
            <div className="w-full flex justify-between items-center mt-4">
              <button className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-2 px-3 rounded-md flex items-center justify-center gap-2">
                <span class="material-symbols-outlined">delete</span>
                <p>Hapus perjalanan</p>
              </button>
              <button className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-2 px-3 rounded-md">
                <p>Lihat Perjalananmu!</p>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 ">
          <div className="p-3 mt-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg">
            <h1 className="text-2xl titel2-bold">
              Rencana trip bulan September!
            </h1>
            <div className="flex w-full justify-between px-10 items-center p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-md mt-4 py-4">
              <span class="material-symbols-outlined text-3xl">local_atm</span>
              <span class="material-symbols-outlined text-3xl">
                directions_car
              </span>
              <span class="material-symbols-outlined text-3xl">road</span>
              <span class="material-symbols-outlined text-3xl">
                calendar_month
              </span>
            </div>
            <div className="w-full flex justify-between items-center mt-4">
              <button className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-2 px-3 rounded-md flex items-center justify-center gap-2">
                <span class="material-symbols-outlined">delete</span>
                <p className="text-caption">Hapus perjalanan</p>
              </button>
              <button className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-2 px-3 rounded-md">
                <p className="text-caption">Lihat Perjalananmu!</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
