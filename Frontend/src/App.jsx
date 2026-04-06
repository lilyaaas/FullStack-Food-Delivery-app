import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";
import ScrollToTopOnNavigate from "./utils/ScrollToTopOnNavigate";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <ScrollToTopOnNavigate />
        <Toaster position="bottom-right" reverseOrder={false} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
