import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const Register = () => {
  // 1. State Management
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex items-stretch overflow-x-hidden font-body">
      {/* LEFT SIDE: THE FORM */}
      <motion.main
        className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 bg-surface relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="w-full max-w-md space-y-10 mt-12 lg:mt-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Group */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-on-background tracking-tighter">
              Create Account
            </h1>
            <p className="text-on-surface-variant font-medium text-lg">
              Join the kinetic food experience.
            </p>
          </motion.div>

          {/* Form Container */}
          <motion.form className="space-y-5" variants={itemVariants}>
            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-6 h-6" />
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline-variant/60"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-6 h-6" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline-variant/60"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-6 h-6" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-4 bg-surface-container-low border-none rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline-variant/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <Eye className="w-6 h-6" />
                  ) : (
                    <EyeOff className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className={`hover:cursor-pointer w-full py-5 mt-2 bg-linear-to-br from-primary to-primary-container text-on-primary font-bold text-lg rounded-xl shadow-[0_20px_40px_rgba(161,57,0,0.2)] transition-all duration-300 flex items-center justify-center gap-2`}
            >
              Sign Up <ArrowRight className="w-6 h-6" />
            </button>
          </motion.form>

          {/* Footer Link */}
          <motion.div className="text-center" variants={itemVariants}>
            <p className="text-on-surface-variant font-medium">
              Already have an account?
              <Link
                to="/login"
                className="text-primary font-extrabold underline ml-1"
              >
                Sign In
              </Link>
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="relative flex items-center gap-4"
            variants={itemVariants}
          >
            <div className="h-px grow bg-outline-variant/30"></div>
            <span className="text-xs font-bold text-outline uppercase tracking-widest">
              or
            </span>
            <div className="h-px grow bg-outline-variant/30"></div>
          </motion.div>

          {/* Social Actions Container */}
          <div className="space-y-3 lg:mb-0 mb-16">
            {/* Continue with Google */}
            <motion.button
              type="button"
              variants={itemVariants}
              className="hover:cursor-pointer w-full py-4 bg-surface-container-lowest text-on-surface font-semibold rounded-xl flex items-center justify-center gap-3 shadow-sm hover:bg-white transition-colors active:scale-[0.98] border border-outline-variant/20"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
              </svg>
              Continue with Google
            </motion.button>

            {/* Continue with Apple */}
            <motion.button
              type="button"
              variants={itemVariants}
              className="hover:cursor-pointer w-full py-4 bg-surface-container-lowest text-on-surface font-semibold rounded-xl flex items-center justify-center gap-3 shadow-sm hover:bg-white transition-colors active:scale-[0.98] border border-outline-variant/20"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 384 512"
                fill="currentColor"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              Continue with Apple
            </motion.button>

            {/* Continue with Facebook */}
            <motion.button
              type="button"
              variants={itemVariants}
              className="hover:cursor-pointer w-full py-4 bg-surface-container-lowest text-on-surface font-semibold rounded-xl flex items-center justify-center gap-3 shadow-sm hover:bg-white transition-colors active:scale-[0.98] border border-outline-variant/20"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Continue with Facebook
            </motion.button>
          </div>
        </motion.div>
      </motion.main>

      {/* RIGHT SIDE: IMMERSIVE VISUALS */}
      <motion.section
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="absolute inset-0 bg-tertiary-fixed/20 mix-blend-multiply z-10"></div>
        <img
          alt="Fresh ingredients"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop"
        />

        {/* Brand Overlay */}
        <div className="absolute top-12 right-12 z-20">
          <Link
            to="/"
            className="lg:text-4xl font-extrabold text-primary tracking-tighter"
          >
            QuickFood
          </Link>
        </div>

        <div className="absolute bottom-12 left-12 right-12 z-20">
          <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-white/10">
            <h2 className="text-white text-4xl font-extrabold tracking-tight mb-4 leading-tight font-headline">
              Taste the <br />
              Difference.
            </h2>
            <p className="text-white/80 text-lg max-w-md">
              Sign up today and get access to exclusive offers from top-rated
              restaurants around you.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Register;
