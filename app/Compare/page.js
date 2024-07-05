'use client'
import React, { useState, useEffect } from 'react';

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

const checkHarmfulIngredients = (ingredientsText) => {
    const lowerCaseIngredientsText = ingredientsText.toLowerCase();
    return harmfulIngredientsList.filter(ingredient => lowerCaseIngredientsText.includes(ingredient.toLowerCase()));
};

const CompareProducts = () => {
    const [barcode1, setBarcode1] = useState('');
    const [barcode2, setBarcode2] = useState('');
    const [productDetails1, setProductDetails1] = useState(null);
    const [productDetails2, setProductDetails2] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const fetchProductDetails = async (barcode, setProductDetails) => {
        setLoading(true);
        setError('');
        setProductDetails(null);
        try {
            const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
            const data = await response.json();
            if (data.status === 1) {
                setProductDetails(data.product);
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
        fetchProductDetails(barcode1, setProductDetails1);
        fetchProductDetails(barcode2, setProductDetails2);
    };

    // const addToFavorites = (product) => {
    //     // Check if product is already in favorites
    //     if (!favorites.find(favorite => favorite.code === product.code)) {
    //         // If not in favorites, add it
    //         setFavorites([...favorites, product]);
    //         // Update local storage
    //         localStorage.setItem('favorites', JSON.stringify([...favorites, product]));
    //     }
    // };
    const addToFavorites = async (product) => {
        try {
          const response = await fetch('/api/favorites/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
          });
          const data = await response.json();
          setFavorites((prevFavorites) => [...prevFavorites, data]);
        } catch (error) {
          console.error('Failed to add favorite', error);
        }
      };

    const renderNutrientComparison = (nutrientName) => {
        const nutrientValue1 = productDetails1?.nutriments[nutrientName] || 'not available';
        const nutrientValue2 = productDetails2?.nutriments[nutrientName] || 'not available';
        const nutrientValue1Number = parseFloat(nutrientValue1);
        const nutrientValue2Number = parseFloat(nutrientValue2);
        const isLowerBetter = ['saturated-fat_100g', 'sodium_100g', 'salt_100g', 'sugars_100g','fat_100g'].includes(nutrientName);
        const isNutrientValue1Dominant = isLowerBetter ? nutrientValue1Number < nutrientValue2Number : nutrientValue1Number > nutrientValue2Number;

        const shouldHighlight = (nutrientValue1 !== 'not available' && nutrientValue2 !== 'not available' && nutrientValue1 !== nutrientValue2);

        return (
            <tr key={nutrientName}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nutrientName}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${shouldHighlight && isNutrientValue1Dominant ? 'bg-green-200' : 'text-gray-500'}`}>{nutrientValue1}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${shouldHighlight && !isNutrientValue1Dominant ? 'bg-green-200' : 'text-gray-500'}`}>{nutrientValue2}</td>
            </tr>
        );
    };

    const renderComparisonList = (list1, list2) => {
        return (
            <div className="flex justify-between">
                <div className="text-center">
                    <p className="text-sm">{list1.length > 0 ? list1.join(', ') : 'N/A'}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm">{list2.length > 0 ? list2.join(', ') : 'N/A'}</p>
                </div>
            </div>
        );
    };

    const renderComparisonText = (text1, text2) => {
        return (
            <div className="flex justify-between">
                <div className="text-center">
                    <p className="text-sm">{text1 || 'N/A'}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm">{text2 || 'N/A'}</p>
                </div>
            </div>
        );
    };

    const renderNutriScoreComparison = (score1, score2) => {
        return (
            <div className="flex justify-between">
                <div className="text-center">
                    <p className="text-lg">{score1 || 'N/A'}</p>
                </div>
                <div className="text-center">
                    <p className="text-lg">{score2 || 'N/A'}</p>
                </div>
            </div>
        );
    };

    const harmfulIngredients1 = checkHarmfulIngredients(productDetails1?.ingredients_text || '');
    const harmfulIngredients2 = checkHarmfulIngredients(productDetails2?.ingredients_text || '');
    const additives1 = productDetails1?.additives_tags || [];
    const additives2 = productDetails2?.additives_tags || [];
    const sugars1 = productDetails1?.nutriments?.sugars_100g || 0;
    const sugars2 = productDetails2?.nutriments?.sugars_100g || 0;
    const allergens1 = productDetails1?.allergens || '';
    const allergens2 = productDetails2?.allergens || '';
    const saturatedFat1 = productDetails1?.nutriments?.['saturated-fat_100g'] || 0;
    const saturatedFat2 = productDetails2?.nutriments?.['saturated-fat_100g'] || 0;
    const sodium1 = productDetails1?.nutriments?.sodium_100g || 0;
    const sodium2 = productDetails2?.nutriments?.sodium_100g || 0;
    const salt1 = productDetails1?.nutriments?.salt_100g || 0;
    const salt2 = productDetails2?.nutriments?.salt_100g || 0;

    const isProduct1Better = () => {
        if (!productDetails1 || !productDetails2) return 'Unknown';

        const score1 = productDetails1.nutriscore_grade;
        const score2 = productDetails2.nutriscore_grade;
        if (score1 && !score2) {
            return 'Product 1 is a better product'; 
        } else if (!score1 && score2) {
            return 'Product 2 is a better product'; 
        } else if (score1 && score2) {
            if (score1 < score2) {
                return 'Product 1 is a better product'; 
            } else if (score1 > score2) {
                return 'Product 2 is a better product'; 
            }
        }

        if (harmfulIngredients1.length > 0 && harmfulIngredients2.length === 0) {
            return 'Product 2 is a better product'; 
        } else if (harmfulIngredients2.length > 0 && harmfulIngredients1.length === 0) {
            return 'Product 1 is a better product'; 
        }

        if (additives1.length > 0 && additives2.length === 0) {
            return 'Product 2 is a better product'; 
        } else if (additives2.length > 0 && additives1.length === 0) {
            return 'Product 1 is a better product'; 
        }

        if (sugars1 < sugars2) {
            return 'Product 1 is a better product'; 
        } else if (sugars2 < sugars1) {
            return 'Product 2 is a better product'; 
        }

        if (!allergens1 && allergens2) {
            return 'Product 1 is a better product'; 
        } else if (!allergens2 && allergens1) {
            return 'Product 2 is a better product'; 
        }

        if (saturatedFat1 < saturatedFat2) {
            return 'Product 1 is a better product'; 
        } else if (saturatedFat2 < saturatedFat1) {
            return 'Product 2 is a better product'; 
        }

        if (sodium1 < sodium2) {
            return 'Product 1 is a better product'; 
        } else if (sodium2 < sodium1) {
            return 'Product 2 is a better product'; 
        }

        if (salt1 < salt2) {
            return 'Product 1 is a better product'; 
        } else if (salt2 < salt1) {
            return 'Product 2 is a better product'; 
        }

        return 'Unknown'; 
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h2 className="text-2xl font-bold text-center mb-4">Compare Products</h2>
            <form onSubmit={handleSubmit} className="flex justify-center space-x-4 mb-8">
                <input
                    type="text"
                    value={barcode1}
                    onChange={(e) => setBarcode1(e.target.value)}
                    placeholder="Enter Barcode 1"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={barcode2}
                    onChange={(e) => setBarcode2(e.target.value)}
                    placeholder="Enter Barcode 2"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                >
                    Compare
                </button>
            </form>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {loading && <p className="text-center mb-4">Loading...</p>}
            {productDetails1 && productDetails2 && (
                <div>
                    <h3 className="text-xl font-semibold mb-4">Comparison Result</h3>
                    <div className="flex justify-between mb-4">
                        <div className="text-center">
                            <img src={productDetails1.image_url} alt={productDetails1.product_name} className="w-24 h-24 mx-auto"/>
                            <p className="text-lg font-bold">{productDetails1.product_name || 'Product 1'}</p>
                            <button
                                className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                onClick={() => addToFavorites(productDetails1)}
                            >
                                Add to Favorites
                            </button>
                        </div>
                        <div className="text-center">
                            <img src={productDetails2.image_url} alt={productDetails2.product_name} className="w-24 h-24 mx-auto"/>
                            <p className="text-lg font-bold">{productDetails2.product_name || 'Product 2'}</p>
                            <button
                                className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                onClick={() => addToFavorites(productDetails2)}
                            >
                                Add to Favorites
                            </button>
                        </div>
                    </div>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nutrient</th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product 1</th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {['energy-kcal_100g', 'fat_100g', 'saturated-fat_100g', 'carbohydrates_100g', 'sugars_100g', 'fiber_100g', 'proteins_100g', 'salt_100g', 'sodium_100g'].map(renderNutrientComparison)}
                        </tbody>
                    </table>
                    <div className="mt-4">
                        <h4 className="text-lg font-medium">Nutri-Score</h4>
                        {renderNutriScoreComparison(productDetails1.nutriscore_grade, productDetails2.nutriscore_grade)}
                    </div>
                    <div className="mt-4">
                        <h4 className="text-lg font-medium">Harmful Ingredients</h4>
                        {renderComparisonList(harmfulIngredients1, harmfulIngredients2)}
                    </div>
                    <div className="mt-4">
                        <h4 className="text-lg font-medium">Additives</h4>
                        {renderComparisonList(additives1, additives2)}
                    </div>
                    <div className="mt-4">
                        <h4 className="text-lg font-medium">Allergens</h4>
                        {renderComparisonText(allergens1, allergens2)}
                    </div>
                    <div className="mt-4">
                        <h4 className="text-2xl font-medium">Overall Verdict</h4>
                        <p className="text-center text-xl font-bold">{isProduct1Better()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompareProducts;

