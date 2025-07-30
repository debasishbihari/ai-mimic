# Gemini-Style Conversational AI Chat Application

## Overview
This is a fully functional, responsive frontend for a Gemini-style conversational AI chat application built with **Next.js 15 (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**. The app simulates an OTP-based login flow, chatroom management, AI messaging, image uploads, and modern UX/UI features like  toast notifications, and keyboard accessibility. It uses client-side state management with **Zustand**, form validation with **React Hook Form** and **Zod**, and simulates AI responses with `setTimeout` for a realistic chat experience.

## Features

### Authentication
- **OTP-based Login/Signup**: Users log in using a phone number with country code selection, validated via **React Hook Form** and **Zod**.
- **Country Code Fetching**: Retrieves country dial codes from the [REST Countries API](https://restcountries.com/).
- **Simulated OTP**: Generates a 4-digit OTP with a `setTimeout` delay, displayed via toast notifications using **Sonnar**.
- **LocalStorage Persistence**: Stores authentication state using **Zustand** with `persist` middleware.

### Dashboard
- **Chatroom Management**: Create and delete chatrooms with confirmation prompts and toast notifications.
- **Debounced Search**: Filter chatrooms by title using a custom `useDebounce` hook (300ms delay).
- **Responsive Design**: Optimized for mobile and desktop with Tailwind CSS.

### Chatroom Interface
- **Chat UI**: Displays user and AI messages with timestamps, supporting text and image uploads (base64 or preview URL).
- **Typing Indicator**: Shows "Gemini is typing..." when awaiting AI responses.
- **Simulated AI Responses**: Uses `setTimeout` with throttling (2-second limit) to simulate AI replies with dummy data.
- **Auto-Scroll**: Scrolls to the latest message on new messages.
- **Reverse Infinite Scroll**: Loads older messages with client-side pagination (20 messages per page) using dummy data.
- **Copy-to-Clipboard**: Hover-activated button to copy message content, with accessibility enhancements (ARIA labels).
- **Loading Skeletons**: Displays animated placeholders during message loading.

### Global UX Features
- **Mobile Responsive**: Fully responsive design using Tailwind CSS.
- **Dark Mode**: Toggle between light and dark themes, persisted in `localStorage`, with custom color palette.
- **Toast Notifications**: Feedback for actions like OTP sent, message sent, and chatroom deletion using **Sonnar**.
- **Keyboard Accessibility**: Supports Tab navigation, Enter/Space key actions, and ARIA attributes for key components.
- **LocalStorage**: Persists auth and chatroom data with **Zustand**.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **State Management**: Zustand with `persist` middleware
- **Form Validation**: React Hook Form + Zod
- **Styling**: Tailwind CSS with custom dark mode colors
- **Icons**: Lucide React
- **Notifications**: Sonner
- **API**: REST Countries API (for country codes)
- **Message Handling**: Simulated AI responses with `setTimeout` and throttling
- **Deployment**: Ready for Vercel or Netlify

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
