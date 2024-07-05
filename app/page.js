import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (<>
<div class="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(196,249,170)_100%)]"></div>
<div className="bg-gray-50">
      {/* Hero Section */}
      <section className=" text-black text-center py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to NutrifyMe</h1>
          <p className="text-lg mb-6">Your journey to a healthier lifestyle starts here. Explore our services and get personalized nutrition advice.</p>
          <Link href="/Signup" passHref>
            <div className="bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition duration-300">Get Started</div>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image src="/images/service-1.jpg" alt="Service 1" width={400} height={250} className="rounded-lg mb-4"/>
              <h3 className="text-2xl font-bold mb-2">Personalized Nutrition Plans</h3>
              <p className="text-gray-600">Get a nutrition plan tailored to your individual needs and goals.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image src="/images/service-2.jpg" alt="Service 2" width={400} height={250} className="rounded-lg mb-4"/>
              <h3 className="text-2xl font-bold mb-2">Expert Consultation</h3>
              <p className="text-gray-600">Consult with our experts to stay on track with your health goals.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image src="/images/service-3.jpg" alt="Service 3" width={400} height={250} className="rounded-lg mb-4"/>
              <h3 className="text-2xl font-bold mb-2">Healthy Recipes</h3>
              <p className="text-gray-600">Discover delicious and healthy recipes curated by our nutritionists.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-600 text-white text-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Health?</h2>
          <p className="text-lg mb-6">Join NutrifyMe today and take the first step towards a healthier you.</p>
          <Link href="/signup" passHref>
            <div className="bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition duration-300">Sign Up Now</div>
          </Link>
        </div>
      </section>
    </div>

</>
   
  );
}
