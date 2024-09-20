import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/authSlice";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [info, setInfo] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.email) newErrors.email = "Email is required.";
    if (!credentials.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(login(credentials));
      setInfo(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
  };

  useEffect(() => {
    if (info) setTimeout(() => setInfo(false), 1500);
  }, [info]);

  if (auth.accessToken) 
    return (
      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </div>
    );

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold" htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email Address"
            value={credentials.email}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold" htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter Password"
            value={credentials.password}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded"
        >
          Log in
        </button>
      </form>

      {!auth.accessToken && (
        <div className="text-center text-black-500 mt-4">
          <p className="text-sm">If you don't have an account, please register first</p>
        </div>
      )}

      <div className="text-center text-red-500 mt-2">
        {info ? auth.error : null}
        {auth.status === 'loading' ? "Please wait..." : null}
      </div>
    </div>
  );
};

export default LoginForm;
