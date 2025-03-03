import { page_content } from "@/libs/setting-app";

export const metadata = {
  metadataBase: new URL(page_content?.url_web),
  title: page_content.name_page,
  description: page_content.description,
  openGraph: {
    title: page_content.name_page,
    description: page_content.description,
    images: ["/images/nexanime-img.png"]
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["dev@fianity.com", "fianity.com"],
    },
  },
};