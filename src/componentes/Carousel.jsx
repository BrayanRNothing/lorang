import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Banner from "./Banner";
import Footer from "./Footer";

export default function HomeSections() {
    return (
      <main className="static left-0 w-full h-screen snap-y snap-mandatory scroll-smooth"> {/* Espacio para no tapar con la navbar */}
      

        {/* Sección 1 */}
        <section className="relative right-0 items-center justify-center w-full min-h-screen text-slate-900 bg-slate-50 snap-start">
         <Section1 />
        </section>

  
        {/* Sección 2 */}
        <section className="relative items-center justify-center min-h-screen text-slate-900 bg-gradient-to-b from-white to-blue-50">
          <Section2 />
        </section>

  
        {/* Sección 3 */}
        <section className="relative items-center justify-center min-h-screen text-slate-900 bg-gradient-to-b from-slate-50 to-white">
          <Section3 />
        </section>
        {/* Footer */}
        <Footer />
      </main>
    );
  }
  