import { INITIAL_PRODUCTS, INITIAL_BANNERS, INITIAL_COUPONS, INITIAL_ORDERS } from "../data/initialData";

const STORAGE_KEYS = {
  PRODUCTS: "maycon_store_products",
  BANNERS: "maycon_store_banners",
  COUPONS: "maycon_store_coupons",
  ORDERS: "maycon_store_orders",
  CART: "maycon_store_cart"
};

// Helper for localStorage get & seed
function getStoredData(key, initialData) {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return initialData;
  }
}

function setStoredData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error writing localStorage:", error);
  }
}

export const storeService = {
  // PRODUCTS
  getProducts: () => getStoredData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS),
  saveProducts: (products) => setStoredData(STORAGE_KEYS.PRODUCTS, products),
  addProduct: (product) => {
    const products = storeService.getProducts();
    const newProduct = {
      ...product,
      id: `prod-${Date.now()}`
    };
    const updated = [newProduct, ...products];
    setStoredData(STORAGE_KEYS.PRODUCTS, updated);
    return newProduct;
  },
  updateProduct: (updatedProduct) => {
    const products = storeService.getProducts();
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    setStoredData(STORAGE_KEYS.PRODUCTS, updated);
    return updatedProduct;
  },
  deleteProduct: (id) => {
    const products = storeService.getProducts();
    const updated = products.filter((p) => p.id !== id);
    setStoredData(STORAGE_KEYS.PRODUCTS, updated);
    return updated;
  },

  // HERO BANNERS
  getBanners: () => getStoredData(STORAGE_KEYS.BANNERS, INITIAL_BANNERS),
  saveBanners: (banners) => setStoredData(STORAGE_KEYS.BANNERS, banners),
  addBanner: (banner) => {
    const banners = storeService.getBanners();
    const newBanner = {
      ...banner,
      id: `banner-${Date.now()}`
    };
    const updated = [...banners, newBanner];
    setStoredData(STORAGE_KEYS.BANNERS, updated);
    return newBanner;
  },
  updateBanner: (updatedBanner) => {
    const banners = storeService.getBanners();
    const updated = banners.map((b) => (b.id === updatedBanner.id ? updatedBanner : b));
    setStoredData(STORAGE_KEYS.BANNERS, updated);
    return updatedBanner;
  },
  deleteBanner: (id) => {
    const banners = storeService.getBanners();
    const updated = banners.filter((b) => b.id !== id);
    setStoredData(STORAGE_KEYS.BANNERS, updated);
    return updated;
  },

  // COUPONS
  getCoupons: () => getStoredData(STORAGE_KEYS.COUPONS, INITIAL_COUPONS),
  addCoupon: (coupon) => {
    const coupons = storeService.getCoupons();
    const newCoupon = {
      ...coupon,
      id: `coup-${Date.now()}`,
      code: coupon.code.toUpperCase()
    };
    const updated = [newCoupon, ...coupons];
    setStoredData(STORAGE_KEYS.COUPONS, updated);
    return newCoupon;
  },
  toggleCoupon: (id) => {
    const coupons = storeService.getCoupons();
    const updated = coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c));
    setStoredData(STORAGE_KEYS.COUPONS, updated);
    return updated;
  },

  // ORDERS
  getOrders: () => getStoredData(STORAGE_KEYS.ORDERS, INITIAL_ORDERS),
  createOrder: (orderData) => {
    const orders = storeService.getOrders();
    const randomSeq = Math.floor(10000 + Math.random() * 90000);
    const nfcKeyGen = `352608${Math.floor(10000000000000 + Math.random() * 90000000000000)}`;
    
    const newOrder = {
      id: `MS-${randomSeq}`,
      date: new Date().toISOString(),
      orderStatus: "pendente",
      paymentStatus: orderData.paymentMethod === "pix" ? "paid" : "paid", // auto simulate approval
      nfcKey: nfcKeyGen,
      pixCopyPaste: `00020126580014br.gov.bcb.pix0136mayconstore@pay.com5204000053039865405${orderData.total.toFixed(2)}5802BR5912MAYCON STORE6009SAO PAULO62070503***6304E8A2`,
      ...orderData
    };

    const updated = [newOrder, ...orders];
    setStoredData(STORAGE_KEYS.ORDERS, updated);

    // Decrease product stocks accordingly
    const products = storeService.getProducts();
    const updatedProducts = products.map((p) => {
      const orderItem = orderData.items.find((item) => item.productId === p.id);
      if (orderItem) {
        return {
          ...p,
          stock: Math.max(0, p.stock - orderItem.quantity)
        };
      }
      return p;
    });
    storeService.saveProducts(updatedProducts);

    return newOrder;
  },
  updateOrderStatus: (orderId, newStatus) => {
    const orders = storeService.getOrders();
    const updated = orders.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o));
    setStoredData(STORAGE_KEYS.ORDERS, updated);
    return updated;
  },

  // CART
  getCart: () => getStoredData(STORAGE_KEYS.CART, []),
  saveCart: (cart) => setStoredData(STORAGE_KEYS.CART, cart)
};
