import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://motocare.appstick.com.bd";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/mc-portal",
          "/mc-portal/*",
          "/vehicles",
          "/vehicles/*",
          "/maintenance",
          "/maintenance/*",
          "/fuel",
          "/fuel/*",
          "/expenses",
          "/expenses/*",
          "/documents",
          "/documents/*",
          "/payments",
          "/payments/*",
          "/users",
          "/users/*",
          "/settings",
          "/settings/*",
          "/api/*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
