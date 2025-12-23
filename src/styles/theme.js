/**
 * Theme Configuration
 * Professional dark mode color palette and design tokens
 */

export const theme = {
  // Colors - Dark Mode Palette
  colors: {
    // Background
    bg: {
      primary: '#0F172A',      // Deep navy (main background)
      secondary: '#1E293B',    // Slate (cards, panels)
      tertiary: '#334155',     // Lighter slate (hover states)
      elevated: '#1E293B',     // Elevated elements
    },
    
    // Text
    text: {
      primary: '#F1F5F9',      // Almost white (main text)
      secondary: '#CBD5E1',    // Light gray (secondary text)
      muted: '#94A3B8',        // Gray (muted text)
      disabled: '#64748B',     // Darker gray (disabled)
    },
    
    // Accent - Vibrant Blue/Purple
    accent: {
      primary: '#6366F1',      // Indigo (primary actions)
      secondary: '#8B5CF6',    // Purple (secondary actions)
      hover: '#7C3AED',        // Deeper purple (hover)
      light: '#A78BFA',        // Light purple
    },
    
    // Status Colors
    status: {
      success: '#10B981',      // Green (completed)
      warning: '#F59E0B',      // Amber (pending)
      danger: '#EF4444',       // Red (overdue)
      info: '#3B82F6',         // Blue (info)
    },
    
    // Priority Colors
    priority: {
      high: '#EF4444',         // Red
      medium: '#F59E0B',       // Amber
      low: '#10B981',          // Green
    },
    
    // Border
    border: {
      primary: '#334155',      // Main borders
      secondary: '#475569',    // Lighter borders
      accent: '#6366F1',       // Accent borders
    },
    
    // Shadow colors (with opacity)
    shadow: {
      sm: 'rgba(0, 0, 0, 0.3)',
      md: 'rgba(0, 0, 0, 0.4)',
      lg: 'rgba(0, 0, 0, 0.5)',
      colored: 'rgba(99, 102, 241, 0.3)', // Indigo shadow
    },
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
  },
  
  // Border Radius
  radius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    full: '9999px',   // Fully rounded
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
    colored: '0 10px 30px -5px rgba(99, 102, 241, 0.3)',
  },
  
  // Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    tooltip: 1400,
    notification: 1500,
  },
};

export default theme;
