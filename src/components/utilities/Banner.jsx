const Banner = ({ 
  title, 
  subtitle,
  image,
  children,
  className = "",
  variant = "default" // default, minimal, gradient, image
}) => {
  const variants = {
    default: "bg-palette-primary",
    minimal: "bg-gray-50 border-b",
    gradient: "bg-gradient-to-r from-indigo-600 to-purple-600",
    image: "bg-gray-900 relative overflow-hidden"
  };

  const textColors = {
    default: "text-palette-primary",
    minimal: "text-gray-900",
    gradient: "text-white",
    image: "text-white relative z-10"
  };

  return (
    <div className={`w-full ${variants[variant]} ${className}`}>
      {variant === "image" && image ? (
        <div className="absolute inset-0 w-full h-full rounded-md shadow-md">
          <div className="absolute inset-0 z-[1]" /> {/* Overlay */}
          <img 
            src={image} 
            alt={title}
            className="object-cover w-full h-full px-4 brightness-50 md:px-6 blur-sm"
          />
        </div>
      ) : (<div className="absolute inset-0 w-full h-full rounded-md shadow-md bg-palette-primary/80">
    </div>)}
      
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-8 md:px-6 sm:py-12">
          {/* Title Section */}
          <div className="text-center">
            {title && (
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${textColors[variant]}`}>
                {title}
              </h1>
            )}
            
            {subtitle && (
              <p className={`mt-2 text-sm sm:text-base ${textColors[variant]} opacity-90`}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Optional Content */}
          {children && (
            <div className={`mt-6 ${textColors[variant]}`}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;