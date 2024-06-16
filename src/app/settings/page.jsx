"use client";

import Image from "next/image";
import profilePicture from "../../../public/profilePlaceHolder.jpg";
import { useSelector } from "react-redux";
import { format } from "date-fns";

export default function Settings() {
  const UserInfo = useSelector((state) => state.tasks.userInfo);
  console.log(UserInfo);
  console.log(UserInfo.metadata.lastLoginAt);
  return (
    <div className="container m-8">
      {/* Heading */}
      <div className="flex m-8">
        <h1 className="font-bold text-6xl font-lato text-gray-700">Settings</h1>
        <div className="container w-16 ml-3 flex items-center justify-center mt-1 text-5xl text-gray-700">
          <i class="fa-solid fa-gear"></i>
        </div>
      </div>

      <div className="container grid grid-cols-3  h-28 w-1/2 m-8">
        {/* Profile Picture */}
        <div className="">
          <Image
            alt="No Data"
            src={profilePicture}
            width="112"
            height="112"
            className=" border rounded-full w-28 h-28 mr-2 ml-16"
          ></Image>
        </div>
        {/* Info */}
        <div className=" col-span-2 p-5 pl-0 text-xl text-gray-500 ">
          <div className="flex font-lato mb-5">
            <span className="font-bold mr-2">User Name :</span>
            <span className="">{UserInfo.email}</span>
          </div>
          <div className="flex font-lato">
            <span className="font-bold mr-2">Last LogIn :</span>
            <span>
              {format(
                new Date(Number(UserInfo.metadata.lastLoginAt)),
                "dd/MM/yyyy (hh:mm:ss)"
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
