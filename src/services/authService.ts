import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult 
} from "firebase/auth";
import { auth } from "../firebase";

export const authService = {
  setupRecaptcha: (containerId: string) => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          containerId,
          {
            size: "invisible",
            callback: (response: any) => {
              console.log("reCAPTCHA solved", response);
            },
            "expired-callback": () => {
              console.warn("reCAPTCHA expired");
            }
          }
        );
        console.log("RecaptchaVerifier initialized");
      }
    } catch (error) {
      console.error("Error setting up reCAPTCHA:", error);
      throw error;
    }
  },

  sendOTP: async (phone: string) => {
    try {
      console.log("Sending OTP to:", phone);
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error("RecaptchaVerifier not initialized");
      }
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmationResult;
      console.log("OTP sent successfully");
      return confirmationResult;
    } catch (error) {
      console.error("SMS not sent:", error);
      throw error;
    }
  },

  verifyOTP: async (otp: string) => {
    try {
      console.log("Verifying OTP:", otp);
      const confirmationResult = window.confirmationResult;
      if (!confirmationResult) {
        throw new Error("No confirmation result found");
      }
      const result = await confirmationResult.confirm(otp);
      console.log("OTP verified successfully", result.user);
      
      // After Firebase login, we still want to register/login in our backend
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: result.user.phoneNumber, firebaseUid: result.user.uid }),
      });
      return await response.json();
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw error;
    }
  },

  register: async (phone: string) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    return await response.json();
  },
  getProfile: async (userId: string) => {
    const response = await fetch(`/api/auth/profile/${userId}`);
    return await response.json();
  },
};
