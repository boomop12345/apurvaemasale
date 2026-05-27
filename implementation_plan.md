# Backend Architecture & Implementation Plan

Now that the frontend and UI workflows (including WhatsApp booking and the local pickup model) are complete, integrating a backend is the next major step. Currently, all products, users, and orders are hardcoded or stored temporarily in browser memory via React Context.

This plan outlines what a backend will achieve and the technical options for building it.

## ⚠️ User Review Required

Since the checkout process relies on WhatsApp for the actual booking confirmation, we need to clarify what you want the backend to manage. Please review the **Open Questions** and **Architecture Options** below and let me know your preferences!

## Open Questions

1. **What is the primary goal of the backend?** 
   - **A.** To store and manage the product catalog dynamically (so you don't have to edit code to change prices/items).
   - **B.** To create user accounts so customers can log in and see their past orders.
   - **C.** To provide an Admin Panel for you to track orders and update their statuses (e.g., changing an order from "Booked" to "Ready for Pickup").
   - **D.** All of the above.
2. **Where do you plan to host the backend?** (e.g., Vercel, Render, AWS, Firebase, or unsure?)

## Proposed Features

Based on the current frontend, a typical backend implementation would cover:

1. **Database Schema:**
   - **Products Table:** Store spices, pricing, weights, and descriptions.
   - **Users Table:** Store customer profiles, phone numbers, and authentication.
   - **Orders Table:** Track orders, the items bought, and the current status (Booked, Ready for Pickup, Picked Up).
2. **API Layer:**
   - Endpoints for the frontend to fetch the catalog (`GET /api/products`).
   - Endpoints for the frontend to save a new booking when the user clicks the WhatsApp button (`POST /api/orders`).
3. **Authentication:**
   - Secure login for customers to view their order history.
   - Secure login for an Admin account to manage the store.

## Architecture Options

Since your frontend is built with React (Vite), here are the two best paths forward:

### Option 1: Backend-as-a-Service (Supabase or Firebase) - **(Recommended)**
Instead of writing a custom server from scratch, we use a service like Supabase (which provides a PostgreSQL database, authentication, and an API out of the box).
- **Pros:** Extremely fast to set up, secure authentication built-in, easy to connect to React, free tiers are very generous.
- **Cons:** You rely on a third-party platform.

### Option 2: Custom Node.js + Express + MongoDB Server
We build a dedicated backend server folder alongside your frontend.
- **Pros:** 100% custom control over every API route and database query.
- **Cons:** Takes much longer to build, requires setting up authentication (like JWT) manually, and requires deploying two separate things (the frontend and the backend server).

## Next Steps

Once you confirm **what features you want** and **which architecture option** you prefer (Option 1 or Option 2), I will:
1. Initialize the backend project/SDK.
2. Replace the hardcoded `data.ts` mock data with real database connections.
3. Update `AppContext.tsx` to fetch and save data over the network instead of in local state.
