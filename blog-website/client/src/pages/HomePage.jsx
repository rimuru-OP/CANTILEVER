import Header from "../components/HomePage/Header.jsx";
import Footer from "../components/HomePage/Footer.jsx";
import Hero from "../components/HomePage/Hero.jsx";
import LatestPosts from "../components/HomePage/LatestPosts.jsx";
import Sidebar from "../components/HomePage/Sidebar.jsx";
export default function HomePage(){
    return (
        <>
            <Header />
            <Hero />
            <LatestPosts />
            <Sidebar />
            <Footer />
        </>
    );
}