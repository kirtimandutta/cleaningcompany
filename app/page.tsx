import { BeforeAfter } from "@/components/BeforeAfter";
import { BookingModal } from "@/components/BookingModal";
import { Checklist } from "@/components/Checklist";
import { Estimator } from "@/components/Estimator";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { QuoteProvider } from "@/components/QuoteProvider";
import { Reviews } from "@/components/Reviews";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Subscription } from "@/components/Subscription";
import { TrustMatrix } from "@/components/TrustMatrix";

export default function Home() {
  return (
    <QuoteProvider>
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <Estimator />
          <BeforeAfter />
          <Checklist />
          <TrustMatrix />
          <Subscription />
          <Reviews />
        </main>
        <Footer />
        <BookingModal />
      </SmoothScroll>
    </QuoteProvider>
  );
}
