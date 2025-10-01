"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PaymentForm = ({ userId }) => {
  const [paymentForm, setPaymentForm] = useState({
    name: "",
    message: "",
    amount: "",
  });

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (!paymentForm.name || !paymentForm.amount) {
      alert("Name and amount are required!");
      return;
    }
    e.preventDefault();
    let form = {
      ...paymentForm,
      toUser: userId,
    };
    try {
      const res = await fetch("/api/payfast/initiate", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error("Something went wrong while initiating payment.");
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No redirect URL received.");
      }
    } catch (error) {
      toast.error("Failed to send initiate request");
    }
  };

  return (
    <>
      <form className="space-y-7" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={paymentForm.name}
            onChange={handleChange}
            required
            placeholder="Enter name"
            className="rounded-lg border-2 border-slate-400 w-full p-3 "
          />
        </div>
        <div>
          <input
            type="text"
            name="message"
            required
            value={paymentForm.message}
            onChange={handleChange}
            placeholder="Enter message"
            className="rounded-lg border-2 border-slate-400 w-full p-3 "
          />
        </div>
        <div>
          <input
            type="text"
            name="amount"
            required
            value={paymentForm.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="rounded-lg border-2 border-slate-400 w-full p-3 "
          />
        </div>
        <button type="submit" className="btn w-full">
          Pay
        </button>
        <div className=" flex flex-wrap gap-4">
          <span
            className="bg-slate-900 w-fit p-2 rounded-lg "
            onClick={() => {
              setPaymentForm({ ...paymentForm, amount: "50" });
            }}
          >
            Pay Rs.50
          </span>
          <span
            className="bg-slate-900 w-fit p-2 rounded-lg "
            onClick={() => {
              setPaymentForm({ ...paymentForm, amount: "100" });
            }}
          >
            Pay Rs.100
          </span>{" "}
          <span
            className="bg-slate-900 w-fit p-2 rounded-lg "
            onClick={() => {
              setPaymentForm({ ...paymentForm, amount: "500" });
            }}
          >
            Pay Rs.500
          </span>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
