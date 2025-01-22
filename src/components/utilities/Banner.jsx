import React from 'react';

const Banner = ({ 
  title, 
  subtitle,
  image,
  children,
  className = "",
  variant = "default" // default, minimal, gradient, image
}) => {
  const variants = {
    default: "bg-indigo-600",
    minimal: "bg-gray-50 border-b",
    gradient: "bg-gradient-to-r from-indigo-600 to-purple-600",
    image: "bg-gray-900 relative overflow-hidden"
  };

  const textColors = {
    default: "text-white",
    minimal: "text-gray-900",
    gradient: "text-white",
    image: "text-white relative z-10"
  };

  return (
    <div className={`w-full ${variants[variant]} ${className}`}>
      {variant === "image" && image && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/50 z-[1]" /> {/* Overlay */}
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover brightness-50"
          />
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12">
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