"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Clock, ChevronDown, Filter, X } from 'lucide-react';
import Layout from '../components/layout';
import Image from 'next/image';

const RestaurantCard = ({ restaurant }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
    >
      <div className="relative h-48">
        <Image src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" width={800} height={600} />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {restaurant.prepTime} mins
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-1">{restaurant.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
          </div>
          <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 text-green-500 fill-current" />
            <span className="ml-1 text-sm font-semibold text-green-700">{restaurant.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{restaurant.distance} km away</span>
        </div>
      </div>
    </motion.div>
  );
};

const CuisineFilter = ({ cuisines, activeCuisine, setActiveCuisine }) => {
  return (
    <div className="flex overflow-x-auto py-2 mb-4 scrollbar-hide">
      {cuisines.map((cuisine) => (
        <motion.button
          key={cuisine}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full mr-2 text-sm font-medium whitespace-nowrap ${activeCuisine === cuisine
            ? 'bg-red-500 text-white'
            : 'bg-gray-200 text-gray-700'
            }`}
          onClick={() => setActiveCuisine(cuisine)}
        >
          {cuisine}
        </motion.button>
      ))}
    </div>
  );
};

export default function Component() {
  const [activeCuisine, setActiveCuisine] = useState('All');

  const cuisines = ['All', 'Italian', 'Japanese', 'Indian', 'Mexican', 'Thai', 'American'];

  const restaurants = [
    {
      id: 1,
      name: "Pasta Paradise",
      cuisine: "Italian",
      rating: 4.7,
      distance: 1.2,
      prepTime: 25,
      image: "https://images.axios.com/lIPBPJ802rSLL98aIQ9FDkQd2Go=/0x0:6687x3761/1920x1080/2023/04/11/1681223212336.jpg",
    },
    {
      id: 2,
      name: "Sushi Sensation",
      cuisine: "Japanese",
      rating: 4.5,
      distance: 0.8,
      prepTime: 30,
      image: "https://media-cdn.tripadvisor.com/media/photo-s/14/c8/3c/b8/happy-rajah-indian-restaurant.jpg",
    },
    {
      id: 3,
      name: "Spice Route",
      cuisine: "Indian",
      rating: 4.3,
      distance: 1.5,
      prepTime: 35,
      image: "https://sulaindianrestaurant.com/wp-content/uploads/2020/12/IMG_2575-1-1200x800.jpg",
    },
    {
      id: 4,
      name: "Taco Fiesta",
      cuisine: "Mexican",
      rating: 4.6,
      distance: 2.0,
      prepTime: 20,
      image: "https://b.zmtcdn.com/data/pictures/0/20039390/a1f2a486867328616139f33fc95f7d69.jpg?fit=around|960:500&crop=960:500;*,*",
    },
    {
      id: 5,
      name: "Bangkok Bites",
      cuisine: "Thai",
      rating: 4.4,
      distance: 1.7,
      prepTime: 28,
      image: "https://www.indianeagle.com/travelbeats/wp-content/uploads/2016/05/Indian-restaurant-Utsav-NYC-best-Indian-restaurants-in-New-York.jpg",
    },
  ];

  const filteredRestaurants = activeCuisine === 'All'
    ? restaurants
    : restaurants.filter(restaurant => restaurant.cuisine === activeCuisine);

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen pb-20">
        <main className="p-4">
          <CuisineFilter
            cuisines={cuisines}
            activeCuisine={activeCuisine}
            setActiveCuisine={setActiveCuisine}
          />
          <AnimatePresence>
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </AnimatePresence>
        </main>
      </div>
    </Layout>
  );
}
