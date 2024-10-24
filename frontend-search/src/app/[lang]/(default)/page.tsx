import { Suspense } from 'react';
import Divider from '@components/ui/divider';
import { Metadata } from 'next';

// Define the metadata for SEO
export const metadata: Metadata = {
  title: 'Largest Contact Lens Platform',
};

// Search bar fallback to show loading state
function SearchBarFallback() {
  return <>Loading...</>;
}

// Hero Section
function HeroSection() {
  return (
    <section className="hero-bg h-screen text-white flex flex-col justify-center items-center bg-fill-one">
      <h1 className="text-5xl font-bold">The Largest Contact Lens Platform</h1>
      <p className="mt-4 text-xl">Find the perfect lenses with our AI-powered search</p>
      <a href="#products" className="mt-6 px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full">Search Lens</a>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  return (
    <section id="features" className="py-16 mt-0.5 bg-fill-one">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl text-white font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">AI-Powered Search</h3>
            <p>Use natural language to find the lenses that suit your specific needs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Comprehensive Lens Database</h3>
            <p>Explore our vast collection of lenses with detailed specifications.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Expert Recommendations</h3>
            <p>Get personalized recommendations from our eye care professionals.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Products Section
function ProductsSection() {
  return (
    <section id="products" className="py-16 mt-0.5 mb-0.5 bg-fill-one">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl text-white font-bold mb-8">Our Top-Rated Contact Lenses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sample Products */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="/assets/images/product_example.jpg" alt="Lens 1" className="h-40 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Brand A</h3>
            <p className="mt-2 text-gray-600">Soft Lens</p>
            <a href="#" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">More Details</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="/assets/images/product_example.jpg" alt="Lens 1" className="h-40 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Brand A</h3>
            <p className="mt-2 text-gray-600">Soft Lens</p>
            <a href="#" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">More Details</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="/assets/images/product_example.jpg" alt="Lens 1" className="h-40 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Brand A</h3>
            <p className="mt-2 text-gray-600">Soft Lens</p>
            <a href="#" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">More Details</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="/assets/images/product_example.jpg" alt="Lens 1" className="h-40 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Brand A</h3>
            <p className="mt-2 text-gray-600">Soft Lens</p>
            <a href="#" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">More Details</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="/assets/images/product_example.jpg" alt="Lens 1" className="h-40 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Brand A</h3>
            <p className="mt-2 text-gray-600">Soft Lens</p>
            <a href="#" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">More Details</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="/assets/images/product_example.jpg" alt="Lens 1" className="h-40 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Brand A</h3>
            <p className="mt-2 text-gray-600">Soft Lens</p>
            <a href="#" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">More Details</a>
          </div>
          
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <Divider />
      <Suspense fallback={<SearchBarFallback />}>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Products Section */}
        <ProductsSection />
      </Suspense>
    </>
  );
}
