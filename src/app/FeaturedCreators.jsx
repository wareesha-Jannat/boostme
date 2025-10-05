import Image from "next/image";
import ReadMore from "@/components/ReadMore";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const FeaturedCreators = ({ creators }) => {
  return (
    <section className="text-white py-16 flex flex-col items-center gap-8">
      <h3 className="text-3xl font-bold">Featured Creators</h3>

      <div className="flex items-center justify-center flex-wrap gap-12 w-full  p-4">
        {creators.map((creator) => (
          <div
            key={creator._id}
            className="bg-gray-900 rounded-2xl shadow-md hover:shadow-lg p-5 flex flex-col items-center text-center  w-[280px] h-[280px] gap-2 hover:scale-105 duration-300 transition-transform"
          >
            <Image
              src={creator.profilepic || "/avatar-placeholder.png"}
              alt={creator.username}
              width={80}
              height={80}
              className="rounded-full mb-3"
            />
            <h4 className="text-lg font-semibold">{creator.username}</h4>
            <div>
              <ReadMore text={creator.bio || "No bio yet"} maxLength={80} />
            </div>
            <a
              href={`/${creator.username}`}
              target="_blank"
              className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm font-medium self-start mt-auto"
            >
              {" "}
              View Profile <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCreators;
