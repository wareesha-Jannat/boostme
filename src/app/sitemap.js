import { getUsers } from "@/lib/utils";

export default async function sitemap() {
  const baseUrl = "https://boostme-henna.vercel.app/";

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
    },
  ];

  const { profiles, success } = await getUsers();

  if (!success) {
    return staticRoutes;
  }

  const userRoutes = profiles.map((user) => ({
    url: `${baseUrl}/${user.username}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...userRoutes];
}
