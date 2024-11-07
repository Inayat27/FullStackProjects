import SignInForm from "./_auth/forms/SignInForm";
import SignupForms from "./_auth/forms/SignupForms";
import AuthLayout from "./_auth/AuthLayout";
import { Home } from "./_root/pages";
import "./global.css";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public ROutes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignupForms />} />
        </Route>

        {/* private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster/>
    </main>
  );
}

export default App;
