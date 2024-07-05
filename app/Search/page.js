'use client';

import { useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

const harmfulIngredients = {
  'sugars_100g': 5,
  'sodium_100g': 0.2,
  'trans-fat_100g': 0.1,
  'saturated-fat_100g': 3,
  'cholesterol_100g': 100,
  'fiber_100g': 3,
  'protein_100g': 10,
  'vitamin_a_100g': 1500,
  'vitamin_c_100g': 10,
  'calcium_100g': 200,
  'iron_100g': 1,
  'potassium_100g': 200,
  'vitamin_d_100g': 100,
  'aspartame_100g': 50,
  'sucralose_100g': 5,
  'sodium_benzoate_100g': 5,
  'sorbic_acid_100g': 100,
  'fdc_colors_100g': 10,
  'msg_100g': 1000,
  'palm_oil_100g': 0
};

const harmfulIngredientsList = [
  'aspartame', 'sucralose', 'saccharin', 'acesulfame k', 'neotame', 'advantame',
  'cyclamate', 'red 40', 'yellow 5', 'yellow 6', 'blue 1', 'green 3', 'red 3',
  'sodium benzoate', 'potassium sorbate', 'bha', 'bht', 'propyl gallate', 'msg',
  'disodium inosinate', 'disodium guanylate', 'carrageenan', 'polysorbate 80',
  'xanthan gum', 'cmc', 'partially hydrogenated oil', 'hfcs', 'soybean oil',
  'corn oil', 'cottonseed oil', 'palm oil', 'azodicarbonamide', 'sodium nitrite',
  'potassium bromate', 'bvo', 'titanium dioxide', 'propylene glycol',
  'sodium caseinate', 'monoglycerides', 'diglycerides', 'ethyl paraben',
  'propyl paraben', 'butylated hydroxyanisole', 'butylated hydroxytoluene',
  'phosphoric acid', 'sodium phosphate', 'ammonium sulfate', 'calcium propionate'
];

const isProductSafe = (nutriments) => {
  for (const [key, value] of Object.entries(harmfulIngredients)) {
    if (nutriments[key] && nutriments[key] > value) {
      return false;
    }
  }
  return true;
};

const checkHarmfulIngredients = (ingredientsText) => {
  const lowerCaseIngredientsText = ingredientsText.toLowerCase();
  return harmfulIngredientsList.filter(ingredient => lowerCaseIngredientsText.includes(ingredient.toLowerCase()));
};

const Product = () => {
    const { data: session } = useSession();
    const router = useRouter();

  const [barcode, setBarcode] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSafe, setIsSafe] = useState(null);
  const [harmfulIngredientsFound, setHarmfulIngredientsFound] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [preservatives, setPreservatives] = useState([]);
  const [additives, setAdditives] = useState([]);

  const fetchProductDetails = async (barcode) => {
    setLoading(true);
    setError('');
    setProductDetails(null);
    setIsSafe(null);
    setHarmfulIngredientsFound([]);
    setAllergens([]);
    setPreservatives([]);
    setAdditives([]);

    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      if (data.status === 1) {
        setProductDetails(data.product);
        const safe = isProductSafe(data.product.nutriments);
        setIsSafe(safe);
        const harmfulFound = checkHarmfulIngredients(data.product.ingredients_text || '');
        setHarmfulIngredientsFound(harmfulFound);
        setAllergens(data.product.allergens_tags || []);
        setPreservatives(data.product.additives_original_tags?.filter(tag => tag.includes('e')) || []);
        setAdditives(data.product.additives_tags || []);
      } else {
        setError('Product not found. Please check the barcode and try again.');
      }
    } catch (error) {
      setError('An error occurred while fetching the product details. Please try again.');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProductDetails(barcode);
  };

  const getGradeColor = (grade) => {
    switch (grade.toLowerCase()) {
      case 'a':
        return 'bg-green-800';
      case 'b':
        return 'bg-green-500';
      case 'c':
        return 'bg-yellow-400';
      case 'd':
        return 'bg-orange-500';
      case 'e':
        return 'bg-red-600'
      default:
        return 'bg-gray-500'; // Default color
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productDetails?.name || 'Product Details',
          text: productDetails?.description || '',
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert(`Share this product: ${window.location.href}`);
    }
  };

  if(!session){
    router.push('/')
  }


  return (
    <div>
      {session && <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Enter Barcode</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Find detailed information about your product
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="barcode" className="sr-only">Barcode</label>
                <input
                  id="barcode"
                  name="barcode"
                  type="text"
                  autoComplete="barcode"
                  required
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Enter product barcode"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {loading ? 'Loading...' : 'Get Product Details'}
              </button>
            </div>
          </form>
          {error && <div className="text-red-500 text-center">{error}</div>}
          {productDetails && (
            <div className="flex mt-8 space-x-8">
              {/* Left Column */}
              <div className="flex-1 p-4 border rounded-md bg-white shadow-sm">
                <h3 className="text-xl font-bold mb-4">Product Details</h3>
                <div className="mb-4">
                  {productDetails.image_url && (
                    <img src={productDetails.image_url} alt={productDetails.product_name} className="w-1/3 h-1/2 mb-4 rounded-md shadow-md" />
                  )}
                  <p><strong>Name:</strong> {productDetails.product_name}</p>
                  <p><strong>Brand:</strong> {productDetails.brands}</p>
                  <p><strong>Categories:</strong> {productDetails.categories}</p>
                  <p><strong>Ingredients:</strong> {productDetails.ingredients_text}</p>
                </div>
                {Object.keys(productDetails.nutriments).length > 0 ? (
                  <div>
                    <h4 className="text-lg font-bold mb-2">Nutritional Information</h4>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nutrient</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.keys(productDetails.nutriments).map((key) => {
                          const isHarmful = harmfulIngredients[key] && productDetails.nutriments[key] > harmfulIngredients[key];
                          return (
                            <tr key={key} className={isHarmful ? 'border-4' : ''}>
                              <td className={`px-6 py-4 whitespace-nowrap text-sm ${isHarmful ? "text-red-500" : "text-gray-500"}`}>{key}</td>
                              <td className={`px-6 py-4 whitespace-nowrap text-right text-sm ${isHarmful ? "text-red-500" : "text-gray-500"} `}>{productDetails.nutriments[key]}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : <div className="mt-8 p-4 border rounded-md bg-yellow-100 shadow-sm text-center">
                  Sorry, We don't have complete information for this product.
                </div>}
                {(isSafe !== null && Object.keys(productDetails.nutriments).length > 0) && (
                  <div className={`mt-4 p-4 rounded-md ${(isSafe && harmfulIngredientsFound.length == 0) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {(isSafe && harmfulIngredientsFound.length == 0) ? 'This product is safe to consume.' : 'This product may contains unhealthy amount of some ingredients.'}
                  </div>
                )}
                {harmfulIngredientsFound.length > 0 && (
                  <div className="mt-4 p-4 bg-yellow-100 rounded-md">
                    <h3 className="text-yellow-700 font-bold">Harmful Ingredients Found:</h3>
                    <ul className="list-disc list-inside text-yellow-700">
                      {harmfulIngredientsFound.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Allergen, Preservative, and Additive Information */}
                {allergens.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-100 rounded-md">
                    <h3 className="text-blue-700 font-bold">Allergens:</h3>
                    <ul className="list-disc list-inside text-blue-700">
                      {allergens.map((allergen, index) => (
                        <li key={index}>{allergen}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {preservatives.length > 0 && (
                  <div className="mt-4 p-4 bg-purple-100 rounded-md">
                    <h3 className="text-purple-700 font-bold">Preservatives:</h3>
                    <ul className="list-disc list-inside text-purple-700">
                      {preservatives.map((preservative, index) => (
                        <li key={index}>{preservative}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {additives.length > 0 && (
                  <div className="mt-4 p-4 bg-pink-100 rounded-md">
                    <h3 className="text-pink-700 font-bold">Additives:</h3>
                    <ul className="list-disc list-inside text-pink-700">
                      {additives.map((additive, index) => (
                        <li key={index}>{additive}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
              </div>
             
              {/* Right Column */}

              <div className="w-full lg:w-1/3 p-4">
              
                <div className="border rounded-md p-4 bg-white shadow-sm text-center">
                  <h4 className="text-lg font-bold mb-2">Nutri-Score</h4>
                  {productDetails.nutriscore_data ? (
                    <>
                      <div>
                        {productDetails.nutriscore_data.grade ? (
                          <div className={`text-2xl font-bold ${getGradeColor(productDetails.nutriscore_data.grade)}`}>
                            {productDetails.nutriscore_data.grade.toUpperCase()}
                          </div>
                        ) : (
                          <div className="text-gray-500">Nutri-Score grade is not available</div>
                        )}
                      </div>
                      <div className="mt-2">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsnlb2CFPJHd98RzKCJtqlvCVbD4Vw5HGB3Q&s=" alt="Nutri-Score" className="w-80 h-60 mb-4" />
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-500">Nutri-Score information is not available</div>
                  )}
                </div>
                {productDetails && (
        <div className='mt-10 '>
          <button className='bg-green-600' onClick={handleShare}>Share</button>
        </div>
      )}
              </div>
            </div>
          )}
        </div>
      </div>}
    </div>
  );
};

export default Product;


