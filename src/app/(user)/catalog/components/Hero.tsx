import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full h-full">
      <Image
        src="https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Koi & Butterfly Koi"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}