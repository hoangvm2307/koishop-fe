import React from 'react';

const FilterSidebar = () => {
  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-semibold border-b mb-8">FILTER PRODUCTS</h2>
      
      <div className="mb-6 border-b pb-8">
        <h3 className="font-semibold mb-2">FILTER BY PRICE</h3>
        <input type="range" min="0" max="100" className="w-full" />
        <div className="flex justify-between text-sm">
          <span>Price: $0</span>
          <span>$616</span>
        </div>
      </div>
      
      <div className="mb-6 border-b pb-8">
        <h3 className="font-semibold mb-2">FIN TYPE</h3>
        <div className="flex items-center mb-2">
          <input type="checkbox" id="butterfly" className="mr-2" />
          <label htmlFor="butterfly">Butterfly Fin (308)</label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="standard" className="mr-2" />
          <label htmlFor="standard">Standard Fin (524)</label>
        </div>
      </div>

      <div className="mb-6 border-b pb-8">
        <h3 className="font-semibold mb-2">COLOR</h3>
        <div className="flex flex-wrap gap-2">
          {['black', 'blue', 'brown', 'yellow', 'gray', 'orange', 'red', 'white', 'gold'].map((color) => (
            <div key={color} className={`w-6 h-6 rounded-full bg-${color}-500 cursor-pointer`}></div>
          ))}
        </div>
      </div>

      <div className="mb-6 border-b pb-8">
        <h3 className="font-semibold mb-2">SIZE</h3>
        {['10 inches plus', '6 to 10 inches', '8 to 12 inches', 'Less than 6 inches', 'less than 8 inches'].map((size) => (
          <div key={size} className="flex items-center mb-2">
            <input type="checkbox" id={size} className="mr-2" />
            <label htmlFor={size}>{size}</label>
          </div>
        ))}
      </div>

      <div className="mb-6 border-b pb-8">
        <h3 className="font-semibold mb-2">GENDER</h3>
        {['Female', 'Male', 'Unknown'].map((gender) => (
          <div key={gender} className="flex items-center mb-2">
            <input type="checkbox" id={gender} className="mr-2" />
            <label htmlFor={gender}>{gender} {gender === 'Unknown' && '(733)'}</label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">FILTER BY BREEDER</h3>
        {['Aquamade', 'Blue Ridge Koi'].map((breeder) => (
          <div key={breeder} className="flex items-center mb-2">
            <input type="checkbox" id={breeder} className="mr-2" />
            <label htmlFor={breeder}>{breeder} {breeder === 'Aquamade' ? '(841)' : '(94)'}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;