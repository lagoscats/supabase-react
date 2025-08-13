import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSessionContext } from '@supabase/auth-helpers-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import VendorDashboard from './pages/VendorDashboard';
import VendorProfile from './pages/VendorProfile';
import VendorListings from './pages/VendorListings';
import VendorPayouts from './pages/VendorPayouts';
import BecomeVendor from './pages/BecomeVendor';
import CartPage from './pages/CartPage';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import AddProduct from './pages/AddProduct';
import ManageProducts from './pages/ManageProducts';
import AddListing from './pages/AddListing';
import EditListing from './pages/EditListing';
import CheckoutPage from './pages/CheckoutPage';
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import PaymentPage from "./pages/PaymentPage";

import { CartProvider } from './context/CartContext';

import './App.css';

// PrivateRoute to protect authenticated routes
const PrivateRoute = ({ children }) => {
  const { session } = useSessionContext();
  return session ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        {/* 
          Use min-h-screen to ensure the container fills full viewport height,
          and set light/dark backgrounds for the entire app.
          Also set text color for light/dark mode.
        */}
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Navbar />

          {/* Make main grow to fill available space between navbar and footer */}
          <main className="flex-grow pt-16">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/vendor-listings" element={<VendorListings />} />
              <Route path="/become-vendor" element={<BecomeVendor />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/vendor/:vendorId" element={<VendorProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />


              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/vendor"
                element={
                  <PrivateRoute>
                    <VendorDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/vendor/payouts"
                element={
                  <PrivateRoute>
                    <VendorPayouts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/vendor/add-product"
                element={
                  <PrivateRoute>
                    <AddProduct />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/manage-products"
                element={
                  <PrivateRoute>
                    <ManageProducts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-listing"
                element={
                  <PrivateRoute>
                    <AddListing />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-listing/:id"
                element={
                  <PrivateRoute>
                    <EditListing />
                  </PrivateRoute>
                }
              />

              {/* Catch-all redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
