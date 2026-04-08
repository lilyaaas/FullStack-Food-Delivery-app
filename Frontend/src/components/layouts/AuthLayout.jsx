import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const AuthLayout = () => {
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  const pageVariants = {
    initial: {
      opacity: 0,
      x: isRegister ? 100 : -100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: isRegister ? -100 : 100,
    },
  };

  const transitionConfig = {
    type: "tween",
    duration: 0.3,
    ease: "easeInOut",
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={transitionConfig}
          className="w-full h-full"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthLayout;
