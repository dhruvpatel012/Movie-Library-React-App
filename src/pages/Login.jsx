import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const storedUser = localStorage.getItem("cineviaUser");

    const user = storedUser ? JSON.parse(storedUser) : null;

    const isValidUser =
      user &&
      user.email.toLowerCase() === data.email.toLowerCase() &&
      user.password === data.password;

    isValidUser
      ? (() => {
          localStorage.setItem("cineviaAuth", "true");

          dispatch({
            type: "LOGIN",
            payload: user,
          });

          navigate("/");
        })()
      : setFormError("Invalid email or password.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080d10] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5c542] text-[#0c1114]">
              <span className="text-lg font-bold">C</span>
            </div>

            <span className="text-2xl font-bold tracking-wide text-white">
              cinevia
            </span>
          </Link>

          <h1 className="mt-8 text-2xl font-semibold text-white">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to continue to your movie library.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-2xl border border-white/5 bg-[#0c1114] p-6 shadow-2xl sm:p-8"
        >
          {formError ? (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{formError}</p>
            </div>
          ) : null}

          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`h-12 w-full rounded-xl border bg-white/5 px-4 text-sm text-white outline-none placeholder:text-gray-600 ${
                errors.email
                  ? "border-red-500/50"
                  : "border-white/5 focus:border-[#f5c542]/50"
              }`}
            />

            {errors.email ? (
              <p className="mt-2 text-xs text-red-400">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`h-12 w-full rounded-xl border bg-white/5 px-4 pr-12 text-sm text-white outline-none placeholder:text-gray-600 ${
                  errors.password
                    ? "border-red-500/50"
                    : "border-white/5 focus:border-[#f5c542]/50"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password ? (
              <p className="mt-2 text-xs text-red-400">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-[#f5c542] text-sm font-semibold text-black transition hover:bg-[#ffd45c]"
          >
            Login
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#f5c542] hover:underline"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
