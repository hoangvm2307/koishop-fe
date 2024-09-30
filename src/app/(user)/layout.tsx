export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-3xl font-bold italic">
              <span className="text-red-600">KOI</span>
              <span className="text-teal-900">GARDEN</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-700 font-bold hover:text-teal-900">
                SHOP ALL
              </a>
              <a href="#" className="text-gray-700 font-bold hover:text-teal-900">
                KOI FISH FOR SALE
              </a>
              <a href="#" className="text-gray-700 font-bold hover:text-teal-900">
                GOLDFISH FOR SALE
              </a>
              <a href="#" className="text-gray-700 font-bold hover:text-teal-900">
                POND PACKS
              </a>
              <a href="#" className="text-gray-700 font-bold hover:text-teal-900">
                GIFT CARDS
              </a>
              <a href="#" className="text-gray-700 font-bold hover:text-teal-900">
                DISCOUNTS
              </a>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
