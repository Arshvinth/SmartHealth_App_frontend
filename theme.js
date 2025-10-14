const colors = {
  // Primary brand colors
  primary: '#00796B',        // Teal Blue – main brand color
  secondary: '#4FC3F7',      // Sky Blue – highlights and buttons
  accent: '#A5D6A7',         // Mint Green – health/well-being accent

  // Backgrounds and surfaces
  background: '#F5F5F5',     // App background
  surface: '#FFFFFF',        // Card / Modal / Sheet backgrounds

  // Text colors
  textPrimary: '#212121',    // Main text (titles, labels)
  textSecondary: '#616161',  // Secondary info text

  // Feedback / Status colors
  success: '#66BB6A',        // Success messages, confirmed status
  error: '#E57373',          // Error messages, failed states
  warning: '#FFB74D',        // Warnings or pending actions
  info: '#4FC3F7',           // Info or help messages

  // Borders and dividers
  border: '#E0E0E0',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

const typography = {
  fontFamily: 'System', // or your preferred Google Font
  h1: { fontSize: 28, fontWeight: '700', color: colors.textPrimary },
  h2: { fontSize: 22, fontWeight: '600', color: colors.textPrimary },
  body: { fontSize: 16, color: colors.textSecondary },
  small: { fontSize: 13, color: colors.textSecondary },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};

export const theme = {
  colors,
  typography,
  spacing,
  radius,
};
