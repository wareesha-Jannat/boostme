import Image from "next/image";
import React from "react";

const PasswordInput = ({ id }) => {
  const [showSecret, setShowSecret] = useState(false);

  const toggleSecret = () => {
    setShowSecret(!showSecret);
  };
  return (
    <>
      <div className="relative flex  ">
        <input
          id={id}
          type={showSecret ? "text" : "password"}
          className="form-input pe-10 w-full"
          {...register(name)}
        />
        <button
          type="button"
          onClick={toggleSecret}
          className=" absolute -translate-y-1/2 right-5 top-1/2 transform  "
        >
          <Image
            src={showSecret ? "/eye-off.png" : "/eye.png"}
            alt="Toggle visibility"
            height={20}
            width={20}
          />
        </button>
      </div>
    </>
  );
};

export default PasswordInput;
