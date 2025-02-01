export const page_content = {
    name_page: "NexAnime",
    logo_app: "/favicon.ico",
    description: "This is an anime information website similar to MyAnimeList, but built with Next.js to provide a modern and fast user experience.",
    developed_by: "Fianity",
    social_media: [
        {
            name: "WhatsApp",
            link: "https://bit.ly/FianityChat",
            icon: "./whatsapp.svg",
        },
        {
            name: "Github",
            link: "https://github.com/fian14-id",
            icon: "./github.svg",
        },
        {
            name: "Instagram",
            link: "https://www.instagram.com/fianity_id",
            icon: "./instagram.svg",            
        },
        {
            name: "Ko-Fi",
            link: "https://ko-fi.com/fianity",
            icon: "./coffee.svg",            
        },
    ],
    assets: {
        status_code_img: {
            not_auth: "./401.svg",
            not_found: "./404.svg",
            bad_request: "./408.svg",
        }
    },
    feature: {
        search_type: [
            {
                name_type: "allType",
                label_type: "All",
                value: "all",
            },
            {
                name_type: "animeType",
                label_type: "Anime",
                value: "anime",
            },
            {
                name_type: "mangaType",
                label_type: "Manga",
                value: "manga",
            }
        ]
    }
}