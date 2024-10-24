import Image from "next/image";
import Link from "next/link";

const items = [
  { src: "https://images.pexels.com/photos/2131828/pexels-photo-2131828.jpeg", alt: "Koi & Butterfly Koi", text: "KOI & BUTTERFLY KOI", link: "/catalog" },
  { src: "https://images.pexels.com/photos/1699204/pexels-photo-1699204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "New Jumbo Koi", text: "NEW! JUMBO KOI", link: "/catalog/jumbo-koi" },
  { src: "https://images.pexels.com/photos/10820109/pexels-photo-10820109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Featured Fish", text: "FEATURED FISH", link: "/catalog/featured" },
  { src: "https://cdn0497.cdn4s.com/media/fish/n026-8.png", alt: "Shop Pearlscale Goldfish", text: "ASAGI KOI FISH", link: "/catalog/asagi-koi" },
  { src: "https://images.pexels.com/photos/13093376/pexels-photo-13093376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Shop Goldfish", text: "KI UTSURI KOI", link: "/catalog/ki-utsuri-koi" },
];

export default function Hero() {
  return (
    <div className="grid grid-cols-4 gap-2 h-full">
      {/* Left large image */}
      <Link href={items[0].link} className="col-span-2 relative overflow-hidden group block">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75">
          <Image
            src={items[0].src}
            alt={items[0].alt}
            layout="fill"
            objectFit="cover"
            className="transition-all duration-500 group-hover:brightness-75"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold bg-black bg-opacity-30 transition-opacity duration-500 opacity-100">
          {items[0].text}
        </div>
      </Link>

      {/* Right images with text */}
      <div className="grid grid-cols-2 grid-rows-2 gap-2 col-span-2">
        {items.slice(1).map((item, index) => (
          <Link key={index} href={item.link} className="relative overflow-hidden group block">
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75">
              <Image
                src={item.src}
                alt={item.alt}
                layout="fill"
                objectFit="cover"
                className="transition-all duration-500 group-hover:brightness-75"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-black bg-opacity-30 transition-opacity duration-500 opacity-100">
              {item.text}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}