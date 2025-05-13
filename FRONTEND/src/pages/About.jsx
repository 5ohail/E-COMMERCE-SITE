
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 border-b pb-2">About Luxora</h1>
        <p className="text-gray-700 text-lg mb-6">
          At Luxora, fashion meets elegance. We're a modern clothing brand dedicated to delivering timeless style, premium quality, and effortless comfort.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To redefine everyday fashion with luxurious, sustainable, and versatile clothing that empowers confidence and individuality.
            </p>
          </div>

          <div className="bg-pink-50 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Our Craft</h2>
            <p className="text-gray-600">
              From fabric to fit, we obsess over every detail to create clothes that feel as good as they look—designed for modern lifestyles.
            </p>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Luxora. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default About;
