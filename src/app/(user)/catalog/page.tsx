import Hero from "./components/Hero";
import Breadcrumb from "./components/Breadcrumb";
import KoiFishList from "../components/KoiFishList";
import SortResultsBar from "./components/SortResultsBar";
import FilterSidebar from "./components/FilterSidebar";

export default function Catalog() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-slate-100 p-2 shadow-md">
        <Breadcrumb items={[{ name: "Catalog", href: "/catalog" }]} />
      </header>
      <main className="flex-grow flex flex-col">
        <section className="h-[70vh] relative">
          <Hero />
        </section>
        <section className="bg-white p-10 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <FilterSidebar />
            </div>
            <div className="md:col-span-3">
              <SortResultsBar />
              <KoiFishList />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
