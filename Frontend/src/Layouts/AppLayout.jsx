import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { Outlet } from "react-router";
import { MessageBox } from "../Components/MessageBox";
export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MessageBox />
      <NavBar />
      <main className="w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
