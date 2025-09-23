import { CheckPayment } from "@/lib/utils";
import Card from "./Card";

export const metaData = {
  title: "Payment Status",
};

export default async function PaymentDonePage({ searchParams }) {
  const { id, username } = await searchParams;

  const data = await CheckPayment(id);

  return <Card data={data} username={username} />;
}
