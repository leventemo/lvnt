export const SITE = {
  website: "https://lvnt.info/", // replace this with your deployed domain
  author: "Leventemo",
  profile: "",
  desc: "A personal blog.",
  title: "lvnt",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 3,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Budapest", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
