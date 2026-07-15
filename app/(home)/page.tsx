import ConnectElevate from "@/components/connect-elevate";
import CorePillars from "@/components/core-pillars";
import HeroSection from "@/components/hero-section";
import QuoteSection from "@/components/quote-section";

export default async function Home() {

    return (
        <>
            <HeroSection />
            <CorePillars />
            <ConnectElevate />
            <QuoteSection />
        </>
    );
}
