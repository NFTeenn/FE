'use client';

import { useEffect } from "react";
import Image from "next/image";
import errorImage from "@/shared/assets/error.svg";
import Sidebar from "@/widgets/sidebar";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("An error occurred:", error);
    }, [error]); 

  return (
    <>
			<Sidebar />
      <div className="flex justify-center items-center relative flex-row h-full">
          {/* 에러 메시지 띄우는 곳*/}  
          <div>
              <h2>{error.message}</h2>
          </div>

          {/*돼지 뜨는곳 */}
          <div className=" w-[31rem] h-[21rem]">
              <Image src={errorImage} alt="에러 돼지" fill/>
          </div>
      </div>
    </>
  );
}