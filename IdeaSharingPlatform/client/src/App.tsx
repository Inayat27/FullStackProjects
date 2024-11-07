import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import Signup from "./_auth/Forms/Signup";
import Signin from "./_auth/Forms/Signin";
import RootLayout from "./_root/RootLayout";
import { Home, Contribute } from "./Pages";
import { Profile } from "./components/shared";
import EditProfileForm from "./components/ui/EditProfileForm";

function App() {
  return (
    <main className="h-screen overflow-x-hidden">
      <Routes>
        {/* //public routes */}
        <Route element={<AuthLayout />}>
          <Route index element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Route>

        {/* protected Routes */}

        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/contribute" element={<Contribute />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/Edit-profile" element={<EditProfileForm />} />
        </Route>
        {/* <Route element={<ProfileLayout />}> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        {/* </Route> */}
      </Routes>
    </main>
  );
}

export default App;
