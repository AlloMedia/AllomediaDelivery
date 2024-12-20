import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layouts/dashboard";
import { filterRoutesByRole } from "../utils/routeUtils";
import { useAuth } from "../context/auth/AuthContext";
import allRoutes from "../constants/sidebarNavigation";
import ProtectedRoute from "../components/ProtectedRoute";
import AddRestaurant from "../views/superadmin/Restaurants/AddRestaurant";
import EditRestaurant from "views/superadmin/Restaurants/EditRestaurant";
import DetailRestaurant from "views/superadmin/Restaurants/DetailRestaurant";


import Register from "../views/auth/register";
import Login from "../views/auth/login";
import Logout from "../views/auth/logout";
import OtpVerification from "../views/auth/otp-verification";
import ForgotPassword from "../views/auth/forgot-password";
import ResetPassword from "../views/auth/reset-password";
import NotFound from "../views/errors/404-error";
import RoleSelection from "../components/auth/RoleSelection";
import PublicRoute from "../components/auth/PublicRoute";
import Index from "../views";
import HomeLayout from "../layouts/home";
import Cart from "../views/client/Cart";
import Items from "components/items/itemsComponent";
const Router = () => {
  const { user, isLoading } = useAuth();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (user && user.role) {
      const filteredRoutes = filterRoutesByRole(allRoutes, user.role);
      setRoutes(filteredRoutes);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="flex items-center justify-center">
          <svg
            className="text-current -ml-1 mr-3 h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      </div>
    );
  }

  return (
    <Routes>
      {/* Protected Dashboard Routes */}
      {user && user.role && (
        <Route path={`/${user.role.toLowerCase()}`} element={<Layout />}>
          {/* Default redirect */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Dynamic routes based on user role */}
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute
                  Component={route.component}
                  roles={route.roles}
                />
              }
            />
          ))}
        </Route>
      )}

      {/* Public Routes */}
      <Route path="/cart/:userId" element={<Cart />} />
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Index />} />
        <Route
          path="/role-selection"
          element={
            <PublicRoute>
              <RoleSelection />
            </PublicRoute>
          }
        />
        <Route
          path="/otp-verification"
          element={
            <PublicRoute>
              <OtpVerification />
            </PublicRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* Auth Routes */}
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/items"
        element={
          <PublicRoute>
            <Items />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="/logout" element={<Logout />} />

      {/* Root redirect for authenticated users */}
      {user && user.role && (
        <Route
          path="/"
          element={<Navigate to={`/${user.role.toLowerCase()}`} replace />}
        />
      )}

      <Route path="/add-restaurant" element={<AddRestaurant />} />
      <Route path="/restaurant-details/:restaurantId" element={<DetailRestaurant />} />
      <Route
        path="/edit-restaurant/:restaurantId"
        element={<EditRestaurant />}
      />

      {/* Catch all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router; 