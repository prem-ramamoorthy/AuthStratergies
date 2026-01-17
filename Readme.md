# Auth Strategies – Backend & Frontend Showcase

A full-stack authentication playground demonstrating multiple authentication strategies implemented from scratch, without relying on third-party authentication frameworks.

This project is designed to learn, compare, and test different authentication mechanisms in real-world conditions.

---

## Live Demo

### Frontend
https://auth-stratergies.vercel.app

### Backend API
https://auth-stratergies-mg2m.vercel.app

---

## Authentication Strategies Implemented

This repository implements and showcases the following authentication mechanisms:

### Password-Based Authentication
- Email and password login
- Secure password hashing
- Basic login and logout flow
- Stateless validation

### Session-Based Authentication
- Server-side session storage
- Secure HTTP-only session cookies
- Session validation and expiration handling
- Logout with session invalidation

### JWT Authentication
- Access token and refresh token flow
- Token expiration handling
- Secure refresh mechanism
- Stateless authentication

### OAuth 2.0 – Google Authentication
- OAuth 2.0 Authorization Code flow
- Google Sign-In integration
- CSRF protection using OAuth state parameter
- Secure JWT issued after OAuth login
- Token stored in HTTP-only cookies

---

## Frontend Features

- Built with React and TypeScript
- Styled using Tailwind CSS
- Single unified interface to:
  - Select an authentication strategy
  - Log in using different methods
  - Access a protected dashboard
- Automatic authentication validation per strategy
- Clear separation of authentication flows

---

## Backend Architecture

- Node.js with Express
- TypeScript-first architecture
- PostgreSQL for data persistence
- Modular and scalable folder structure
- Custom-built authentication logic without Passport, Auth0, or Firebase

### Key Backend Concepts
- Separation of controllers, services, and strategies
- Secure cookie handling
- Token lifecycle management
- OAuth provider abstraction
- Explicit authentication middleware

---

## How to Test

1. Visit the frontend  
   https://auth-stratergies.vercel.app

2. Select an authentication strategy:
   - Password
   - Session
   - JWT
   - Google OAuth

3. Log in using the chosen method

4. Access the protected dashboard

5. Log out and switch strategies freely

---

## Project Goals

- Understand authentication internals
- Implement authentication without abstractions
- Compare trade-offs between different authentication strategies
- Build production-ready authentication flows
- Strengthen backend security fundamentals

---

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- JSON Web Tokens (JWT)
- OAuth 2.0 (Google)

---

## Notes

- This project is intended for learning and demonstration purposes
- Secrets and credentials are managed using environment variables
- OAuth redirect URIs are preconfigured for the hosted domains
