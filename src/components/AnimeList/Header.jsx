import Link from "next/link";

const HeaderList = ( {getTitle, getLink, getAddText} ) => {
    return (
        <div className="flex items-center justify-between px-4 mt-4">
        <h1 className="font-bold border-b-2 border-dashed border-b-palette-accent  capitalize text-palette-secondary text-md sm:text-xl md:text-2xl">
          {getTitle}
        </h1>
        <Link
          href={getLink}
          className="text-xs font-light text-palette-secondary hover:text-palette-accent underline md:text-sm"
        >
          {getAddText}
        </Link>
      </div>
    )
}
export default HeaderList;