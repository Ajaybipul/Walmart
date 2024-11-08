# Walmart

**Description:**
This project is a fully responsive e-commerce frontend interface inspired by Walmart. It allows users to browse products, manage their shopping carts, and authenticate securely via an API-based authentication system. Users can explore the platform without logging in, but actions such as adding products to the cart or viewing the wishlist require authentication. The app leverages Redux Toolkit for state management, Chakra UI for a sleek design, and ensures seamless functionality across all devices. LocalStorage is used to persist cart data between sessions.

**[Netlify Deployment: Live Demo]([https://benevolent-otter-8338e7.netlify.app/](https://relaxed-gumption-d49db8.netlify.app/)**

**Tech Stack:**
- **React.js:** Offers a modular, component-driven UI architecture.
- **Redux Toolkit:** Manages global state for cart, authentication, and product data.
- **Tailwind CSS & Chakra UI:** Combines utility-first styling and Chakra’s modern UI components for a responsive and intuitive user interface.
- **React Router:** Ensures smooth navigation between pages.
- **React Icons:** Provides consistent and modern iconography across the application.
- **Git:** Facilitates efficient version control .

**Key Features:**

1. **Walmart-Inspired UI:**  
   The application’s design draws inspiration from Walmart’s clean, user-friendly interface. It is intuitive and straightforward, focusing on enhancing user experience with clear navigation and layout.

2. **User Authentication:**  
   Secure JWT-based login and signup functionality is implemented via the Platzi Fake API. Users can register, log in, and maintain their session across different tabs and browsers. Authentication details are managed directly in Redux, without the need for a `.env` file.

3. **Cart Management with LocalStorage:**  
   Users can add, remove, and view items in their shopping cart. The cart state is efficiently managed through Redux and persisted using localStorage, ensuring that users’ cart data remains intact even after they close or refresh the browser.

4. **Product Browsing Without Login:**  
   Users can browse the product catalog without needing to log in. However, when they attempt to add items to the cart or visit the wishlist page, they are prompted to log in or sign up.

5. **Authentication Redirects:**  
   The app efficiently handles redirects to the authentication page for unauthenticated users trying to perform restricted actions like adding items to the cart or visiting the wishlist.

6. **State Management:**  
   Redux Toolkit manages state across the entire application. Cart data, user information, product details, and authentication tokens are handled globally, providing a seamless user experience. This also allows for easier debugging and better performance.

7. **Responsive Design with Tailwind CSS and Chakra UI:**  
   The app is designed to be fully responsive. Tailwind CSS provides utility-first styling, while Chakra UI contributes modern, responsive components, ensuring the interface looks polished and functions well across all devices.

8. **Search Functionality:**  
   The integrated search bar allows users to find products quickly. Real-time filtering and suggestions ensure a smooth and effective search experience, guiding users to their desired items.

9. **Product Carousel:**  
   With React Slick and Slick Carousel, product displays are visually engaging. Products are showcased dynamically, making the browsing experience more interactive and attractive.

**Setup and Access Instructions:**

1. **Prerequisites:**  
   - Node.js installed  
   - npm for managing dependencies  
   - API access from [Platzi Fake API](https://fakeapi.platzi.com/)

2. **Clone the Repository:**  
   ```bash
   git clone https://github.com/Ajaybipul/Walmart.git
   ```

3. **Navigate to the Project Directory:**  
   ```bash
   cd Walmart
   ```

4. **Install Dependencies:**  
   ```bash
   npm install
   ```

5. **Run the Application:**  
   ```bash
   npm run dev
   ```

6. **Open the App:**  
   Visit `http://localhost:5173` to view it locally.

**Authentication API:**
- **Login:** Users authenticate by sending a POST request to `/auth/login/` with their credentials. This API returns JWT tokens for secure authentication.
- **Session Handling:** The app securely manages user sessions by storing tokens in Redux and localStorage. API requests requiring authentication are sent with the access token in the Authorization header.

**Development Process:**

1. **Planning & Design:**  
   The UI was planned with Walmart as the design inspiration. The clean layout, intuitive navigation, and product display features were central to the user experience. Tailwind CSS was chosen for its flexibility in creating responsive layouts, while Chakra UI provided modern, accessible components that enhanced the overall design.

2. **Authentication Setup:**  
   The Platzi Fake API was used to implement JWT-based authentication, allowing for secure login and signup functionalities. Authentication state is persisted across tabs using localStorage and Redux.

3. **Cart & Product Management:**  
   Redux Toolkit was utilized for managing the global state of the cart and products. LocalStorage ensures that users’ cart data is saved between sessions, enhancing user experience by keeping their cart intact after logging out or refreshing the page.

4. **Search Functionality:**  
   A powerful search component was implemented, allowing users to filter products in real-time based on their input. This significantly improves the discoverability of products and helps users find items efficiently.

**Challenges & Solutions:**

- **Persistent Authentication Across Tabs:**  
   **Issue:** Users were being logged out when they switched between tabs.  
   **Solution:** This issue was resolved by using localStorage to persist JWT tokens and Redux to manage the authentication state across multiple tabs.

- **Responsive UI Design:**  
   **Issue:** Ensuring the UI remained consistent across different screen sizes was a challenge.  
   **Solution:** Tailwind CSS provided responsive utility classes, and Chakra UI’s responsive components helped maintain a consistent design across all devices.

- **Authentication Redirects:**  
   **Issue:** Unauthenticated users encountered infinite redirects when trying to add items to the cart.  
   **Solution:** Redux was used to manage the user state more effectively, preventing unnecessary redirects and improving the overall flow.

**Key Learnings:**

- **State Management with Redux Toolkit:**  
   This project deepened my understanding of global state management using Redux Toolkit, especially for handling complex states like cart data and user authentication.

- **Authentication and Session Persistence:**  
   Working with JWT tokens and localStorage helped improve my skills in handling user sessions securely and efficiently across different browser tabs.

- **Responsive UI Design:**  
   By integrating both Tailwind CSS and Chakra UI, I gained valuable experience in designing responsive, modern interfaces that adapt to various screen sizes and devices.

**Author:**  
**Ajay Yadav**

