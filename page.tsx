'use client';

import React, { useState } from 'react';
import {
  Search,
  MapPin,
  ShoppingBag,
  Sparkles,
  Clock,
  Percent,
  ChevronRight,
  Plus,
  Minus,
  Moon,
  Sun,
  Flame,
  CheckCircle2,
  SlidersHorizontal,
  Layers,
  ArrowRight,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import {
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
  Switch,
  Badge,
  StatusBadge,
  VegNonVegBadge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Modal,
  Drawer,
  Tabs,
  useToast,
  Skeleton,
  SkeletonRestaurantCard,
  SkeletonMenuItem,
  EmptyState,
  Rating,
  RatingInput,
  FoodImage,
} from '@/components/ui';
import { formatCurrency } from '@/lib/utils';

interface CartItem {
  id: string;
  name: string;
  pricePaise: number;
  quantity: number;
  isVeg: boolean;
  cuisine: string;
}

export default function HomePage() {
  const { toast } = useToast();

  // Dark mode toggle state
  const [isDark, setIsDark] = useState<boolean>(false);

  // Active view tab: 'explore' | 'design-system'
  const [activeTab, setActiveTab] = useState<string>('explore');

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  // Interactive UI Showcase states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSkeletons, setShowSkeletons] = useState(false);
  const [testRating, setTestRating] = useState(4);
  const [switchActive, setSwitchActive] = useState(true);
  const [checkboxActive, setCheckboxActive] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  // Cart state (client-side simulation)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'dish-1',
      name: 'Dum Hyderabadi Biryani',
      pricePaise: 28000,
      quantity: 1,
      isVeg: false,
      cuisine: 'Biryani',
    },
    {
      id: 'dish-2',
      name: 'Paneer Butter Masala',
      pricePaise: 24000,
      quantity: 2,
      isVeg: true,
      cuisine: 'North Indian',
    },
  ]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const addToCart = (dish: {
    id: string;
    name: string;
    pricePaise: number;
    isVeg: boolean;
    cuisine: string;
  }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });

    toast({
      title: 'Added to Cart',
      message: `${dish.name} added to your order`,
      variant: 'success',
      duration: 3000,
    });
  };

  const cartTotalPaise = cartItems.reduce(
    (acc, curr) => acc + curr.pricePaise * curr.quantity,
    0
  );
  const cartItemCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Featured Restaurants
  const restaurants = [
    {
      id: 'rest-1',
      name: 'The Royal Biryani House',
      cuisine: 'Biryani, Mughlai, Kebabs',
      rating: 4.8,
      reviewCount: 1420,
      deliveryTimeMin: '25-30 mins',
      distance: '2.4 km',
      priceForTwoPaise: 45000,
      isVegOnly: false,
      isOpen: true,
      offerText: '50% OFF up to ₹100',
    },
    {
      id: 'rest-2',
      name: 'Pizza Italia Artisan Crust',
      cuisine: 'Pizzas, Pasta, Italian',
      rating: 4.6,
      reviewCount: 890,
      deliveryTimeMin: '30-35 mins',
      distance: '3.1 km',
      priceForTwoPaise: 50000,
      isVegOnly: false,
      isOpen: true,
      offerText: 'Flat ₹120 OFF',
    },
    {
      id: 'rest-3',
      name: 'Sattvam Pure Vegetarian',
      cuisine: 'South Indian, North Indian, Thalis',
      rating: 4.9,
      reviewCount: 2310,
      deliveryTimeMin: '20-25 mins',
      distance: '1.8 km',
      priceForTwoPaise: 30000,
      isVegOnly: true,
      isOpen: true,
      offerText: 'FREE Delivery above ₹199',
    },
    {
      id: 'rest-4',
      name: 'Wok & Roll Asian Street',
      cuisine: 'Chinese, Dim Sums, Noodles',
      rating: 4.5,
      reviewCount: 650,
      deliveryTimeMin: '35-40 mins',
      distance: '4.2 km',
      priceForTwoPaise: 35000,
      isVegOnly: false,
      isOpen: true,
      offerText: '10% Cashback with UPI',
    },
  ];

  // Featured Dishes
  const dishes = [
    {
      id: 'dish-1',
      name: 'Dum Hyderabadi Chicken Biryani',
      description:
        'Slow-cooked saffron basmati rice with tender succulent chicken, aromatic spices & fried onions.',
      pricePaise: 28000,
      isVeg: false,
      cuisine: 'Biryani',
      category: 'Main Course',
      rating: 4.8,
    },
    {
      id: 'dish-2',
      name: 'Paneer Butter Masala & Garlic Naan',
      description:
        'Charcoal-roasted cottage cheese cubes simmered in a silky tomato, cashew and butter gravy.',
      pricePaise: 24000,
      isVeg: true,
      cuisine: 'North Indian',
      category: 'Curries',
      rating: 4.7,
    },
    {
      id: 'dish-3',
      name: 'Classic Margherita Woodfired Pizza',
      description:
        'San Marzano tomato sauce, fresh buffalo mozzarella, virgin olive oil and torn garden basil leaves.',
      pricePaise: 32000,
      isVeg: true,
      cuisine: 'Pizza',
      category: 'Pizza',
      rating: 4.6,
    },
    {
      id: 'dish-4',
      name: 'Crispy Butter Masala Dosa',
      description:
        'Golden fermented crepe with spiced potato filling, coconut chutney, tomato dip and hot sambar.',
      pricePaise: 12000,
      isVeg: true,
      cuisine: 'South Indian',
      category: 'Tiffin',
      rating: 4.9,
    },
    {
      id: 'dish-5',
      name: 'Belgian Dark Chocolate Truffle Cake',
      description:
        'Decadent layered dark chocolate sponge cake drenched in 70% cocoa ganache.',
      pricePaise: 16000,
      isVeg: true,
      cuisine: 'Desserts',
      category: 'Desserts',
      rating: 4.9,
    },
    {
      id: 'dish-6',
      name: 'Firecracker Crispy Chicken Burger',
      description:
        'Panko crusted fried chicken thigh, spicy sriracha slaw, cheddar cheese and dill pickles in a brioche bun.',
      pricePaise: 21000,
      isVeg: false,
      cuisine: 'Burgers',
      category: 'Fast Food',
      rating: 4.5,
    },
  ];

  const cuisinesList = [
    'All',
    'Biryani',
    'North Indian',
    'Pizza',
    'South Indian',
    'Burgers',
    'Desserts',
    'Chinese',
  ];

  const filteredDishes = dishes.filter((dish) => {
    if (vegOnly && !dish.isVeg) return false;
    if (selectedCuisine !== 'All' && dish.cuisine !== selectedCuisine) return false;
    if (
      searchQuery &&
      !dish.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !dish.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* Top Announcement Banner */}
      <div className="bg-primary text-primary-foreground text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="h-3.5 w-3.5 animate-spin" />
        <span>
          Welcome to QuickBite! Flat 20% off on your first order with code{' '}
          <strong className="underline underline-offset-2">FEAST20</strong>
        </span>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo & Location */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center text-white shadow-warm">
                <Flame className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black font-display tracking-tight text-foreground flex items-center gap-1">
                  Quick<span className="text-primary">Bite</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest -mt-1">
                  Food Delivery
                </span>
              </div>
            </div>

            {/* Location selector */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 border border-border text-xs font-semibold cursor-pointer hover:border-primary/40 transition-colors">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-foreground">Koramangala 4th Block, Bengaluru</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>

          {/* Search bar in nav */}
          <div className="flex-1 max-w-md hidden lg:block">
            <Input
              placeholder="Search for restaurants, biryani, pizza or curries..."
              leftIcon={<Search className="h-4 w-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-secondary/50 border-border/80 focus:bg-card"
            />
          </div>

          {/* Right controls: Theme, View Switcher, Cart */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle Pill (App vs Design System) */}
            <div className="flex items-center p-1 bg-secondary rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setActiveTab('explore')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'explore'
                    ? 'bg-card text-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Food App
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('design-system')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  activeTab === 'design-system'
                    ? 'bg-card text-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Layers className="h-3 w-3 text-primary" />
                Design System
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2.5 rounded-xl border border-border bg-card text-foreground hover:bg-secondary transition-colors"
              title="Toggle theme"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700" />
              )}
            </button>

            {/* Cart Trigger Button with Counter Pill */}
            <Button
              variant="primary"
              size="md"
              leftIcon={<ShoppingBag className="h-4 w-4" />}
              onClick={() => setIsCartOpen(true)}
              className="relative shadow-warm"
            >
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="ml-1.5 bg-white text-primary text-xs font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
        {activeTab === 'explore' ? (
          <>
            {/* Hero Section */}
            <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 via-primary to-rose-600 p-8 sm:p-12 text-white shadow-warm">
              <div className="relative z-10 max-w-2xl flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white w-fit border border-white/20">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                  Fastest Food Delivery in Town
                </div>
                <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-tight">
                  Crave it? Get it hot & fresh in 25 mins.
                </h1>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  Explore top rated restaurants, authentic cuisines, and chef-curated
                  dishes with instant mock payment and real-time live delivery tracking.
                </p>

                {/* Hero Search Bar for Mobile/Tablet */}
                <div className="mt-3 flex flex-col sm:flex-row gap-2 max-w-md">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Try 'Biryani', 'Pizza', 'Burger'..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white text-foreground placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm font-medium shadow-md outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-primary hover:bg-white/95 font-bold shadow-md"
                  >
                    Search Food
                  </Button>
                </div>
              </div>

              {/* Decorative Background Elements */}
              <div className="absolute right-[-40px] bottom-[-40px] opacity-20 pointer-events-none select-none">
                <UtensilsIconLarge />
              </div>
            </section>

            {/* Quick Cuisine Filter Carousel */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-display text-foreground">
                    What&apos;s on your mind?
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Explore mouth-watering cuisines prepared with love
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar">
                {cuisinesList.map((cuisine) => {
                  const isSelected = selectedCuisine === cuisine;
                  return (
                    <button
                      key={cuisine}
                      type="button"
                      onClick={() => setSelectedCuisine(cuisine)}
                      className={`group flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-primary-subtle border-2 border-primary shadow-soft scale-105'
                          : 'bg-card border border-border hover:border-primary/40 hover:-translate-y-1'
                      }`}
                    >
                      <div className="h-16 w-16 rounded-xl overflow-hidden shadow-sm">
                        <FoodImage
                          name={cuisine === 'All' ? 'Thali' : cuisine}
                          cuisine={cuisine}
                          size="full"
                        />
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {cuisine}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Filter & Preferences Toolbar */}
            <section className="flex flex-wrap items-center justify-between gap-4 py-2 border-y border-border">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border shadow-soft">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-bold text-foreground">Filters</span>
                </div>

                {/* Pure Veg Filter Toggle */}
                <div
                  onClick={() => setVegOnly(!vegOnly)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border cursor-pointer select-none transition-all ${
                    vegOnly
                      ? 'bg-veg-subtle border-veg text-veg font-bold shadow-sm'
                      : 'bg-card border-border text-foreground hover:border-veg/50'
                  }`}
                >
                  <VegNonVegBadge isVeg={true} size="sm" />
                  <span className="text-xs font-bold">Pure Veg Only</span>
                </div>

                {/* Skeleton Preview Toggle */}
                <div
                  onClick={() => setShowSkeletons(!showSkeletons)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border cursor-pointer select-none transition-all text-xs font-bold ${
                    showSkeletons
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-card border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>Toggle Shimmer Loading</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground font-medium">
                Showing{' '}
                <strong className="text-foreground">{filteredDishes.length}</strong>{' '}
                curated items
              </div>
            </section>

            {/* Skeletons Preview Mode */}
            {showSkeletons ? (
              <section className="flex flex-col gap-6">
                <h3 className="text-xl font-bold font-display text-foreground">
                  Simulating Shimmer Loading States
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <SkeletonRestaurantCard />
                  <SkeletonRestaurantCard />
                  <SkeletonRestaurantCard />
                  <SkeletonRestaurantCard />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <SkeletonMenuItem />
                  <SkeletonMenuItem />
                </div>
              </section>
            ) : (
              <>
                {/* Top Rated Restaurants Section */}
                <section className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold font-display text-foreground">
                        Top Rated Restaurants Near You
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Hand-picked, hygiene-certified and approved by QuickBite
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {restaurants.map((rest) => (
                      <Card
                        key={rest.id}
                        interactive
                        className="group flex flex-col justify-between"
                      >
                        <div>
                          {/* Image tile with Badge */}
                          <div className="relative h-44 w-full overflow-hidden">
                            <FoodImage
                              name={rest.name}
                              cuisine={rest.cuisine.split(',')[0]}
                              size="full"
                            />
                            {/* Offer Pill */}
                            <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                              <Percent className="h-3 w-3 text-amber-400" />
                              <span>{rest.offerText}</span>
                            </div>
                            {/* Veg badge if pure veg */}
                            {rest.isVegOnly && (
                              <div className="absolute top-3 right-3 bg-card px-2 py-1 rounded-md shadow-md border border-border">
                                <VegNonVegBadge isVeg={true} showText size="sm" />
                              </div>
                            )}
                          </div>

                          <div className="p-4 flex flex-col gap-1.5">
                            <div className="flex items-start justify-between gap-2">
                              <CardTitle className="group-hover:text-primary transition-colors text-base line-clamp-1">
                                {rest.name}
                              </CardTitle>
                              <Rating
                                value={rest.rating}
                                size="sm"
                                showBadge
                                reviewCount={rest.reviewCount}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {rest.cuisine}
                            </p>
                          </div>
                        </div>

                        <CardFooter className="px-4 py-3 bg-secondary/30 text-xs text-muted-foreground font-medium flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            {rest.deliveryTimeMin}
                          </span>
                          <span>{formatCurrency(rest.priceForTwoPaise)} for two</span>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Popular Dishes Menu Grid */}
                <section className="flex flex-col gap-5 mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold font-display text-foreground">
                        Recommended Dishes
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Freshly prepared, packed with hygienic tamper-proof sealing
                      </p>
                    </div>
                  </div>

                  {filteredDishes.length === 0 ? (
                    <EmptyState
                      icon="search"
                      title="No dishes found"
                      description="Try clearing your filters or searching for something else like biryani, pizza or curries."
                      actionText="Reset Filters"
                      onAction={() => {
                        setSearchQuery('');
                        setVegOnly(false);
                        setSelectedCuisine('All');
                      }}
                    />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredDishes.map((dish) => {
                        const inCart = cartItems.find((item) => item.id === dish.id);

                        return (
                          <div
                            key={dish.id}
                            className="bg-card rounded-2xl border border-border/70 p-5 flex items-start justify-between gap-4 shadow-soft hover:shadow-card hover:border-primary/30 transition-all duration-200"
                          >
                            {/* Dish Info */}
                            <div className="flex flex-col gap-1.5 flex-1">
                              <div className="flex items-center gap-2">
                                <VegNonVegBadge isVeg={dish.isVeg} size="md" />
                                <Badge variant="secondary" size="sm">
                                  {dish.category}
                                </Badge>
                              </div>

                              <h3 className="text-base font-bold text-foreground font-display mt-0.5">
                                {dish.name}
                              </h3>

                              <div className="text-sm font-extrabold text-foreground">
                                {formatCurrency(dish.pricePaise)}
                              </div>

                              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                                {dish.description}
                              </p>

                              <div className="flex items-center gap-3 mt-2">
                                <Rating value={dish.rating} size="sm" />
                              </div>
                            </div>

                            {/* Food Image & Interactive Add Button */}
                            <div className="flex flex-col items-center gap-2 shrink-0">
                              <div className="h-28 w-28 rounded-2xl overflow-hidden shadow-card">
                                <FoodImage
                                  name={dish.name}
                                  cuisine={dish.cuisine}
                                  size="full"
                                />
                              </div>

                              {inCart ? (
                                <div className="flex items-center justify-between w-24 h-9 bg-primary text-primary-foreground rounded-xl shadow-warm font-bold text-sm px-2 -mt-5 z-10">
                                  <button
                                    onClick={() => updateCartQuantity(dish.id, -1)}
                                    type="button"
                                    className="p-1 hover:bg-black/15 rounded transition-colors"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="h-3.5 w-3.5" />
                                  </button>
                                  <span>{inCart.quantity}</span>
                                  <button
                                    onClick={() => updateCartQuantity(dish.id, 1)}
                                    type="button"
                                    className="p-1 hover:bg-black/15 rounded transition-colors"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => addToCart(dish)}
                                  className="w-24 h-9 -mt-5 z-10 font-bold uppercase tracking-wider text-xs shadow-warm"
                                >
                                  ADD
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              </>
            )}
          </>
        ) : (
          /* DESIGN SYSTEM SPECIFICATION & COMPONENT SHOWCASE */
          <section className="flex flex-col gap-10">
            <div>
              <Badge variant="default" size="md">
                Design System v1.0
              </Badge>
              <h2 className="text-3xl font-black font-display text-foreground mt-2">
                QuickBite Design Tokens & UI Library
              </h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                Standardised, accessible components strictly adhering to the warm
                palette, 8px spacing grid, generous radii, and micro-interactions.
              </p>
            </div>

            {/* 1. Color Tokens & Badges */}
            <div className="bg-card rounded-3xl border border-border p-6 shadow-soft flex flex-col gap-6">
              <h3 className="text-xl font-bold font-display text-foreground">
                1. Order Status & Semantic Badges
              </h3>
              <p className="text-xs text-muted-foreground -mt-3">
                Covers all 8 order lifecycle states from REQUIREMENTS §7 plus FSSAI
                standard Veg / Non-Veg indicators.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status="PLACED" />
                <StatusBadge status="ACCEPTED" />
                <StatusBadge status="PREPARING" />
                <StatusBadge status="READY_FOR_PICKUP" />
                <StatusBadge status="OUT_FOR_DELIVERY" />
                <StatusBadge status="DELIVERED" />
                <StatusBadge status="CANCELLED" />
                <StatusBadge status="REJECTED" />
                <StatusBadge status="PAID" />
                <StatusBadge status="PENDING" />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Veg Symbol:
                  </span>
                  <VegNonVegBadge isVeg={true} showText size="md" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Non-Veg Symbol:
                  </span>
                  <VegNonVegBadge isVeg={false} showText size="md" />
                </div>
              </div>
            </div>

            {/* 2. Buttons Showcase */}
            <div className="bg-card rounded-3xl border border-border p-6 shadow-soft flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-display text-foreground">
                    2. Button System
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Primary, Secondary, Outline, Ghost, Danger and Loading Spinner states.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setButtonLoading(!buttonLoading)}
                >
                  {buttonLoading ? 'Disable Loading' : 'Simulate Loading'}
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="md" isLoading={buttonLoading}>
                  Primary Button
                </Button>
                <Button variant="secondary" size="md" isLoading={buttonLoading}>
                  Secondary Button
                </Button>
                <Button variant="outline" size="md" isLoading={buttonLoading}>
                  Outline Button
                </Button>
                <Button variant="ghost" size="md" isLoading={buttonLoading}>
                  Ghost Button
                </Button>
                <Button variant="danger" size="md" isLoading={buttonLoading}>
                  Danger Button
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  disabled
                  title="Disabled state"
                >
                  Disabled
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
                <Button variant="primary" size="sm">
                  Small Button
                </Button>
                <Button variant="primary" size="md">
                  Medium Button
                </Button>
                <Button variant="primary" size="lg">
                  Large Button
                </Button>
              </div>
            </div>

            {/* 3. Form Inputs & Controls */}
            <div className="bg-card rounded-3xl border border-border p-6 shadow-soft flex flex-col gap-6">
              <h3 className="text-xl font-bold font-display text-foreground">
                3. Form Controls & Validation
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="Customer Full Name"
                  placeholder="e.g. Rahul Sharma"
                  helperText="Name must be at least 2 characters"
                />

                <Input
                  label="Email Address (with error state)"
                  defaultValue="invalid-email@"
                  error="Please enter a valid email address"
                />

                <Select
                  label="Delivery Address Type"
                  options={[
                    { value: 'home', label: 'Home (Default)' },
                    { value: 'work', label: 'Office / Work' },
                    { value: 'other', label: 'Other Address' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Textarea
                  label="Delivery Special Instructions"
                  placeholder="e.g. Leave at door, ring the bell twice, don't call."
                  showCount
                  maxLength={200}
                />

                <div className="flex flex-col gap-4 p-4 rounded-2xl bg-secondary/40 border border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Toggles & Switches
                  </h4>
                  <Switch
                    label="Send SMS notifications"
                    description="Receive delivery status updates on WhatsApp"
                    checked={switchActive}
                    onChange={setSwitchActive}
                  />
                  <Checkbox
                    label="Opt in for contactless doorstep delivery"
                    description="Rider leaves food at your doorstep"
                    checked={checkboxActive}
                    onChange={(e) => setCheckboxActive(e.target.checked)}
                  />
                </div>
              </div>
            </div>

            {/* 4. Interactive Rating Component */}
            <div className="bg-card rounded-3xl border border-border p-6 shadow-soft flex flex-col gap-6">
              <h3 className="text-xl font-bold font-display text-foreground">
                4. Rating System
              </h3>
              <p className="text-xs text-muted-foreground -mt-3">
                Display star ratings with fractional fills and interactive 1–5 review
                input per FR-8.1.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-secondary/30 border border-border">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Interactive Review Star Picker:
                  </span>
                  <RatingInput
                    value={testRating}
                    onChange={(v) => {
                      setTestRating(v);
                      toast({
                        title: `Rated ${v} Stars!`,
                        message: 'Thank you for rating QuickBite',
                        variant: 'success',
                      });
                    }}
                    size="lg"
                  />
                  <span className="text-xs font-bold text-foreground">
                    Current value: {testRating} of 5
                  </span>
                </div>

                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-secondary/30 border border-border">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Display Ratings with Review Badges:
                  </span>
                  <div className="flex items-center gap-4">
                    <Rating value={4.8} reviewCount={1420} size="md" />
                    <Rating value={4.9} showBadge reviewCount={230} size="md" />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Toasts, Modal and Drawer Triggers */}
            <div className="bg-card rounded-3xl border border-border p-6 shadow-soft flex flex-col gap-6">
              <h3 className="text-xl font-bold font-display text-foreground">
                5. Overlay Micro-Interactions (Toasts, Modals, Drawers)
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() =>
                    toast({
                      title: 'Order Placed Successfully!',
                      message: 'Order #QB-8201 is now accepted by the kitchen.',
                      variant: 'success',
                    })
                  }
                >
                  Trigger Success Toast
                </Button>

                <Button
                  variant="danger"
                  size="md"
                  onClick={() =>
                    toast({
                      title: 'Payment Simulated Failure',
                      message: 'Test card 4000 0000 0000 0002 simulated decline.',
                      variant: 'error',
                    })
                  }
                >
                  Trigger Error Toast
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() =>
                    toast({
                      title: 'Delivery Partner Assigned',
                      message: 'Rider Ramesh K. has picked up your order.',
                      variant: 'info',
                    })
                  }
                >
                  Trigger Info Toast
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setIsModalOpen(true)}
                >
                  Open Sample Modal
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setIsCartOpen(true)}
                >
                  Open Cart Drawer
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Cart Drawer Component */}
      <Drawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        position="right"
        title="Your QuickBite Cart"
        description={`${cartItemCount} items selected`}
        footer={
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">To Pay (Paise / INR):</span>
              <span className="text-lg font-black text-foreground font-display">
                {formatCurrency(cartTotalPaise)}
              </span>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full font-bold shadow-warm"
              onClick={() => {
                toast({
                  title: 'Proceeding to Checkout',
                  message: 'Mock payment gateway ready (CARD, UPI, COD)',
                  variant: 'success',
                });
                setIsCartOpen(false);
              }}
            >
              Checkout Now ({formatCurrency(cartTotalPaise)})
            </Button>
          </div>
        }
      >
        {cartItems.length === 0 ? (
          <EmptyState
            icon="cart"
            title="Your cart is empty"
            description="Explore our menu and add your favorite dishes to start your order."
            actionText="Browse Food"
            onAction={() => setIsCartOpen(false)}
          />
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary/40 border border-border gap-3"
              >
                <div className="flex items-center gap-3">
                  <VegNonVegBadge isVeg={item.isVeg} size="sm" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground">
                      {item.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold">
                      {formatCurrency(item.pricePaise)} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-2 py-1 shadow-sm">
                  <button
                    onClick={() => updateCartQuantity(item.id, -1)}
                    className="p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-xs font-bold min-w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.id, 1)}
                    className="p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}

            {/* Bill Details breakdown */}
            <div className="p-4 rounded-2xl bg-card border border-border flex flex-col gap-2 mt-4 text-xs">
              <h4 className="font-bold text-foreground uppercase tracking-wider mb-1">
                Bill Summary
              </h4>
              <div className="flex justify-between text-muted-foreground">
                <span>Item Subtotal</span>
                <span>{formatCurrency(cartTotalPaise)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee (Mock)</span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxes & Restaurant Packaging</span>
                <span>₹25</span>
              </div>
              <div className="border-t border-border pt-2 mt-1 flex justify-between font-bold text-sm text-foreground">
                <span>Total Amount</span>
                <span>{formatCurrency(cartTotalPaise + 2500)}</span>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Sample Modal for Demonstration */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Welcome to QuickBite"
        description="Exclusive offers for your food cravings"
        footer={
          <Button variant="primary" size="md" onClick={() => setIsModalOpen(false)}>
            Got it, Let&apos;s Eat!
          </Button>
        }
      >
        <div className="flex flex-col gap-4 text-sm text-foreground">
          <p className="leading-relaxed">
            QuickBite brings restaurant-quality cuisine straight to your door. Enjoy
            free delivery, tamper-proof hygienic packing, and live status updates
            powered by our delivery partners.
          </p>
          <div className="p-4 rounded-xl bg-primary-subtle border border-primary/20 flex items-center gap-3">
            <Percent className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h5 className="font-bold text-primary">Coupon: WELCOME10</h5>
              <p className="text-xs text-foreground/80 mt-0.5">
                Apply this code at checkout for flat 10% instant discount.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center text-white">
              <Flame className="h-3.5 w-3.5" />
            </div>
            <span className="font-bold text-foreground">QuickBite</span>
            <span>— Online Food Ordering System (MVP v1.0.0)</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Prices in INR (Stored in Paise)</span>
            <span>Next.js 14 + Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function UtensilsIconLarge() {
  return (
    <svg
      width="280"
      height="280"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
      <path d="M12 2v20" />
      <path d="m7 2 4 20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}
