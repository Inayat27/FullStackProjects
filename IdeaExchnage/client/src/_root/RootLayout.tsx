import AnotherTop from "@/components/shared/AnotherTop";
// import Createor from "@/components/shared/Createor";
import LeftSideBar from "@/components/shared/LeftSideBar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <div className="px-5 ">
        <Topbar />
        <LeftSideBar />
      </div>

      <section className="flex flex-1 h-full">
        <div className="w-full h-full">
          {/* AnotherTop Component */}
          <AnotherTop />

          {/* Outlet Component */}
          <Outlet />
        </div>

       
      </section>
    </div>
  );
};

export default RootLayout;
