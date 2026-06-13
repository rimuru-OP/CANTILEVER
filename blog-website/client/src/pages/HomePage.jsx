import Layout from "../components/Layout.jsx";
import Hero from "../components/HomePage/Hero.jsx";
import MainContent from "../components/HomePage/MainContent.jsx";

export default function HomePage() {
    return (
        <>
            <Layout>
            <Hero />
            <MainContent />
            </Layout>
        </>
    );
}