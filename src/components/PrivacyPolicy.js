import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";

const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem 0;
`;

const Header = styled.div`
  background: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled(motion.button)`
  background: #e3f2fd;
  color: #1a1a1a;
  border: none;
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #bbdefb;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #666;
  gap: 1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #f44336;
  font-size: 1.1rem;
`;

const ContentFrame = styled.iframe`
  width: 100%;
  min-height: 600px;
  border: none;
  border-radius: 8px;
`;

const PrivacyPolicy = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [appType, setAppType] = useState("client");

  useEffect(() => {
    // Get app type from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("app") || "client";
    setAppType(type);
    setLoading(false);
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const getPrivacyPolicyUrl = () => {
    // Use the correct subdomains for each app
    if (appType === "detailer") {
      return "https://detailer.prismavalet.com/api/v1/terms/get_privacy_policy/";
    }
    return "https://client.prismavalet.com/api/v1/terms/get_privacy_policy/";
  };

  const handleFrameLoad = () => {
    setLoading(false);
  };

  const handleFrameError = () => {
    setLoading(false);
    setError(true);
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <BackButton
              onClick={handleBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft />
            </BackButton>
            <Title>Privacy Policy</Title>
          </HeaderContent>
        </Header>
        <ContentContainer>
          <Card>
            <LoadingContainer>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FaSpinner />
              </motion.div>
              Loading Privacy Policy...
            </LoadingContainer>
          </Card>
        </ContentContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <BackButton
              onClick={handleBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft />
            </BackButton>
            <Title>Privacy Policy</Title>
          </HeaderContent>
        </Header>
        <ContentContainer>
          <Card>
            <ErrorMessage>
              Unable to load privacy policy. Please try again later or contact
              support.
            </ErrorMessage>
          </Card>
        </ContentContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft />
          </BackButton>
          <Title>Privacy Policy</Title>
        </HeaderContent>
      </Header>
      <ContentContainer>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ContentFrame
            src={getPrivacyPolicyUrl()}
            onLoad={handleFrameLoad}
            onError={handleFrameError}
            title="Privacy Policy"
          />
        </Card>
      </ContentContainer>
    </Container>
  );
};

export default PrivacyPolicy;
