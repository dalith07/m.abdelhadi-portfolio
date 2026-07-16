import HeroSection from "@/components/hero-section";
import AboutPage from "@/components/about-age";
import SocialPage from "@/components/social-page";
import ValuesPage from "@/components/values-page";

export default async function Home() {

    return (
        <>
            <HeroSection />
            <AboutPage />
            <SocialPage />
            <ValuesPage />
        </>
    );
}
