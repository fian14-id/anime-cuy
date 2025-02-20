import { page_content } from "@/libs/setting-app";
import TransitionsLink from "./TransitionsLink";

const Footer = () => {
  const thisYear = new Date().getFullYear()
  return (
    <footer className="flex flex-col items-center justify-center w-full gap-4 px-4 py-4 mt-8">
      <h3>
        Made with 🧡 by{" "}
        <TransitionsLink
          href={page_content ? page_content.main_web : "/"}
          target="_blank"
          className="font-semibold text-palette-accent"
        >
          {page_content ? page_content.developed_by : "..."}
        </TransitionsLink>
      </h3>
      <p className="text-sm text-palette-secondary/50">Copyright &copy; <time dateTime={thisYear}>{thisYear}</time> - All right reserved by {page_content ? page_content.developed_by : "Allifian"}</p>
    </footer>
  );
};

export default Footer;
