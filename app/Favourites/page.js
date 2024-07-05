// 'use client'
// import React, { useEffect, useState } from 'react';

// const Favorites = () => {
//     const [favorites, setFavorites] = useState([]);

//     useEffect(() => {
//         const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
//         setFavorites(savedFavorites);
//     }, []);

//     const addToFavorites = (product) => {
//         const updatedFavorites = [...favorites, product];
//         setFavorites(updatedFavorites);
//         updateLocalStorage(updatedFavorites);
//     };

//     const removeFromFavorites = (barcode) => {
//         const updatedFavorites = favorites.filter(product => product.code !== barcode);
//         setFavorites(updatedFavorites);
//         updateLocalStorage(updatedFavorites);
//     };

//     const isFavorite = (barcode) => {
//         return favorites.some(product => product.code === barcode);
//     };

//     const handleToggleFavorite = (product) => {
//         if (isFavorite(product.code)) {
//             removeFromFavorites(product.code);
//         } else {
//             addToFavorites(product);
//         }
//     };

//     const updateLocalStorage = (updatedFavorites) => {
//         localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//     };

//     return (
//         <div className="max-w-2xl mx-auto py-8">
//             <h2 className="text-2xl font-bold text-center mb-4">Favorite Products</h2>
//             {favorites.length === 0 ? (
//                 <p className="text-center">No favorite products added.</p>
//             ) : (
//                 <div className="space-y-4">
//                     {favorites.map(product => (
//                         <div key={product.code} className="border p-4 rounded-md flex justify-between items-center">
//                             <div className="flex items-center">
//                                 <img src={product.image_url} alt={product.product_name} className="w-16 h-16"/>
//                                 <p className="ml-4 text-lg font-bold">{product.product_name}</p>
//                             </div>
//                             <button
//                                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                                 onClick={() => handleToggleFavorite(product)}
//                             >
//                                 Remove
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Favorites;

import React, { useState, useEffect } from 'react';
import CompareProducts from '../Compare/CompareProducts';

const Home = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites');
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Failed to fetch favorites', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-4">Favorites</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite._id}>
            <p>{favorite.product_name}</p>
            <img src={favorite.image_url} alt={favorite.product_name} />
          </li>
        ))}
      </ul>
      <CompareProducts setFavorites={setFavorites} />
    </div>
  );
};

export default Home;
