import { Outlet } from "react-router-dom";
import Header from "@components/header/Header";
import { ThemeProvider } from "@components/context/ThemeContext";

function HomeLayout() {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider> 
  );
}

export default HomeLayout;
