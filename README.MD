# Ship Your Expo App Faster ⚡️🔌

**Ship Your Expo App Faster** is a free, open-source template designed for developers to accelerate the process of building high-quality mobile applications. This template is packed with advanced features and tools to ensure that you can develop and deploy your app quickly and efficiently. Whether you're starting a new project or looking to streamline your development workflow, this template has everything you need.

## Table of Contents
- [Features](#features)
  - [Yarn Package Manager](#yarn-package-manager)
  - [Custom Storage](#custom-storage)
  - [Custom Hooks](#custom-hooks)
  - [Type Utilities](#type-utilities)
  - [Expo Router](#expo-router)
  - [Custom Components](#custom-components)
  - [Localization](#localization)
  - [Custom App Icons](#custom-app-icons)
- [Pages Included](#pages-included)
- [Setup Instructions](#setup-instructions)
  - [Environment Variables](#environment-variables)
  - [Clerk Authentication Setup](#clerk-authentication-setup)
- [Pros and Cons](#pros-and-cons)
- [App Preview 📱](#app-preview-)

## Features

### Yarn Package Manager
This template uses Yarn as its package manager, ensuring fast and efficient dependency management.

### Custom Storage
Experience faster storage solutions with custom storage, significantly outperforming traditional async storage methods.

### Custom Hooks
Leverage a set of powerful custom hooks, including but not limited to:
- **Network Info Check**
- **useTranslation**
- **useDeviceOrientation**

These are just a few examples—explore more within the template!

### Type Utilities
Built-in type utilities streamline your development process with validation for sign-up/sign-in pages.

### Expo Router
Implement file-based routing using TypeScript (TSX) with Expo Router for an intuitive and scalable project structure.

### Custom Components
Designed for both TypeScript (TS) and JavaScript (JS) developers, this template includes over 15+ custom components in JS, with more available in TS.

### Localization
Supports up to 8 languages across all pages, allowing your app to reach a broader audience with full internationalization.

### Custom App Icons
Choose custom app icons tailored for your customers, giving your app a unique and professional appearance.

## Pages Included
This template comes with a full suite of pre-built pages:
- **Onboarding**
- **Sign In**
- **Sign Up**
- **Verify Email** (with 6-digit OTP sent via email)
- **Tabs Page** with Drawer Navigation

## Setup Instructions

### Environment Variables
To get started, create a `.env` file in the root directory of your project and set the following environment variable:
``EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=``


### Clerk Authentication Setup
To run this app, you need to create an account on [Clerk](https://clerk.dev). After creating an account, set up a new application with only email and username. Navigate to the "Expo" section on your Clerk dashboard to find your publishable key.

**Important**: Do not install any additional dependencies as Clerk is pre-configured in this project.

## Pros and Cons

### Pros
- **Seamless Integration with Clerk**: The template is tightly integrated with Clerk, offering a hassle-free authentication setup.
- **Easy to Implement**: Clerk’s authentication system can be set up with minimal effort, allowing you to focus on your app's core functionality.
- **Comprehensive User Management**: With Clerk, you get out-of-the-box user management features, including sign-up, sign-in, and email verification, ensuring a secure and reliable user experience.

### Cons
- **Limited to Clerk Authentication**: The template is tightly integrated with Clerk, so switching to a different authentication provider may require additional setup.


## App Preview 📱

<img src="https://github.com/esiltu/ship-expo-faster/blob/main/assets/app-preview/change_language_tabs.png" width="300" alt="Change Language Tabs" />
<img src="https://github.com/esiltu/ship-expo-faster/blob/main/assets/app-preview/chinese-i18n-showcase.png" width="300" alt="Chinese i18n Showcase" />
<img src="https://github.com/esiltu/ship-expo-faster/blob/main/assets/app-preview/home_tabs.png" width="300" alt="Home Tabs" />
<img src="https://github.com/esiltu/ship-expo-faster/blob/main/assets/app-preview/login.png" width="300" alt="Login" />
<img src="https://github.com/esiltu/ship-expo-faster/blob/main/assets/app-preview/onboarding.png" width="300" alt="Onboarding" />
<img src="https://github.com/esiltu/ship-expo-faster/blob/main/assets/app-preview/otp-code-page.png" width="300" alt="OTP Code Page" />
<img src="https://github.com/esiltu/ship-expo-faster/blob/main/assets/app-preview/register.png" width="300" alt="Register" />
<img src="https://github.com/esiltu/ship-expo-faster/blob/main/assets/app-preview/settings_tabs.png" width="300" alt="Settings Tabs" />
