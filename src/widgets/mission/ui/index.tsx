    import Image from "next/image"
    import clear from "@/shared/assets/clear_mission.svg"
    import noneClear from "@/shared/assets/none_clear_mission.svg"


    export default function MissionListComponent({title, cleared}: {title: string, cleared: string}) {

        const isCleard = cleared === "1";

        return(
        <div className="flex items-center justify-between w-full py-3 border-b border-black/20">
            <span className="font-[pretendard] text-lg font-[400]">{title}</span>
            <Image src={isCleard ? clear : noneClear} alt="mission icon" width={24} height={24}/>
        </div>
        )
    }