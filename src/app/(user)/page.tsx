import Hero from "./components/Hero";
import CustomerBenefits from "./components/CustomerBenefits";
import KoiFishList from "./components/KoiFishList";

export default async function Home() {
  return (
    <div className="px-2">
      <div className="h-[calc(100vh-4rem)]">
        <Hero />
      </div>

      <div className="py-8">
        <CustomerBenefits />
      </div>
      <div className="py-8 px-44">
        <KoiFishList />
      </div>
    </div>
  );
}
