import React, { useState, useEffect } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import SocialProofToast from "./components/common/SocialProofToast";
import SizeGuideModal from "./components/common/SizeGuideModal";

import HeroCarousel from "./components/store/HeroCarousel";
import ProductFilters from "./components/store/ProductFilters";
import ProductGrid from "./components/store/ProductGrid";
import ProductDetailModal from "./components/store/ProductDetailModal";
import CartDrawer from "./components/store/CartDrawer";
import CheckoutModal from "./components/store/CheckoutModal";
import NfcReceiptModal from "./components/fiscal/NfcReceiptModal";

import { storeService } from "./services/storeService";

export default function App() {
  // Core Data persistent state
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [cart, setCart] = useState([]);

  // Storefront Filter & Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [selectedSize, setSelectedSize] = useState("");
  const [sortBy, setSortBy] = useState("bestseller");

  // Modals & Drawers State
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [receiptOrder, setReceiptOrder] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Load state and add Storage Event listener for real-time synchronization with Maycon's Admin Panel!
  const loadStoreData = () => {
    setProducts(storeService.getProducts());
    setBanners(storeService.getBanners());
    setCoupons(storeService.getCoupons());
    setCart(storeService.getCart());
  };

  useEffect(() => {
    loadStoreData();

    // Listen to localStorage changes made from the separate admin app!
    const handleStorageChange = () => {
      loadStoreData();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Sync cart to localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    storeService.saveCart(newCart);
  };

  // CART ACTIONS
  const handleAddToCart = ({ product, size, color, quantity }) => {
    const existingIdx = cart.findIndex(
      (item) => item.productId === product.id && item.size === size && item.color === color
    );

    if (existingIdx > -1) {
      const updated = [...cart];
      updated[existingIdx].quantity += quantity;
      updateCart(updated);
    } else {
      const newItem = {
        productId: product.id,
        name: product.name,
        size: size || product.sizes[0] || "Único",
        color: color || product.colors[0]?.name || "Única",
        price: product.price,
        quantity,
        image: product.images[0]
      };
      updateCart([...cart, newItem]);
    }

    setSelectedProductDetail(null);
    setIsCartOpen(true);
  };

  const handleQuickAddToCart = (product) => {
    handleAddToCart({
      product,
      size: product.sizes[0] || "M",
      color: product.colors[0]?.name || "Preto Gold",
      quantity: 1
    });
  };

  const handleBuyNow = ({ product, size, color, quantity }) => {
    handleAddToCart({ product, size, color, quantity });
    setSelectedProductDetail(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (idx, newQty) => {
    const updated = [...cart];
    updated[idx].quantity = newQty;
    updateCart(updated);
  };

  const handleRemoveCartItem = (idx) => {
    const updated = cart.filter((_, i) => i !== idx);
    updateCart(updated);
  };

  const handleOrderCompleted = (orderData) => {
    const newOrder = storeService.createOrder(orderData);
    setProducts(storeService.getProducts());
    updateCart([]); // Clear cart
    setAppliedCoupon(null);
    return newOrder;
  };

  // FILTER PRODUCTS
  const filteredProducts = products
    .filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === "todas" || p.category === selectedCategory;
      const matchesSize = !selectedSize || p.sizes.includes(selectedSize);
      return matchesSearch && matchesCat && matchesSize;
    })
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "newest") return b.isNew ? 1 : -1;
      return b.reviewCount - a.reviewCount; // best sellers default
    });

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans">
      {/* PUBLIC STORE FRONT */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* DYNAMIC HERO CAROUSEL (Fed directly from Maycon's Admin Banners) */}
      <HeroCarousel banners={banners} />

      {/* MAIN STOREFRONT CATALOG SECTION */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Catalog Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              MAYCON STORE DROP EXCLUSIVO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              Coleção Streetwear Masculina
            </h2>
          </div>
          <span className="text-xs text-zinc-400">
            Exibindo <strong className="text-white">{filteredProducts.length}</strong> de {products.length} produtos
          </span>
        </div>

        {/* Catalog Filters */}
        <ProductFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          onSelectProduct={(p) => setSelectedProductDetail(p)}
          onQuickAddToCart={handleQuickAddToCart}
        />

      </main>

      {/* FOOTER */}
      <Footer onOpenSizeGuide={() => setIsSizeGuideOpen(true)} />

      {/* FLOATING CONVERSION SOCIAL PROOF TOAST */}
      <SocialProofToast />

      {/* MODALS & DRAWERS */}
      
      {/* Product Details Modal */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
        availableCoupons={coupons}
      />

      {/* Checkout Modal (Pix & Credit Card) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        appliedCoupon={appliedCoupon}
        onOrderCompleted={handleOrderCompleted}
        onOpenReceipt={(order) => {
          setIsCheckoutOpen(false);
          setReceiptOrder(order);
        }}
      />

      {/* Sizing Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* NFC-e Thermal Printable Receipt Modal */}
      <NfcReceiptModal
        order={receiptOrder}
        isOpen={!!receiptOrder}
        onClose={() => setReceiptOrder(null)}
      />

    </div>
  );
}
