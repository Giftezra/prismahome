import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import {
  FaCar,
  FaMobile,
  FaClock,
  FaShieldAlt,
  FaStar,
  FaDownload,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaHeart,
} from "react-icons/fa";
import "./App.css";

// Import components
import PaymentReturn from "./components/PaymentReturn";
import PrivacyPolicy from "./components/PrivacyPolicy";

// Import local images
import heroImage from "./nice car.jpg";
import carPolishing from "./Car polishing.jpg";
import detailingVan from "./detailingvan.jpg";
import interiorCleaning from "./interior cleaning.jpg";
import tireCleaning from "./tire cleaning.jpg";
import cleaning from "./cleaning.jpg";

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Modern Hero Section inspired by GoDetail
const HeroSection = styled.section`
  background: linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 2rem 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  font-style: italic;
  letter-spacing: -0.02em;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h2`
  font-size: 4rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.1;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  font-style: italic;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  min-width: 120px;

  &:hover {
    background: #333;
  }
`;

const SecondaryButton = styled(motion.button)`
  background: #e3f2fd;
  color: #1a1a1a;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  min-width: 120px;

  &:hover {
    background: #bbdefb;
  }
`;

// Problems Section
const ProblemsSection = styled.section`
  padding: 5rem 0;
  background: #f8f9fa;
  color: #1a1a1a;
`;

const ProblemsContent = styled.div`
  position: relative;
  z-index: 2;
`;

const ProblemsTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: #1a1a1a;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ProblemsSubtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 4rem;
  color: #666;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ProblemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ProblemCard = styled(motion.div)`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ProblemIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
`;

const ProblemTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

const ProblemDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
`;

// Service Packages Section
const PackagesSection = styled.section`
  padding: 4rem 0;
  background: #f8f9fa;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 3rem;
`;

const PackageTabs = styled.div`
  display: flex;
  margin-bottom: 2rem;
  background: #e3f2fd;
  border-radius: 25px;
  padding: 4px;
  overflow-x: auto;
  gap: 2px;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Add subtle gradient fade on edges to indicate scrollability */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(to right, #e3f2fd, transparent);
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(to left, #e3f2fd, transparent);
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 2px;
    border-radius: 20px;
  }
`;

const TabButton = styled.button`
  background: ${(props) => (props.active ? "white" : "transparent")};
  color: ${(props) => (props.active ? "#1a1a1a" : "#666")};
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  min-width: 80px;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    min-width: 70px;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
    min-width: 60px;
  }
`;

const PackageCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2rem auto;
`;

const PackageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const PackageTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

const PackageBadge = styled.span`
  background: #ff6b35;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const PackageImage = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PackageDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const PackageInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const PackageDuration = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const PackagePrice = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2196f3;
`;

const ServiceList = styled.div`
  margin-bottom: 2rem;
`;

const ServiceCategory = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ServiceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.95rem;
`;

// Reviews Section
const ReviewsSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const ReviewCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.2rem;
  margin-bottom: 1rem;
`;

const ReviewText = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const ReviewCount = styled.p`
  color: #666;
  font-size: 0.9rem;
  text-decoration: underline;
  margin-bottom: 1rem;
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #4caf50;
  font-size: 0.9rem;
  font-weight: 600;
`;

// Mobile Features Section
const MobileSection = styled.section`
  padding: 4rem 0;
  background: #f8f9fa;
`;

const MobileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MobileContent = styled.div`
  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const MobileImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`;

const VideoContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const PlayButton = styled(motion.button)`
  background: white;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;

  &:hover {
    background: #f5f5f5;
  }
`;

// Transform Section
const TransformSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const TransformContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TransformText = styled.div`
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.6;
  }
`;

const TransformImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Licensed Section
const LicensedSection = styled.section`
  padding: 4rem 0;
  background: #f8f9fa;
`;

const LicensedContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const TeamImage = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LicensedTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
`;

const LicensedText = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

// Gift Section
const GiftSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const GiftContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const GiftTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const GiftSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
`;

const GiftCTA = styled.div`
  color: #2196f3;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const CarThumbnails = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding: 1rem 0;
`;

const CarThumbnail = styled.div`
  width: 120px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${(props) => (props.active ? "#1a1a1a" : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1a1a1a;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GiftOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const GiftOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #e9ecef;
  }
`;

// Mobile Scheduling Section
const MobileSchedulingSection = styled.section`
  padding: 4rem 0;
  background: #f8f9fa;
`;

const MobileSchedulingContent = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const MobileIcon = styled.div`
  font-size: 3rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const MobileTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const MobileSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const PhoneNumber = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2196f3;
  text-decoration: none;
  margin-bottom: 2rem;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

// FAQ Section
const FAQSection = styled.section`
  padding: 4rem 0;
  background: #1a1a1a;
  color: white;
`;

const FAQContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
`;

const FAQItem = styled.div`
  background: #333;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const FAQQuestion = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #444;
  }
`;

const FAQAnswer = styled.div`
  padding: 0 1.5rem 1.5rem;
  color: #ccc;
  line-height: 1.6;
  font-size: 0.8rem;
`;

const Footer = styled.footer`
  background: #1a1a1a;
  color: white;
  padding: 2rem 0;
  text-align: center;
`;

function App() {
  const [currentRoute, setCurrentRoute] = useState("home");
  const [activePackage, setActivePackage] = useState("basic");
  const [selectedCar, setSelectedCar] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  useEffect(() => {
    // Simple routing based on URL path
    const path = window.location.pathname;
    const search = window.location.search;

    if (path === "/payment/return" || search.includes("payment_intent")) {
      setCurrentRoute("payment-return");
    } else if (path === "/privacy-policy") {
      setCurrentRoute("privacy-policy");
    } else {
      setCurrentRoute("home");
    }
  }, []);

  // Route rendering
  if (currentRoute === "payment-return") {
    return <PaymentReturn />;
  }

  if (currentRoute === "privacy-policy") {
    return <PrivacyPolicy />;
  }

  const carImages = [
    { src: heroImage, name: "Porsche" },
    { src: carPolishing, name: "Ferrari" },
    { src: interiorCleaning, name: "Luxury" },
  ];

  const faqItems = [
    {
      question: "How do I book a service?",
      answer:
        "Services can only be booked through our mobile app which is available on the App Store and Google Play. We do not currently accept bookings over the phone.",
    },
    {
      question: "Can you detail my car at my home, office or apartment?",
      answer:
        "Yes! We provide mobile detailing services at your home, office, or apartment. Our team brings all necessary equipment and supplies to your location.",
    },
    {
      question: "How long does the detail usually take?",
      answer:
        "Service times vary depending on the package selected. Our Full Detail typically takes 2-3 hours, while our Quick Refres takes about 1 hour and, is designed for professionals who want to keep their cars looking brand new.",
    },
    {
      question: "How long will the detail last?",
      answer:
        "Our detailing services typically last 2-4 weeks depending on weather conditions and how often you drive. We use premium products to ensure long-lasting results. However, we recommend you book the Quick Sparkle every 2 weeks to keep your car looking brand new.",
    },
    {
      question: "What if I don't have access to water or electricity?",
      answer:
        "No problem! Our mobile units are fully self-contained with water tanks and generators, so we can provide service anywhere.",
    },
    {
      question: "What if I no longer need the service?",
      answer:
        "You can cancel your service at any time through our mobile app. Please note that cancellations made within 12 hours of the service will not be refunded. also note that once a service is in progress, it cannot be cancelled.",
    },
    {
      question: "What if I want to reschedule the service?",
      answer:
        "We currently do not offer reschedules. over the app. if you choose to reschedule, you will have to cancel the service and book a new one. if your service is within 12 hours and you would like to reschedule, plese contact us at +353 899 765 197 or email us at support@prismavalet.com with your booking reference number.",
    },
    {
      question: "Can i choose a detailer who would do the service?",
      answer:
        "No! you can not select a specific detailer to render the service. our system is designed to allocate services to the best available detailer, based on their location, availability and ratings from previous services. This ensures that you receive the best possible service.",
    },
    {
      question: "Where are you located?",
      answer:
        "We are currently located in Dublin, Ireland. We will be expanding to other locations in the near future.",
    },
    {
      question: "What if I have more questions?",
      answer:
        "Please feel free to contact us at +353 899 765 197 or email us at support@prismavalet.com.",
    },
  ];

  const packages = {
    basic: {
      title: "The Quick Sparkle",
      description:
        "Essential cleaning for routine maintenance. Perfect for regular upkeep.",
      image: cleaning,
      interior: [],
      exterior: [
        "Exterior Wash and Dry (NoH20, Hand Wash, Steam wash)",
        "Clean Wheels, Tires, and  Arches",
        "Exterior Windows Cleaned",
      ],
      duration: "45-60 minutes",
      price: "€35",
    },
    mini: {
      title: "The Daily Refresh",
      description:
        "Enhanced cleaning with protective treatments. Great for monthly maintenance.",
      image: tireCleaning,
      interior: [
        "Full Interior Vacuum",
        "Interior Glass Cleaning",
        "Dashboard & Console Wipe",
      ],
      exterior: [
        "Exterior Wash and Dry (NoH20, Hand Wash, Steam wash)",
        "Clean Wheels, Tires, and  Arches",
        "Exterior Windows Cleaned",
        "Door sills and Lamps Cleaned",
      ],
      duration: "1 hour-1.5 hours",
      price: "€70",
    },
    interior: {
      title: "Interior Sanctuary",
      description:
        "Deep interior cleaning and restoration. Perfect for addressing stains and odors.",
      image: interiorCleaning,
      interior: [
        "Deep Carpet & Upholstery Cleaning",
        "Upholstery Steam Cleaning",
        "Leather Cleaning & Conditioning",
        "Dashboard Deep Clean",
        "Odor Elimination Treatment",
        "Interior Protection Application",
        "Trunk & Door Jambs Detail",
      ],
      exterior: [""],
      duration: "2-3 hours",
      price: "€120",
    },
    full: {
      title: "The Showroom Shine",
      badge: "Most Popular",
      description:
        "Comprehensive inside-out detailing. Complete vehicle restoration.",
      image: heroImage,
      interior: [
        "Deep Carpet & Upholstery Cleaning",
        "Leather Conditioning",
        "Dashboard & Console Detail",
        "Interior Protection Treatment",
        "Odor Elimination",
        "Trunk & Door Jambs Detail",
        "Interior Glass Polish",
      ],
      exterior: [
        "Hand Wash & Clay Bar Treatment",
        "Paint Polishing",
        "Wheel & Tire Deep Clean",
        "Tire Dressing",
        "Exterior Glass Polish",
        "Trim & Plastic Restoration",
        "Tar and Gravel Removal",
      ],
      duration: "3-4 hours",
      price: "€180",
    },
    premium: {
      title: "The Ultimate Prestige",
      badge: "VIP",
      description:
        "Ultimate detailing experience with advanced treatments and protection.",
      image: carPolishing,
      interior: [
        "Advanced Stain Removal",
        "Professional Carpet Extraction",
        "Premium Leather Treatment",
        "Interior Ceramic Coating",
        "Comprehensive Odor Removal",
        "Headliner Cleaning",
        "Interior Detailing & Protection",
      ],
      exterior: [
        "Single Stage Paint Correction",
        "Clay Bar Treatment",
        "Application of Wax/Sealant",
        "Engine Bay Cleaning & Dressing",
        "Complete Exterior Protection",
        "Tar and Gravel Removal",
        "Exterior Glass Polish",
        "Trim & Plastic Restoration",
      ],
      duration: "6-7 hours",
      price: "€500",
    },
  };

  return (
    <div className="App">
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Header>
            <Logo>PRISMAVALET</Logo>
          </Header>
          <HeroContent>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <HeroTitle>We Make It Shine</HeroTitle>
              <HeroSubtitle>
                Get Your Services Delivered To You Anywhere At Your Convenience
                <FaHeart style={{ color: "#ff6b35", marginLeft: "0.5rem" }} />
              </HeroSubtitle>
            </motion.div>

            <HeroImage>
              <motion.img
                src={carPolishing}
                alt="Professional Car Detailing"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 2, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </HeroImage>

            <CTAButtons>
              <PrimaryButton
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />
                <span>Download for</span>
                <span>iOS</span>
              </PrimaryButton>
              <SecondaryButton
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />
                <span>Download for</span>
                <span>Android</span>
              </SecondaryButton>
            </CTAButtons>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* Problems Section */}
      <ProblemsSection>
        <Container>
          <ProblemsContent>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ProblemsTitle>Industry Challenges</ProblemsTitle>
              <ProblemsSubtitle>
                Traditional automotive care services face significant
                operational limitations that impact customer experience and
                service quality.
              </ProblemsSubtitle>
            </motion.div>

            <ProblemsGrid>
              <ProblemCard
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <ProblemIcon>
                  <FaClock />
                </ProblemIcon>
                <ProblemTitle>Scheduling Limitations</ProblemTitle>
                <ProblemDescription>
                  Fixed operating hours and location-based services create
                  accessibility barriers for busy professionals. Our flexible
                  scheduling system accommodates diverse customer schedules and
                  operational requirements.
                </ProblemDescription>
              </ProblemCard>

              <ProblemCard
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <ProblemIcon>
                  <FaCar />
                </ProblemIcon>
                <ProblemTitle>Geographic Constraints</ProblemTitle>
                <ProblemDescription>
                  Stationary service locations limit customer reach and create
                  travel inefficiencies. Our mobile infrastructure delivers
                  professional automotive care services directly to customer
                  locations, eliminating geographic barriers.
                </ProblemDescription>
              </ProblemCard>

              <ProblemCard
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <ProblemIcon>
                  <FaShieldAlt />
                </ProblemIcon>
                <ProblemTitle>Service Standardization</ProblemTitle>
                <ProblemDescription>
                  Variable service quality and inconsistent delivery standards
                  across traditional automotive care providers create customer
                  uncertainty. Our standardized processes ensure consistent,
                  measurable service outcomes across all locations.
                </ProblemDescription>
              </ProblemCard>

              <ProblemCard
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <ProblemIcon>
                  <FaMobile />
                </ProblemIcon>
                <ProblemTitle>Technology Integration</ProblemTitle>
                <ProblemDescription>
                  Legacy booking systems and manual processes create operational
                  inefficiencies and customer friction. Our integrated digital
                  platform provides seamless booking, real-time service
                  tracking, and transparent pricing management.
                </ProblemDescription>
              </ProblemCard>
            </ProblemsGrid>
          </ProblemsContent>
        </Container>
      </ProblemsSection>

      {/* Service Packages Section */}
      <PackagesSection>
        <Container>
          <SectionTitle>Detail Packages</SectionTitle>

          <PackageTabs>
            <TabButton
              active={activePackage === "basic"}
              onClick={() => setActivePackage("basic")}
            >
              The Quick Sparkle
            </TabButton>
            <TabButton
              active={activePackage === "mini"}
              onClick={() => setActivePackage("mini")}
            >
              The Daily Refresh
            </TabButton>
            <TabButton
              active={activePackage === "interior"}
              onClick={() => setActivePackage("interior")}
            >
              Interior Sanctuary
            </TabButton>
            <TabButton
              active={activePackage === "full"}
              onClick={() => setActivePackage("full")}
            >
              The Showroom Shine
            </TabButton>
            <TabButton
              active={activePackage === "premium"}
              onClick={() => setActivePackage("premium")}
            >
              The Ultimate Prestige
            </TabButton>
          </PackageTabs>

          <PackageCard
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PackageHeader>
              <PackageTitle>{packages[activePackage].title}</PackageTitle>
              {packages[activePackage].badge && (
                <PackageBadge>{packages[activePackage].badge}</PackageBadge>
              )}
            </PackageHeader>

            <PackageImage>
              <img
                src={packages[activePackage].image}
                alt={packages[activePackage].title}
                initial={{ opacity: 0, scale: 1 }}
              />
            </PackageImage>

            <PackageDescription>
              {packages[activePackage].description}
            </PackageDescription>

            <PackageInfo>
              <PackageDuration>
                <FaClock />
                {packages[activePackage].duration}
              </PackageDuration>
              <PackagePrice>{packages[activePackage].price}</PackagePrice>
            </PackageInfo>

            <ServiceList>
              <ServiceCategory>INTERIOR</ServiceCategory>
              {packages[activePackage].interior.map((service, index) => (
                <ServiceItem key={index}>
                  <FaCheck style={{ color: "#2196f3" }} />
                  {service}
                </ServiceItem>
              ))}
            </ServiceList>

            <ServiceList>
              <ServiceCategory>EXTERIOR</ServiceCategory>
              {packages[activePackage].exterior.map((service, index) => (
                <ServiceItem key={index}>
                  <FaCheck style={{ color: "#2196f3" }} />
                  {service}
                </ServiceItem>
              ))}
            </ServiceList>
          </PackageCard>
        </Container>
      </PackagesSection>

      {/* Reviews Section */}
      <ReviewsSection>
        <Container>
          <SectionTitle>Thousands Of Five Star Reviews</SectionTitle>
          <ReviewCard
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ReviewText>EXCELLENT</ReviewText>
            <StarRating>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  style={{ color: "#ffd700", fontSize: "1.5rem" }}
                />
              ))}
            </StarRating>
            <ReviewCount>Based on 1668 reviews</ReviewCount>
            <TrustBadge>
              <FaCheck />
              Trustindex
            </TrustBadge>
          </ReviewCard>
        </Container>
      </ReviewsSection>

      {/* Mobile Features Section */}
      <MobileSection>
        <Container>
          <MobileGrid>
            <MobileContent>
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Mobile Auto Detailing
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Offering you convenience and flexibility
              </motion.p>
            </MobileContent>
            <MobileImage>
              <motion.img
                src={detailingVan}
                alt="Mobile Detailing Van"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
            </MobileImage>
          </MobileGrid>
        </Container>
      </MobileSection>

      {/* Transform Section */}
      <TransformSection>
        <Container>
          <TransformContent>
            <TransformText>
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Transform Your Vehicle Inside-Out
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                From spotless interiors to mirror-finish exteriors, we restore
                your ride to NEW with our expert five-star service.
              </motion.p>
            </TransformText>
            <TransformImage>
              <motion.img
                src={interiorCleaning}
                alt="Car Interior Detailing"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
            </TransformImage>
          </TransformContent>
        </Container>
      </TransformSection>

      {/* Licensed Section */}
      <LicensedSection>
        <Container>
          <LicensedContent>
            <TeamImage>
              <motion.img
                src={detailingVan}
                alt="PrismaDetail Team"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
            </TeamImage>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <LicensedTitle>Licensed And Insured</LicensedTitle>
              <LicensedText>
                With over 3 years in the business, PrismaValet has fine-tuned
                the most Convenient and Trusted detailing experience. We take
                care of every detail, so you don't have to. Whether at your
                place or our shop, we're ready to make your car, boat, or RV
                look brand new. Get in touch & book your appointment today!
              </LicensedText>
            </motion.div>
          </LicensedContent>
        </Container>
      </LicensedSection>

      {/* Gift Section */}
      <GiftSection>
        <Container>
          <GiftContent>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <GiftTitle>Looking for a great gift?</GiftTitle>
              <GiftSubtitle>
                PrismaValet is perfect for birthdays, graduations, holidays &
                more.
              </GiftSubtitle>
              <GiftCTA>
                Personalize gift below
                <FaChevronDown />
              </GiftCTA>
            </motion.div>

            <CarThumbnails>
              {carImages.map((car, index) => (
                <CarThumbnail
                  key={index}
                  active={selectedCar === index}
                  onClick={() => setSelectedCar(index)}
                >
                  <img src={car.src} alt={car.name} />
                </CarThumbnail>
              ))}
            </CarThumbnails>

            <GiftOptions>
              <GiftOption>
                <span>Full Detail</span>
                <FaChevronDown />
              </GiftOption>
              <GiftOption>
                <span>Interior Detail</span>
                <FaChevronDown />
              </GiftOption>
              <GiftOption>
                <span>Exterior Detail</span>
                <FaChevronDown />
              </GiftOption>
            </GiftOptions>
          </GiftContent>
        </Container>
      </GiftSection>

      {/* Mobile Scheduling Section */}
      <MobileSchedulingSection>
        <Container>
          <MobileSchedulingContent>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <MobileTitle>Mobile Auto Detailing</MobileTitle>
              <MobileSubtitle>
                We bring you convenience and flexibility
              </MobileSubtitle>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <MobileIcon>
                <FaDownload />
              </MobileIcon>
              <MobileTitle>Download the app to get started</MobileTitle>
              <MobileSubtitle>
                Have any questions? Email for help
              </MobileSubtitle>
              <PhoneNumber href="mailto:support@prismavalet.com">
                support@prismavalet.com
              </PhoneNumber>
            </motion.div>
          </MobileSchedulingContent>
        </Container>
      </MobileSchedulingSection>

      {/* Video Section */}
      <VideoSection>
        <Container>
          <VideoContent>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              HOW WE DETAIL
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ fontSize: "1rem", marginBottom: "1rem" }}
            >
              SNEAK PEAK
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              style={{ fontSize: "1.2rem", marginBottom: "2rem" }}
            >
              2 minute video
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              style={{ marginBottom: "2rem" }}
            >
              See what makes PrismaValet the top choice for everything car
              detailing. At Home or At Shop service available.
            </motion.p>
            <PlayButton
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlay />
              Watch
            </PlayButton>
          </VideoContent>
        </Container>
      </VideoSection>

      {/* FAQ Section */}
      <FAQSection>
        <Container>
          <FAQContent>
            <FAQTitle>F.A.Q.</FAQTitle>
            {faqItems.map((item, index) => (
              <FAQItem key={index}>
                <FAQQuestion
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                >
                  <span>{item.question}</span>
                  <FaChevronDown
                    style={{
                      transform:
                        expandedFAQ === index
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </FAQQuestion>
                {expandedFAQ === index && <FAQAnswer>{item.answer}</FAQAnswer>}
              </FAQItem>
            ))}
          </FAQContent>
        </Container>
      </FAQSection>
      {/* Footer */}
      <Footer>
        <Container>
          <p>&copy; 2025 PrismaValet. All rights reserved.</p>
        </Container>
      </Footer>
    </div>
  );
}

export default App;
