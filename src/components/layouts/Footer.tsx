import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      {/* Newsletter Signup - với màu nền khác */}
      <div className="bg-slate-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">NEWSLETTER SIGNUP</h3>
              <p className="text-sm">Stay Up To Date on The Best We Have To Offer & Save 10% on Your Next Order.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input type="email" placeholder="Enter Your Email" className="mr-2 bg-white text-black" />
              <Button variant="secondary">SUBSCRIBE</Button>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-gray-300"><Facebook /></Link>
              <Link href="#" className="hover:text-gray-300"><Twitter /></Link>
              <Link href="#" className="hover:text-gray-300"><Instagram /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            {/* Footer Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:mb-0 md:w-2/3">
              <div>
                <h4 className="font-bold mb-4">ABOUT</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:underline">About NextDayKoi</Link></li>
                  <li><Link href="#" className="hover:underline">Our Suppliers</Link></li>
                  <li><Link href="#" className="hover:underline">Our Goals</Link></li>
                  <li><Link href="#" className="hover:underline">Customer Testimonials</Link></li>
                  <li><Link href="#" className="hover:underline">2024 KHV Response</Link></li>
                  <li><Link href="#" className="hover:underline">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">HOW TO BUY</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:underline">How To Buy</Link></li>
                  <li><Link href="#" className="hover:underline">Purchasing & Shipping</Link></li>
                  <li><Link href="#" className="hover:underline">Our Discount System</Link></li>
                  <li><Link href="#" className="hover:underline">14-Day Worry-Free Guarantee</Link></li>
                  <li><Link href="#" className="hover:underline">Become An Affiliate</Link></li>
                  <li><Link href="#" className="hover:underline">Frequently Asked Questions</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">KOI INFO</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:underline">Koi Info</Link></li>
                  <li><Link href="#" className="hover:underline">Koi Health</Link></li>
                  <li><Link href="#" className="hover:underline">Koi Blog</Link></li>
                  <li><Link href="#" className="hover:underline">Glossary of Terms</Link></li>
                  <li><Link href="#" className="hover:underline">Koi FAQs</Link></li>
                </ul>
              </div>
            </div>

            {/* Video Section */}
            <div className="md:w-1/3 md:pl-8">
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.youtube.com/embed/your-video-id" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Copyright and Payment Icons */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm mt-8">
            <p>©2022 Next Day Koi. All Rights Reserved. | Website by Opus Media</p>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <img src="/path-to-visa-icon.png" alt="Visa" className="h-8" />
              <img src="/path-to-mastercard-icon.png" alt="Mastercard" className="h-8" />
              <img src="/path-to-discover-icon.png" alt="Discover" className="h-8" />
              <img src="/path-to-amex-icon.png" alt="American Express" className="h-8" />
              <img src="/path-to-paypal-icon.png" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}