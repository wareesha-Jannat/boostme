import React from "react";

const WhyBoostMe = () => {
  return (
    <section className="text-white py-26 flex flex-col items-center justify-center gap-18 ">
      {/* Why BoostMe Section */}

      <div className=" mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-fluid-lg font-bold mb-4">
          Why <span className="text-purple-400 ">BoostMe</span>
        </h2>
        <p className="opacity-80 mb-12 max-w-2xl mx-auto">
          A platform built to empower creators and delight supporters.
        </p>

        {/* Benefit Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="text-purple-400 text-5xl">⚡</div>
            <h3 className="text-xl font-semibold">Instant Support</h3>
            <p className="text-sm opacity-75">
              Boost creators instantly with one tap — no waiting, no complicated
              forms.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="text-purple-400 text-5xl">🎨</div>
            <h3 className="text-xl font-semibold">Made for Creators</h3>
            <p className="text-sm opacity-75">
              Simple setup, customizable profiles, and transparent earnings
              tracking.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="text-purple-400 text-5xl">🌍</div>
            <h3 className="text-xl font-semibold">Global Reach</h3>
            <p className="text-sm opacity-75">
              Fans from anywhere in the world can support you securely.
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="text-purple-400 text-5xl">🔒</div>
            <h3 className="text-xl font-semibold">Secure & Transparent</h3>
            <p className="text-sm opacity-75">
              All payments are encrypted and fees are clearly shown.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBoostMe;
