import { useRouter } from "next/navigation";
import { useGetLikes } from "@/features/likes/model/useGetLikes";
import { useSaveLikes } from "@/features/likes/model/useSaveLikes";
import Arrow from "@/shared/assets/arrow";
import Star from "@/shared/assets/star";
import X from "@/shared/assets/x";

export const Modal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (value: boolean) => void;
}) => {
  const { data: likes } = useGetLikes({});
  const { mutate: saveLikes } = useSaveLikes();
  const router = useRouter();

  return (
    <div
      role="listbox"
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col w-1/2 h-1/2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className="flex justify-between">
          <p className="font-bold">즐겨찾기 목록</p>
          <X
            className="w-4 h-4 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex items-center justify-center border border-b-0 border-black/20 w-1/2 p-2 rounded-tl-xl bg-brand-bg overflow-hidden">
            <p>단어</p>
          </div>
          <ul className="flex flex-col flex-1 gap-2 border border-black/20 p-4 rounded-xl rounded-tl-none overflow-y-auto">
            {likes?.map((like) => (
              <article
                key={like.targetId}
                className="flex gap-4 p-4 rounded-xl border border-black/20"
              >
                <div className="flex-1 flex flex-col">
                  <p className="font-bold text-xl line-clamp-1">{like.word}</p>
                  <p className="line-clamp-2">{like.description}</p>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <Star
                    color={like.liked === true ? "#FFD63A" : "none"}
                    className="cursor-pointer"
                    onClick={() => {
                      saveLikes({ targetId: like.targetId });
                    }}
                  />
                  <div className="flex items-center cursor-pointer">
                    <p
                      className="text-[#fb923c]"
                      onClick={() =>
                        router.push(`/dictionary?word=${like.word}`)
                      }
                    >
                      보러가기
                    </p>
                    <Arrow />
                  </div>
                </div>
              </article>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
