import React, { useEffect, useState } from "react";
import { ArrayFilterData, FilterData, NumericFilterData, getKoifishFilter } from "@/lib/api/koifishApi";

interface FilterSidebarProps {
  onFilterChange: (filters: Partial<FilterData>) => void;
}
export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filterData, setFilterData] = useState<FilterData | null>(null);
  const [selectedNumericFilters, setSelectedNumericFilters] = useState<Partial<NumericFilterData>>({});
  const [selectedArrayFilters, setSelectedArrayFilters] = useState<Partial<ArrayFilterData>>({});

  const handleNumericFilterChange = (key: keyof NumericFilterData, value: number) => {
    setSelectedNumericFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      onFilterChange({ ...selectedArrayFilters, ...newFilters });
      return newFilters;
    });
  };
  const handleArrayFilterChange = (key: keyof ArrayFilterData, value: string) => {
    setSelectedArrayFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[key]) newFilters[key] = [];
      const currentValues = newFilters[key] as string[];
      const index = currentValues.indexOf(value);
      if (index > -1) {
        // Nếu giá trị đã tồn tại, loại bỏ nó
        newFilters[key] = currentValues.filter(v => v !== value);
      } else {
        // Nếu giá trị chưa tồn tại, thêm nó vào
        newFilters[key] = [...currentValues, value];
      }
      onFilterChange({ ...selectedNumericFilters, ...newFilters });
      return newFilters;
    });
  };

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const data = await getKoifishFilter();
        setFilterData(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu bộ lọc:", error);
      }
    };

    fetchFilterData();
  }, []);

  if (!filterData) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-semibold border-b mb-8">FILTER PRODUCTS</h2>

      <div className="mb-6 border-b pb-8">
        <h3 className="font-semibold mb-2">FILTER BY PRICE</h3>
        <div className="flex items-center justify-between mb-2">
          <input
            type="number"
            min={filterData.minPrice}
            max={selectedNumericFilters.maxPrice}
            value={selectedNumericFilters.minPrice}
            onChange={(e) => handleNumericFilterChange("minPrice", Number(e.target.value))}
            className="w-20 p-1 border rounded"
          />
          <span>to</span>
          <input
            type="number"
            min={selectedNumericFilters.minPrice}
            max={filterData.maxPrice}
            value={selectedNumericFilters.maxPrice}
            onChange={(e) => handleNumericFilterChange("maxPrice", Number(e.target.value))}
            className="w-20 p-1 border rounded"
          />
        </div>
        <input
          type="range"
          min={filterData.minPrice}
          max={filterData.maxPrice}
          value={selectedNumericFilters.maxPrice}
          onChange={(e) => handleNumericFilterChange("maxPrice", Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm">
          <span>Min: ${selectedNumericFilters.minPrice}</span>
          <span>Max: ${selectedNumericFilters.maxPrice}</span>
        </div>
      </div>

      <div className="mb-6 border-b pb-8">
        <h3 className="font-semibold mb-2">KOI FISH TYPE</h3>
        {filterData.types.map((type) => (
          <div key={type} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={type}
              className="mr-2"
              checked={selectedArrayFilters.types?.includes(type) || false}
              onChange={() => handleArrayFilterChange("types", type)}
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>

      <div className="mb-6 border-b pb-8">
        <h3 className="font-semibold mb-2">SIZE</h3>
        {filterData.sizes.map((size) => (
          <div key={size} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={size}
              className="mr-2"
              checked={selectedArrayFilters.sizes?.includes(size) || false}
              onChange={() => handleArrayFilterChange("sizes", size)}
            />
            <label htmlFor={size}>
              {size.replace("_", " to ").replace("under", "Under").replace("over", "Over")} inches
            </label>
          </div>
        ))}
      </div>

      <div className="mb-6 border-b pb-8">
        <h3 className="font-semibold mb-2">GENDER</h3>
        {filterData.genders.map((gender) => (
          <div key={gender} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={gender}
              className="mr-2"
              checked={selectedArrayFilters.genders?.includes(gender) || false}
              onChange={() => handleArrayFilterChange("genders", gender)}
            />
            <label htmlFor={gender}>{gender}</label>
          </div>
        ))}
      </div>

      <div className="mb-6 border-b pb-8">
        <h3 className="font-semibold mb-2">ORIGIN</h3>
        {filterData.origin.map((origin) => (
          <div key={origin} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={origin}
              className="mr-2"
              checked={selectedArrayFilters.origin?.includes(origin) || false}
              onChange={() => handleArrayFilterChange("origin", origin)}
            />
            <label htmlFor={origin}>{origin}</label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">KOI BREED</h3>
        {filterData.breedName.map((breed) => (
          <div key={breed} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={breed}
              className="mr-2"
              checked={selectedArrayFilters.breedName?.includes(breed) || false}
              onChange={() => handleArrayFilterChange("breedName", breed)}
            />
            <label htmlFor={breed}>{breed}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
