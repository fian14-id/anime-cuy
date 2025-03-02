const Button = ({ children, className, ...props }) => {
  return <button {...props} className={`${className} px-6 py-2 mt-4 transition-all duration-300 ease-in-out shadow-md rounded-md hover:rounded-none bg-palette-accent w-fit text-palette-primary`}>{children}</button>
}

export default Button