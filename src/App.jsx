import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Store Components
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

// Admin Components
import AdminLoginPage from "./components/auth/AdminLoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminSidebar from "./components/admin/AdminSidebar";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProductManager from "./components/admin/ProductManager";
import BannerManager from "./components/admin/BannerManager";
import OrderManager from "./components/admin/OrderManager";
import CouponManager from "./components/admin/CouponManager";
import CategoryManager from "./components/admin/CategoryManager";

// Fiscal
import NfcReceiptModal from "./components/fiscal/NfcReceiptModal";

// Service
import { storeService } from "./services/storeService";

// ─────────────────────────────────────────────
// PUBLIC STORE
// ─────────────────────────────────────────────
function StorePage() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [selectedSize, setSelectedSize] = useState("");
  const [sortBy, setSortBy] = useState("bestseller");

  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [receiptOrder, setReceiptOrder] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const loadStoreData = () => {
    setProducts(storeService.getProducts());
    setBanners(storeService.getBanners());
    setCoupons(storeService.getCoupons());
    setCategories(storeService.getCategories());
    setCart(storeService.getCart());
  };

  useEffect(() => {
    loadStoreData();
    // React to changes made by the admin panel (same origin = same localStorage)
    const handleStorageChange = () => loadStoreData();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    storeService.saveCart(newCart);
  };

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
    updateCart(cart.filter((_, i) => i !== idx));
  };

  const handleOrderCompleted = (orderData) => {
    const newOrder = storeService.createOrder(orderData);
    setProducts(storeService.getProducts());
    updateCart([]);
    setAppliedCoupon(null);
    return newOrder;
  };

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
      return b.reviewCount - a.reviewCount;
    });

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans">
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <HeroCarousel banners={banners} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
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

        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <ProductGrid
          products={filteredProducts}
          onSelectProduct={(p) => setSelectedProductDetail(p)}
          onQuickAddToCart={handleQuickAddToCart}
        />
      </main>

      <Footer onOpenSizeGuide={() => setIsSizeGuideOpen(true)} />

      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
        availableCoupons={coupons}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        appliedCoupon={appliedCoupon}
        onOrderCompleted={handleOrderCompleted}
        onOpenReceipt={(order) => { setIsCheckoutOpen(false); setReceiptOrder(order); }}
      />

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      <NfcReceiptModal
        order={receiptOrder}
        isOpen={!!receiptOrder}
        onClose={() => setReceiptOrder(null)}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN PANEL
// ─────────────────────────────────────────────
function AdminPanel() {
  const navigate = useNavigate();
  const [adminTab, setAdminTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [receiptOrder, setReceiptOrder] = useState(null);

  const loadData = () => {
    setProducts(storeService.getProducts());
    setBanners(storeService.getBanners());
    setCoupons(storeService.getCoupons());
    setOrders(storeService.getOrders());
    setCategories(storeService.getCategories());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("maycon_admin_session");
    navigate("/admin/login");
  };

  const handleAddProduct = (p) => { storeService.addProduct(p); loadData(); };
  const handleUpdateProduct = (p) => { storeService.updateProduct(p); loadData(); };
  const handleDeleteProduct = (id) => { storeService.deleteProduct(id); loadData(); };

  const handleAddBanner = (b) => { storeService.addBanner(b); loadData(); };
  const handleUpdateBanner = (b) => { storeService.updateBanner(b); loadData(); };
  const handleDeleteBanner = (id) => { storeService.deleteBanner(id); loadData(); };

  const handleAddCoupon = (c) => { storeService.addCoupon(c); loadData(); };
  const handleToggleCoupon = (id) => { storeService.toggleCoupon(id); loadData(); };

  const handleUpdateOrderStatus = (orderId, status) => { storeService.updateOrderStatus(orderId, status); loadData(); };

  const handleAddCategory = (c) => { storeService.addCategory(c); loadData(); };
  const handleRenameCategory = (id, name) => { storeService.renameCategory(id, name); loadData(); };
  const handleDeleteCategory = (id) => { storeService.deleteCategory(id); loadData(); };

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100 font-sans">
      <AdminSidebar activeTab={adminTab} setActiveTab={setAdminTab} onLogout={handleLogout} />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        {adminTab === "dashboard" && <AdminDashboard orders={orders} products={products} />}
        {adminTab === "products" && (
          <ProductManager
            products={products}
            categories={categories}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
        {adminTab === "categories" && (
          <CategoryManager
            categories={categories}
            products={products}
            onAddCategory={handleAddCategory}
            onRenameCategory={handleRenameCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}
        {adminTab === "banners" && (
          <BannerManager
            banners={banners}
            onAddBanner={handleAddBanner}
            onUpdateBanner={handleUpdateBanner}
            onDeleteBanner={handleDeleteBanner}
          />
        )}
        {adminTab === "orders" && (
          <OrderManager
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onOpenReceipt={(o) => setReceiptOrder(o)}
          />
        )}
        {adminTab === "coupons" && (
          <CouponManager
            coupons={coupons}
            onAddCoupon={handleAddCoupon}
            onToggleCoupon={handleToggleCoupon}
          />
        )}
      </main>

      <NfcReceiptModal
        order={receiptOrder}
        isOpen={!!receiptOrder}
        onClose={() => setReceiptOrder(null)}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT ROUTER
// ─────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      {/* Public store */}
      <Route path="/" element={<StorePage />} />

      {/* Admin login */}
      <Route
        path="/admin/login"
        element={
          <AdminLoginPage
            onLoginSuccess={() => {
              window.location.href = "/admin";
            }}
          />
        }
      />

      {/* Admin panel (protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
