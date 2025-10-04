import { auth } from "@/lib/auth";
import { getLoggedInUser } from "@/lib/utils";
import Tabs from "./Tabs";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");

  const res = await getLoggedInUser(session.user?.id);

  if (res.success) {
    return (
      <>
        <div className="max-w-7xl mx-auto">
          <Tabs user={res.data} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-center items-center py-5">
          <p className="text-lg text-white">Error : {res.error}</p>
        </div>
      </>
    );
  }
}
