const SkeletonLoading = () => {
  return (
    <section className="grid w-full grid-cols-2 gap-8 p-4 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
  {Array.from({ length: 12 }).map((_, index) => (
    <div key={index} className="w-full h-72 sm:h-full relative overflow-hidden text-center aspect-[9/16] bg-gray-200 animate-pulse rounded-sm">
      <div className="absolute bottom-0 z-20 w-full h-auto pt-2 bg-gradient-to-t from-gray-300 to-transparent">
        <div className="w-3/4 h-4 mx-auto mb-2 bg-gray-400 rounded-sm"></div>
        <div className="w-1/2 h-3 mx-auto bg-gray-400 rounded-sm"></div>
      </div>
    </div>
  ))}
</section>

  )
}

export default SkeletonLoading