import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { page_content } from "@/lib/setting-app";

export default function Unauthorized() {
  const [pageContent, setPageContent] = useState([]);
  useEffect(() => {
    localStorage.setItem("savedContent", JSON.stringify(page_content));
    const savedPageContent = localStorage.getItem("savedContent");
    if (savedPageContent) setPageContent(JSON.parse(savedPageContent));
  }, [])
  return (
    <main className="grid min-h-screen place-items-center">
      <Image src={pageContent?.assets?.status_code_img?.not_auth} alt="401" width={500} height={500} />
      <Link
        href="/login"
        className="px-4 py-2 text-xl font-medium transition-all duration-300 ease-in-out border-b-2 border-l-2 text-palette-secondary border-palette-secondary hover:border-b-4 hover:px-8"
      >
        ogin
      </Link>
    </main>
  );
}
