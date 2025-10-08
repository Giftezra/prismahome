import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaCookie, FaTimes } from "react-icons/fa";

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

const CookieButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &.secondary {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;

    &:hover {
      background: #e5e7eb;
    }
  }

  &.primary {
    background: #8b5cf6;
    color: white;

    &:hover {
      background: #7c3aed;
    }
  }
`;

const CookieSettings = ({ isOpen, onClose }) => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always enabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    if (isOpen) {
      // Load existing preferences
      const consent = localStorage.getItem("cookie-consent");
      if (consent) {
        const preferences = JSON.parse(consent);
        setCookiePreferences(preferences);
      }
    }
  }, [isOpen]);

  const savePreferences = (preferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setCookiePreferences(preferences);
    onClose();

    // Here you would typically initialize analytics or other tracking based on preferences
    if (preferences.analytics) {
      console.log("Analytics cookies enabled");
    }

    if (preferences.marketing) {
      console.log("Marketing cookies enabled");
    }

    if (preferences.functional) {
      console.log("Functional cookies enabled");
    }
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <SettingsModal
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
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
            <button onClick={onClose}>
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
                cannot be switched off. They are usually only set in response to
                actions made by you which amount to a request for services, such
                as setting your privacy preferences, logging in or filling in
                forms.
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
                These cookies allow us to count visits and traffic sources so we
                can measure and improve the performance of our site. They help
                us to know which pages are the most and least popular and see
                how visitors move around the site.
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
                functionality and personalisation. They may be set by us or by
                third party providers whose services we have added to our pages.
              </p>
            </CookieCategory>
          </ModalBody>

          <ModalFooter>
            <CookieButton
              className="secondary"
              onClick={onClose}
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
    </AnimatePresence>
  );
};

export default CookieSettings;
