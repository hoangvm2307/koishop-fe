"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import KoiFishList from "./components/KoiFishList";
import Hero from "./components/Hero";
import CustomerBenefits from "./components/CustomerBenefits";

export default function Home() {
  return (
    <>
      <div className="h-[calc(100vh-4rem)]">
        <Hero />
      </div>

      <div className="py-8">
        <CustomerBenefits />
      </div>
      <div className="py-8 px-12">
        <KoiFishList />
      </div>
    </>
  );
}
