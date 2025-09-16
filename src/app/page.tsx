import Image from "next/image";
import google_logo from "@/shared/assets/google_logo.svg";

export default function Home() {
  return (
    <div className="flex w-[100vw] h-[100vh] relative pl-10 py-10 bg-white">
      <div className="basis-1/2 h-[90vh] bg-brand-main rounded-[12px]"></div>
      <div className="basis-1/2 flex flex-col items-center justify-center">
        <h1 className="text-[4rem] font-semibold mb-31">로그인</h1>
        <button className="flex justify-center items-center w-1/2 py-5 px-15 gap-5 bg-white border border-300 rounded-[36px]" type="submit">
          <Image src={google_logo} alt="logo" width={28} height={28} />
          <span className="text-[1.25rem] font-roboto">Google계정으로 로그인</span>
        </button>
      </div>
    </div>
  );
}
