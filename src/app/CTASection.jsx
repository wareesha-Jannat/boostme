import React from "react";
import CTAButtons from "./CTAButtons";

const CTASection = () => {
  return (
    <section className=" flex flex-col items-center justify-center text-white gap-4 py-16 px-3">
      {/* Heading */}
      <h2 className="text-fluid-lg font-bold mb-4 text-center">
        Ready to Boost Your Favorite Creators?
      </h2>

      {/* Subtext */}
      <p className="text-fluid-md mb-8 text-blue-100 text-center">
        Join BoostMe today to support amazing talent or showcase your own
        creations.
      </p>

      {/* Buttons */}
      <CTAButtons />
    </section>
  );
};

export default CTASection;
