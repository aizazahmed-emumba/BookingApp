import React from "react";
import ClipBoardImg from "../../assets/ClipBoardImg";

type Props = {
  location: string;
};

const TourNotFound: React.FC<Props> = ({ location }) => {
  return (
    <div className="min-h-screen  flex  gap-5 justify-center items-center">
      <div className="flex flex-col justify-center items-center  md:w-1/2 gap-10">
        <ClipBoardImg />
        <h1 className="md:text-[2vw] text-[4vws] font-bold text-center leading-relaxed text-[#797C9A]">
          Sorry, We didn’t found any tour right now at “{location}”
        </h1>
      </div>
    </div>
  );
};

export default TourNotFound;
