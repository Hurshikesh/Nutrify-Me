import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="bg-gray-100">
      <section className="bg-white text-black text-center py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">About NutrifyMe</h1>
          <p className="text-lg mb-6">
          At NutrifyMe, we're committed to helping you identify harmful foods and choose healthier alternatives. Our mission is to empower you with the knowledge and tools to make safe, nutritious choices every day.
          </p>
        </div>
      </section>

      <section className="relative py-20 bg-gray-100">
  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/mission-bg.jpg)' }}></div>
  <div className="absolute inset-0 bg-green-600 opacity-75"></div>
  <div className="relative container mx-auto px-4 text-center text-white">
    <h2 className="text-5xl font-bold mb-8">Empowering You to Make Healthier Choices</h2>
    <p className="text-xl mb-6">
      At NutrifyMe, our mission is to empower you to make healthier choices by providing you with the tools to detect harmful foods and choose nutritious alternatives. We believe that everyone deserves access to safe and healthy food.
    </p>
    <p className="text-lg">
      Through cutting-edge technology, comprehensive education, and a supportive community, we strive to create a world where food safety is a priority and nutritious eating is accessible to all.
    </p>
  </div>
</section>


      <section className="py-20 bg-gray-100">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l8.84 8.84a.5.5 0 00.7 0l8.84-8.84a5.5 5.5 0 000-7.78z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Health and Safety</h3>
        <p className="text-gray-600">We prioritize your health and safety by providing reliable information about potentially harmful ingredients and food products.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.654 0 3-1.346 3-3S13.654 2 12 2 9 3.346 9 5s1.346 3 3 3zM12 10c-2.761 0-5 2.239-5 5v4a2 2 0 002 2h6a2 2 0 002-2v-4c0-2.761-2.239-5-5-5z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Education</h3>
        <p className="text-gray-600">We believe in the power of knowledge. Our goal is to educate our users about food safety and nutrition.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17a1 1 0 001 1h5a1 1 0 001-1v-4h3a1 1 0 001-1v-2a1 1 0 00-1-1h-3V7a1 1 0 00-1-1h-5a1 1 0 00-1 1v4H8a1 1 0 00-1 1v2a1 1 0 001 1h3v4z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Innovation</h3>
        <p className="text-gray-600">We use cutting-edge technology to deliver accurate and up-to-date information on food safety.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7H7v6h6V7z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13V7a2 2 0 00-2-2h-6M7 7v6m8 0h6a2 2 0 002-2v-6M13 21h-6a2 2 0 01-2-2v-6" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Community Support</h3>
        <p className="text-gray-600">We foster a supportive community where users can share experiences, advice, and encouragement.</p>
      </div>
    </div>
  </div>
</section>


      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Image src="data:image/jpeg;base64,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" alt="Team Member 1" width={200} height={200} className="rounded-full mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">John Doe</h3>
              <p className="text-gray-600">CEO &amp; Founder</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Image src="data:image/jpeg;base64,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" alt="Team Member 2" width={200} height={200} className="rounded-full mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Jane Smith</h3>
              <p className="text-gray-600">Head Nutritionist</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Image src="data:image/jpeg;base64,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" alt="Team Member 3" width={200} height={200} className="rounded-full mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Michael Brown</h3>
              <p className="text-gray-600">Fitness Expert</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
          <p className="text-lg text-center mb-8">
            Have questions or need support? Reach out to us at <a href="mailto:support@nutrifyme.com" className="text-green-600 font-bold">support@nutrifyme.com</a>.
          </p>
          <div className="text-center">
            <Link href="/">
              <div className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition duration-300">Go Back to Home</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
