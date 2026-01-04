# 🚀 MomentumX

**Move from ideas to execution with structured collaboration.**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://momentumx-live.netlify.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MomentumX is a problem-first platform designed to bridge the gap between "I have an idea" and "We have an MVP." By enforcing structure from the very first proposal, it helps entrepreneurs, developers, and designers find the right collaborators and build with intention.

---

## 🌟 Key Features

- **🎯 Problem-First Discovery**: Browse real-world challenges filtered by domain and stage.
- **🏗️ Structured Proposals**: A guided multi-step stepper to define vision, roles, and milestones.
- **🤝 Intelligent Team Formation**: View open roles, request to join, and manage team members.
- **📈 Visual Progress**: Track lifecycle stages from _Idea_ to _MVP_ with intuitive progress indicators.
- **🌓 Adaptive Design System**: Fully responsive dark/light mode with a custom-built component library.
- **🔐 Secure Auth**: Seamless Firebase integration supporting Google and Email/Password sign-in.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) & [SCSS](https://sass-lang.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (with persistent storage)
- **Authentication**: [Firebase Auth](https://firebase.google.com/products/auth)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Custom Atomic Design System (Atoms, Molecules, Organisms)

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/momentumx.git
cd momentumx
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Launch Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 📂 Project Structure

```text
src/
├── app/             # Next.js App Router (Pages & API)
├── assets/          # Static assets (Images, Logos)
├── components/      # Atomic Design System
│   ├── atoms/       # Base components (Button, Badge, Input)
│   ├── molecules/   # Compound components (Card, FormField)
│   └── organisms/   # Complex sections (Navbar, Stepper)
├── lib/             # Utilities, Firebase config, & Mock data
├── store/           # Zustand stores for global state
└── styles/          # Global styles & Tailwind configuration
```

---

## 🌐 Deployment

The project is configured for seamless deployment on **Netlify** with automatic Next.js plugin support.

**Live URL**: [https://momentumx-live.netlify.app/](https://momentumx-live.netlify.app/)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Built with ❤️ for the builder community.</p>
