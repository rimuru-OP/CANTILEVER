import Navbar from "../components/home/Navbar.jsx";
import Hero from "../components/home/Hero.jsx";
import Features from "../components/home/Features.jsx";
import CTA from "../components/home/CTA.jsx";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <CTA />
        </>
    );
}
