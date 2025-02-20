import TransitionsLink from "../utilities/TransitionsLink";

const HeaderList = ( {getTitle, getLink, getAddText} ) => {
    return (
        <div className="flex items-center justify-between px-4 mt-4">
        <h1 className="font-bold capitalize border-b-2 border-solid border-b-palette-accent text-palette-secondary text-md sm:text-xl md:text-2xl">
          {getTitle}
        </h1>
        <TransitionsLink
          href={getLink}
          className="text-xs font-light underline text-palette-secondary hover:text-palette-accent md:text-sm"
        >
          {getAddText}
        </TransitionsLink>
      </div>
    )
}
export default HeaderList;