# Walmart


**Description:**
This project is a fully responsive e-commerce frontend interface, designed with inspiration from Walmart. Users can browse products, manage their carts, and authenticate securely using an API-based authentication system. While users can freely explore products without logging in, authentication is required for cart and wishlist actions. The project utilizes Redux Toolkit for state management, Tailwind CSS for styling, and ensures seamless performance across devices.

**[Netlify Deployment: Live Demo](https://benevolent-otter-8338e7.netlify.app/)**

**Tech Stack:**
- **React.js:** Interactive and modular component-based UI.
- **Redux Toolkit:** Global state management for cart, product data, and authentication.
- **Tailwind CSS:** Utility-first responsive styling.
- **React Router:** For dynamic page navigation.
- **React Icons:** Consistent and modern iconography.
- **React Slick & Slick Carousel:** For displaying product carousels.
- **Git:** Version control for efficient collaboration.

**Key Features:**
- **Walmart-Inspired Frontend:** A clean, intuitive design with Walmart-like elements.
- **User Authentication:** Secure login and signup with JWT tokens via an API.
- **Cart Management:** Smooth add/remove cart functionalities with persistent states using Redux.
- **Product Browsing Without Login:** Users can freely browse without logging in.
- **Authentication Redirect:** Unauthenticated users attempting cart actions are redirected to login/signup.
- **State Management:** Redux Toolkit handles global state across all components.
- **Responsive Design:** Tailwind CSS ensures the UI adapts to all screen sizes.
- **Search Functionality:** Integrated search bar for easy product filtering.

**Setup and Access Instructions:**

**Prerequisites:**
- Node.js installed
- npm for managing dependencies
- API access from [Platzi Fake API](https://fakeapi.platzi.com/)

**Steps to Access the App:**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ajaybipul/Walmart.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Walmart
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Configure environment variables:**
   Create a `.env` file in the root directory and add:
   ```
   VITE_API_BASE_URI=https://fakeapi.platzi.com
   ```

5. **Run the application:**
   ```bash
   npm run dev
   ```

6. **Open the app:**
   Visit `http://localhost:5173` to view it locally.

**Authentication API:**
- **Login:** Send a POST request to `/auth/login/` with user credentials to receive JWT tokens for authentication.
- **Session Handling:** Secure API requests using the access token in the Authorization header.

**Development Process:**
1. **Planning & Design:**
   - UI was inspired by Walmart for a clean and intuitive shopping experience.
   - Tailwind CSS was chosen for its responsive utility classes.

2. **Authentication Setup:**
   - JWT-based authentication via Platzi Fake API.
   - Session persistence ensures users remain logged in across tabs.

3. **Cart & Product Management:**
   - Redux Toolkit is used for managing cart and product states with persistence.

4. **Search Functionality:**
   - Search bar allows real-time product filtering based on user input.

**Challenges Faced & Solutions:**
- **Persistent Authentication:**
   - Issue: Users logged out when switching tabs.
   - Solution: Session persistence using JWT tokens and Redux for state management.

- **Responsive UI:**
   - Issue: Ensuring UI worked consistently across all screen sizes.
   - Solution: Tailwind CSS provided responsive utility classes to adapt to different devices.

- **Authentication Redirects:**
   - Issue: Infinite redirects when unauthenticated users tried to add items to the cart.
   - Solution: Managed the user state efficiently to avoid unnecessary redirects by checking authentication status in Redux.

**Key Learnings:**
- Strengthened knowledge of state management using Redux Toolkit.
- Gained experience with JWT authentication and session handling.
- Improved handling of responsive design using Tailwind CSS.

**Authors:**
Walmart Clone by [Ajay Yadav]


