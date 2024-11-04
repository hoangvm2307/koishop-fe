"use client";
import KoiFishList from "./components/KoiFishList";
import Hero from "./components/Hero";
import CustomerBenefits from "./components/CustomerBenefits";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  return (
    <>
      <div className="h-[calc(100vh-4rem)] px-2">
        <Hero />
      </div>
      <div className="py-8">
        <CustomerBenefits />
      </div>
      <div className="py-8 px-12">
        <KoiFishList filters={{}} page={page} setPage={setPage} />
      </div>
    </>
  );
}
