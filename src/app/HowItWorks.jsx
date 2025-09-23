import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <section className="text-white py-16 flex flex-col items-center justify-center gap-8">
      <div className=" mx-auto px-6 text-center">
        <h2 className="text-fluid-lg font-bold mb-10">
          How <span className="text-purple-400">it</span> Works
        </h2>

        <div className="grid gap-12 md:grid-cols-3">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Image
              src="/find-creator.png"
              alt="Find Creators"
              height={130}
              width={130}
            />
            <h3 className="text-xl font-semibold">1. Find Creators</h3>
            <p className="text-sm opacity-80 max-w-[250px]">
              Discover your favorite creators and explore their profiles.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Image
              src="/send-boost.png"
              alt="Send Boost"
              height={130}
              width={130}
            />
            <h3 className="text-xl font-semibold">2. Send a Boost</h3>
            <p className="text-sm opacity-80 max-w-[250px]">
              Support them instantly with a small boost — it&apos;s quick &
              easy.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Image
              src="/support.png"
              alt="Get Supported"
              height={130}
              width={130}
            />
            <h3 className="text-xl font-semibold">3. Creators Get Supported</h3>
            <p className="text-sm opacity-80 max-w-[250px]">
              Your boost fuels their creativity and helps them grow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
