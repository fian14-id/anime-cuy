import { page_content } from "@/libs/setting-app";
import Link from "next/link";

const Footer = () => {
  const thisYear = new Date().getFullYear()
  return (
    <footer className="flex flex-col items-center justify-center w-full gap-4 px-4 py-4 mt-8">
      {/* <h3 className="text-sm md:text-base">
        Made with 🧡 by{" "}
        <Link
          href={page_content ? page_content.main_web : "/"}
          target="_blank"
          className="font-semibold text-palette-accent"
        >
          {page_content ? page_content.developed_by : "..."}
        </Link>
      </h3> */}
      <p className="text-xs md:text-sm text-palette-secondary/50">Copyright &copy; <time dateTime={thisYear}>{thisYear}</time> - All right reserved by {page_content ? page_content.developed_by : "Allifian"}</p>
    </footer>
  );
};

export default Footer;
