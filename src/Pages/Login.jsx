// src/Pages/Login.jsx
import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../Components/Login/LoginForm";
import RegisterForm from "../Components/Login/RegisterForm";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Box
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/banner.jpg')" }}
    >
      <Box
        className="flex items-center justify-center h-full px-4 py-8"
      >
        <Box
          maxW="md"
          w="full"
          p={8}
          bg="rgba(255, 255, 255, 0.9)" // Slightly transparent white
          borderRadius="lg"
          shadow="xl"
          className="relative z-10"
        >
          {/* Buttons for Login and Register */}
          <Box display="flex" mb={6} borderBottom="2px" borderColor="gray.200">
            <Button
              onClick={() => setActiveTab("login")}
              colorScheme={activeTab === "login" ? "facebook" : "gray"}
              className={`flex-1 py-2 text-lg font-medium ${activeTab === "login" ? "bg-blue-500 text-white" : "text-blue-500"}`}
            >
              Login
            </Button>
            <Button
              onClick={() => setActiveTab("register")}
              colorScheme={activeTab === "register" ? "green" : "gray"}
              className={`flex-1 py-2 text-lg font-medium ${activeTab === "register" ? "bg-green-500 text-white" : "text-green-500"}`}
            >
              Register
            </Button>
          </Box>

          {/* Conditional rendering of LoginForm and RegisterForm */}
          <Box>
            {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
          </Box>

          {/* Go Back button */}
          <Text
            textAlign="center"
            cursor="pointer"
            fontWeight="bold"
            fontSize="lg"
            color="blue.500"
            mt={4}
            className="hover:text-blue-600 transition duration-300"
            onClick={() => navigate("/")}
          >
            &larr; Go Back
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
