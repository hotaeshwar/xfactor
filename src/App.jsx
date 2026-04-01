import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Service";
import ClientCarousel from "./components/Clientcarousel";
import OurWork from "./components/Ourwork";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <ClientCarousel />
                <OurWork />
              </>
            } />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}