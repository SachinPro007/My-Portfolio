import { createSlice } from "@reduxjs/toolkit";
const darkTheme = {
  // Core Colors
  primaryColor: "#F28C26",  // Vibrant orange (unchanged)
  secondary: "#D97706",     // Darker orange (unchanged)

  // Backgrounds
  bg: "#121212",           // Darker background for better contrast
  cardBg: "#1E1E1E",       // Slightly lighter than bg
  cardSecondary: "#252525", // For nested cards or accents

  // Text
  text: "#F5F5F5",         // Bright white for readability
  summeryText: '#B0B0B0',  // Light gray for secondary text
  headingText: "#FFFFFF",  // Pure white for headings

  // Accents
  accentGreen: "#10B981",   // Brighter green
  accentBlue: "#3B82F6",    // Brighter blue
  accentGold: "#FBBF24",    // More vibrant gold
  accentRed: "#EF4444",     // Added red accent
  tooltipText: "#FFFFFF",   // White for tooltips

  // Borders & Dividers
  border: "#333333",       // Dark gray - visible against cardBg
  borderLight: "#404040",  // For subtle borders
  borderHighlight: "#4A4A4A", // For focused/hovered elements

  // States
  hover: "#F97316",        // Slightly brighter hover state
  active: "#EA580C",       // More vibrant active state
  disabled: "#3D3D3D",     // For disabled elements

  // Specials
  overlay: "rgba(0,0,0,0.7)", // For modals/overlays
  shadow: "rgba(0,0,0,0.5)"   // For shadows
};

const lightTheme = {
  // Core Colors (same hues but adjusted for light mode)
  primaryColor: "#EA580C",  // Slightly deeper orange for better visibility
  secondary: "#C2410C",     // Darker orange

  // Backgrounds
  bg: "#F8FAFC",           // Very light gray
  cardBg: "#FFFFFF",       // Pure white
  cardSecondary: "#F1F5F9", // Light gray for nested cards

  // Text
  text: "#1E293B",         // Dark blue-gray for primary text
  summeryText: '#64748B',  // Medium gray for secondary text
  headingText: "#0F172A",  // Almost black for headings

  // Accents (same as dark but slightly adjusted)
  accentGreen: "#059669",   // Slightly deeper green
  accentBlue: "#2563EB",    // Slightly deeper blue
  accentGold: "#D97706",    // More gold-like
  accentRed: "#DC2626",     // Added red accent
  tooltipText: "#FFFFFF",   // White for tooltips

  // Borders & Dividers
  border: "#E2E8F0",       // Light gray
  borderLight: "#CBD5E1",  // Slightly darker for contrast
  borderHighlight: "#94A3B8", // For focused/hovered elements

  // States
  hover: "#F97316",        // Same as dark for consistency
  active: "#EA580C",       // Same as dark for consistency
  disabled: "#E2E8F0",     // Light gray for disabled

  // Specials
  overlay: "rgba(255,255,255,0.7)", // Light overlay
  shadow: "rgba(0,0,0,0.1)"         // Subtle shadow
}; 


let customTheme = JSON.parse(localStorage.getItem('customTheme')) || {...darkTheme};

const theme = localStorage.getItem('theme') || 'light'
const initialState = {
  theme: theme, // 'dark', 'light', or 'custom'
  themeColors: theme === 'dark' ? darkTheme : theme === "custom" ? customTheme : lightTheme,
};

const themeReducer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme: (state) => {
      state.theme = "dark";
      state.themeColors = darkTheme;
      localStorage.setItem('theme', 'dark');
    },
    setLightTheme: (state) => {
      state.theme = "light";
      state.themeColors = lightTheme;
      localStorage.setItem('theme', 'light');
    },
    setCustomTheme: (state, action) => {
      state.theme = "custom";
      state.themeColors = action.payload;
      localStorage.setItem('theme', 'custom');
      localStorage.setItem('customTheme', JSON.stringify(action.payload));
    },
  }
});

export const { setDarkTheme, setLightTheme, setCustomTheme } = themeReducer.actions;

export default themeReducer.reducer;