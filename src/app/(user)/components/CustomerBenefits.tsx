import { Calendar, Heart, Truck } from "lucide-react";

export default function CustomerBenefits() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Overnight Shipping */}
      <div className="p-4 py-10 bg-[#F0F0F0] grid grid-cols-3 gap-4 items-center">
        <div className="flex justify-center items-center">
          <Truck size={"3rem"} strokeWidth={"1.5px"} className="text-[#8BB9BF]" />
        </div>
        <div className="col-span-2">
          <h2 className="text-xl font-semibold text-primary">OVERNIGHT SHIPPING</h2>
          <ul className="list-disc ml-5">
            <li className="text-sm">Directly to Your Front Door</li>
            <li className="text-sm">Flat-Rates as low as $30</li>
            <li className="text-sm">Unlimited Combined Shipping</li>
          </ul>
        </div>
      </div>

      {/* Pick Your Delivery Date */}
      <div className="p-4 py-10 bg-[#F0F0F0] grid grid-cols-3 gap-4 items-center">
        <div className="flex justify-center items-center">
          <Calendar size={"3rem"} strokeWidth={"1.5px"} className="text-[#8BB9BF]" />
        </div>{" "}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold text-primary">PICK YOUR DELIVERY DATE</h2>
          <ul className="list-disc ml-5">
            <li className="text-sm">Choose your delivery date at checkout</li>
            <li className="text-sm">Pick the day that is best for your schedule</li>
          </ul>
        </div>
      </div>

      {/* 14-Day Worry-Free Guarantee */}
      <div className="p-4 py-10 bg-[#F0F0F0] grid grid-cols-3 gap-4 items-center">
        <div className="flex justify-center items-center">
          <Heart size={"3rem"} strokeWidth={"1.5px"} className="text-[#8BB9BF]" />
        </div>{" "}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold text-primary">14-DAY WORRY-FREE GUARANTEE</h2>
          <p className="text-sm">
            We offer an industry-leading 14-Day Worry-Free Guarantee to ensure that you can shop with
            peace of mind, knowing that you will always be covered.
          </p>
        </div>
      </div>
    </div>
  );
}
