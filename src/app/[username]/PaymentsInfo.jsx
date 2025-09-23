"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PaymentsInfo = ({ userId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["payment-info", userId],
    queryFn: async () => {
      const res = await fetch(`/api/user/payments/${userId}/paymentsInfo`);
      if (!res.ok) throw new Error("Failed to fetch Payment Info");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto" />
      </>
    );
  }
  if (isError) {
    return (
      <>
        <p className="text-sm  text-slate-400">{error.message}</p>
      </>
    );
  }

  return (
    <>
      <p className="text-sm  text-slate-400">
        {data.totalPayments || 0} Payments. Amount Raised Rs.
        {data.totalAmount || 0}
      </p>
    </>
  );
};

export default PaymentsInfo;
