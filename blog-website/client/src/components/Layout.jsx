import Header from "./HomePage/Header.jsx";
import Footer from "./HomePage/Footer.jsx";

export default function Layout({ children }) {

   return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
   );
}