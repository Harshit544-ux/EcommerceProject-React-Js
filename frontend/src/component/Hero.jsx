import { assets } from "../assets/assets"

function Hero() {

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 min-h-[400px] sm:min-h-[500px] mx-4 sm:mx-6 lg:mx-12">

      {/* Hero left side */}
      <div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 h-[2px] md:w-11 bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR SELLERS</p>
          </div>
          <h1 className="prata-regular  text-3xl sm:py-3 lg:text-5xl leading-relaxed">Latest Arrivals</h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 h-[2px] md:w-11 bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero right side */}
      <img src={assets.hero_img} alt="Hero" className="w-full sm:w-1/2 h-[300px] sm:h-auto object-cover object-top" />
    </div>

  )
}

export default Hero