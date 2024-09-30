import Image from "next/image";

export default async function Hero() {
  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      {/* Left large image */}
      <div className="col-span-2 relative">
        <Image
          src="https://images.pexels.com/photos/2131828/pexels-photo-2131828.jpeg"
          alt="Koi & Butterfly Koi"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold bg-black bg-opacity-30">
          KOI & BUTTERFLY KOI
        </div>
      </div>

      {/* Right images with text */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 col-span-2">
        <div className="relative">
          <Image
            src="https://images.pexels.com/photos/1699204/pexels-photo-1699204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="New Jumbo Koi"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-black bg-opacity-30">
            NEW! JUMBO KOI
          </div>
        </div>
        <div className="relative">
          <Image
            src="https://images.pexels.com/photos/10820109/pexels-photo-10820109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Featured Fish"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-black bg-opacity-30">
            FEATURED FISH
          </div>
        </div>
        <div className="relative">
          <Image
            src="https://cdn0497.cdn4s.com/media/fish/n026-8.png"
            alt="Shop Pearlscale Goldfish"
            layout="fill"
            className="w-full h-full"
            objectFit="cover"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-black bg-opacity-30">
            ASAGI KOI FISH
          </div>
        </div>
        <div className="relative">
          <Image
            src="https://images.pexels.com/photos/13093376/pexels-photo-13093376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Shop Goldfish"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-black bg-opacity-30">
            KI UTSURI KOI
          </div>
        </div>
      </div>
    </div>
  );
}
