import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaCookie, FaTimes, FaCog } from "react-icons/fa";

const CookieBanner = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1.5rem;
`;

const CookieContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const CookieInfo = styled.div`
  flex: 1;
  min-width: 300px;

  h3 {
    margin: 0 0 0.5rem 0;
    color: #1a1a1a;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  a {
    color: #8b5cf6;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #7c3aed;
    }
  }
`;

const CookieActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const CookieButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &.primary {
    background: #8b5cf6;
    color: white;

    &:hover {
      background: #7c3aed;
    }
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;

    &:hover {
      background: #e5e7eb;
    }
  }

  &.outline {
    background: transparent;
    color: #8b5cf6;
    border: 1px solid #8b5cf6;

    &:hover {
      background: #8b5cf6;
      color: white;
    }
  }
`;

const SettingsModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    color: #1a1a1a;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #6b7280;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #f3f4f6;
      color: #374151;
    }
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const CookieCategory = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;

  h3 {
    margin: 0 0 1rem 0;
    color: #1a1a1a;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    margin: 0 0 1rem 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #374151;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.3s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
  }

  input:checked + .slider {
    background-color: #8b5cf6;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
`;

const ModalFooter = styled.div`
  padding: 1rem 2rem 2rem 2rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always enabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    } else {
      const preferences = JSON.parse(consent);
      setCookiePreferences(preferences);
    }
  }, []);

  const savePreferences = (preferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setCookiePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);

    // Here you would typically initialize analytics or other tracking based on preferences
    if (preferences.analytics) {
      // Initialize Google Analytics or other analytics tools
      console.log("Analytics cookies enabled");
    }

    if (preferences.marketing) {
      // Initialize marketing tracking
      console.log("Marketing cookies enabled");
    }

    if (preferences.functional) {
      // Initialize functional features
      console.log("Functional cookies enabled");
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    savePreferences(allAccepted);
  };

  const acceptEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    savePreferences(essentialOnly);
  };

  const saveCustomPreferences = () => {
    savePreferences(cookiePreferences);
  };

  const handlePreferenceChange = (category) => {
    if (category === "essential") return; // Essential cookies cannot be disabled

    setCookiePreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <CookieBanner
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CookieContent>
              <CookieInfo>
                <h3>
                  <FaCookie />
                  We use cookies
                </h3>
                <p>
                  We use cookies to enhance your browsing experience, serve
                  personalized content, and analyze our traffic. By clicking
                  "Accept All", you consent to our use of cookies. You can
                  manage your preferences by clicking{" "}
                  <button
                    onClick={openSettings}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#8b5cf6",
                      textDecoration: "underline",
                      cursor: "pointer",
                      padding: 0,
                      font: "inherit",
                    }}
                  >
                    Cookie Settings
                  </button>
                  .
                </p>
              </CookieInfo>
              <CookieActions>
                <CookieButton
                  className="outline"
                  onClick={openSettings}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaCog />
                  Cookie Settings
                </CookieButton>
                <CookieButton
                  className="secondary"
                  onClick={acceptEssential}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Essential Only
                </CookieButton>
                <CookieButton
                  className="primary"
                  onClick={acceptAll}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Accept All
                </CookieButton>
              </CookieActions>
            </CookieContent>
          </CookieBanner>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <SettingsModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSettings}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <h2>
                  <FaCookie />
                  Cookie Settings
                </h2>
                <button onClick={closeSettings}>
                  <FaTimes />
                </button>
              </ModalHeader>

              <ModalBody>
                <CookieCategory>
                  <h3>
                    Essential Cookies
                    <ToggleSwitch>
                      <input type="checkbox" checked={true} disabled />
                      <span className="slider"></span>
                    </ToggleSwitch>
                  </h3>
                  <p>
                    These cookies are necessary for the website to function and
                    cannot be switched off. They are usually only set in
                    response to actions made by you which amount to a request
                    for services, such as setting your privacy preferences,
                    logging in or filling in forms.
                  </p>
                </CookieCategory>

                <CookieCategory>
                  <h3>
                    Analytics Cookies
                    <ToggleSwitch>
                      <input
                        type="checkbox"
                        checked={cookiePreferences.analytics}
                        onChange={() => handlePreferenceChange("analytics")}
                      />
                      <span className="slider"></span>
                    </ToggleSwitch>
                  </h3>
                  <p>
                    These cookies allow us to count visits and traffic sources
                    so we can measure and improve the performance of our site.
                    They help us to know which pages are the most and least
                    popular and see how visitors move around the site.
                  </p>
                </CookieCategory>

                <CookieCategory>
                  <h3>
                    Marketing Cookies
                    <ToggleSwitch>
                      <input
                        type="checkbox"
                        checked={cookiePreferences.marketing}
                        onChange={() => handlePreferenceChange("marketing")}
                      />
                      <span className="slider"></span>
                    </ToggleSwitch>
                  </h3>
                  <p>
                    These cookies may be set through our site by our advertising
                    partners to build a profile of your interests and show you
                    relevant adverts on other sites.
                  </p>
                </CookieCategory>

                <CookieCategory>
                  <h3>
                    Functional Cookies
                    <ToggleSwitch>
                      <input
                        type="checkbox"
                        checked={cookiePreferences.functional}
                        onChange={() => handlePreferenceChange("functional")}
                      />
                      <span className="slider"></span>
                    </ToggleSwitch>
                  </h3>
                  <p>
                    These cookies enable the website to provide enhanced
                    functionality and personalisation. They may be set by us or
                    by third party providers whose services we have added to our
                    pages.
                  </p>
                </CookieCategory>
              </ModalBody>

              <ModalFooter>
                <CookieButton
                  className="secondary"
                  onClick={closeSettings}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </CookieButton>
                <CookieButton
                  className="primary"
                  onClick={saveCustomPreferences}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Preferences
                </CookieButton>
              </ModalFooter>
            </ModalContent>
          </SettingsModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
