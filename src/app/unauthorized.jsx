import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Unauthorized() {
  const [pageContent, setPageContent] = useState([]);
  useEffect(() => {
    localStorage.setItem("savedContent", JSON.stringify(page_content));
    const savedPageContent = localStorage.getItem("savedContent");
    if (savedPageContent) setPageContent(JSON.parse(savedPageContent));
  }, [])
  return (
    <main className="grid place-items-center min-h-screen">
      <Image src={pageContent?.assets?.status_code_img?.not_auth} alt="401" width={500} height={500} />
      <Link
        href="/login"
        className="px-4 py-2 text-palette-secondary border-l-2 border-palette-secondary border-b-2 hover:border-b-4 hover:px-8 transition-all ease-in-out duration-300 font-medium text-xl"
      >
        ogin
      </Link>
    </main>
  );
}
