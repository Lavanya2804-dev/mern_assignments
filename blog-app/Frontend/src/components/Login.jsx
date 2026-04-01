import { useForm } from "react-hook-form";
import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  mutedText,
  linkClass,
} from "../styles/common";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function Login() {
  const { register, handleSubmit } = useForm();

  const login = useAuth((state) => state.login);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const error = useAuth((state) => state.error);

  const navigate = useNavigate();

  // login function
  const onUserLogin = async (userCredObj) => {
    await login(userCredObj);
  };

  // redirect after login
  useEffect(() => {
    if (isAuthenticated) {
      if (currentUser?.role === "USER") {
        toast.success("Logged in successfully 🎉");
        navigate("/user-profile");
      }

      if (currentUser?.role === "AUTHOR") {
        toast.success("Welcome Author ✍️");
        navigate("/author-profile");
      }

      if (currentUser?.role === "ADMIN") {
        toast.success("Welcome Admin ⚙️");
        navigate("/admin-dashboard");
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <div className={`${pageBackground} flex items-center justify-center py-16 px-4`}>
      <div className={formCard}>
        {/* Title */}
        <h2 className={formTitle}>Sign In</h2>

        {/* error message */}
        {error && <p className={errorClass}>{error}</p>}

        <form onSubmit={handleSubmit(onUserLogin)}>
          {/* Email */}
          <div className={formGroup}>
            <label className={labelClass}>Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              className={inputClass}
              {...register("email", { required: "Email is required" })}
            />
          </div>

          {/* Password */}
          <div className={formGroup}>
            <label className={labelClass}>Password</label>

            <input
              type="password"
              placeholder="••••••••"
              className={inputClass}
              {...register("password", { required: "Password is required" })}
            />
          </div>

          {/* Forgot password */}
          <div className="text-right -mt-2 mb-4">
            <NavLink to="/forgot-password" className={`${linkClass} text-xs`}>
              Forgot password?
            </NavLink>
          </div>

          {/* Submit */}
          <button type="submit" className={submitBtn}>
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className={`${mutedText} text-center mt-5`}>
          Don't have an account?{" "}
          <NavLink to="/register" className={linkClass}>
            Create one
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;