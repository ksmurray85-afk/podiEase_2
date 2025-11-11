# PodiEase - Podiatrist-Led E-Commerce Platform

## Overview
PodiEase is a professional e-commerce platform for an Australian podiatrist-led online store specializing in plantar fasciitis relief products. The platform aims to establish medical authority and trust while providing a seamless shopping experience for customers. Its vision is to become Australia's most trusted authority in plantar fasciitis relief, empowering individuals to reclaim their mobility, comfort, and quality of life through clinically informed products.

## User Preferences
I prefer iterative development, so please provide updates and allow for feedback at each significant step. I also prefer clear and concise explanations, avoiding overly technical jargon where possible. I value transparency in the development process and appreciate being informed before major architectural changes or significant feature implementations.

## System Architecture
The platform is built with a modern web stack:
- **Frontend:** React with TypeScript and Vite for a fast and type-safe development experience.
- **UI/UX:** Tailwind CSS for utility-first styling and Shadcn UI for pre-built, accessible components. The design adheres to a professional, gender-neutral, and earthy aesthetic, utilizing a color palette of rich browns, warm tans, creams, and dark navies. Typography is Open Sans.
- **State Management:** React Query for server state and local state for UI management.
- **Routing:** Wouter for client-side navigation.
- **Backend (Planned):** Express.js for API services, integrating with the Shopify Storefront API.
- **E-Commerce:** Shopify integration handles product catalog, cart management, and secure checkout.
- **Database:** PostgreSQL is used for persistence of customer engagement data such as reviews, testimonials, newsletter subscriptions, and quiz data.
- **Core Features:** Includes professional navigation, impactful hero section with trust badges, podiatrist's about section, featured products, a full shop page with search, a shopping cart with an Australian shipping calculator, and responsive design.
- **Customer Engagement:** Key features include a product comparison tool, a Foot Health Quiz for personalized recommendations and lead generation, a reviews and testimonials system, a newsletter subscription, and an educational resources library.
- **System Design:** Follows a component-based architecture for the frontend, with clear separation of concerns between UI components, pages, and utility libraries. Data models are defined for products, cart items, reviews, testimonials, newsletter subscriptions, and quiz-related entities. All components are designed for responsiveness and SEO optimization.

## External Dependencies
- **Shopify Storefront API:** For product catalog synchronization, cart management, and secure checkout processing (podiease1.myshopify.com).
- **PostgreSQL:** Used as the primary database for storing reviews, testimonials, newsletter subscriptions, and quiz session/answer data.
- **Resend Email Service:** Configured with verified mail.podiease.com subdomain for automated quiz results and newsletter welcome emails.
- **Vite:** Frontend tooling for development and bundling.
- **Tailwind CSS:** Utility-first CSS framework.
- **Shadcn UI:** Component library built on Tailwind CSS.
- **React Query:** Data fetching and state management library.
- **Wouter:** Lightweight React router.
- **Express.js:** Backend server framework.

## Deployment Status
- **Production Deployment:** Autoscale deployment on Replit (active)
- **Production URL:** https://podi-ease-shopify-snack3takes.replit.app
- **Custom Domain:** podiease.com (registered with Hostinger)
  - **DNS Status:** A and TXT records configured to point to Replit
  - **Current Blocker:** Domain using parking nameservers (ns1/ns2.dns-parking.com) instead of active Hostinger nameservers
  - **Resolution Required:** Activate domain in Hostinger to switch from parking nameservers to active nameservers
  - **Once Activated:** Custom domain will load the Replit deployment automatically
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Email Service:** Resend via mail.podiease.com (verified, fully functional)

## Database Contents
- Newsletter subscribers: 6 records
- Quiz completions: 3 sessions with personalized 7-day programs
- Quiz answers: 18 detailed responses
- All quiz participants received automated emails with their personalized plans