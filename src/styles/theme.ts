export type ThemeType = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    bottomTab: string;
    success: string;
    error: string;
    textPrimary: string;
    textSecondary: string;
    buttonText: string;
    toast: {
      close: string;
      success: {
        background: string;
        border: string;
      };
      warning: {
        background: string;
        border: string;
      };
      error: {
        background: string;
        border: string;
      };
    };
  };
};

const themeLight: ThemeType = {
  colors: {
    primary: '#2196f3',
    secondary: '#FF9800',
    background: '#F9F9F9',
    bottomTab: '#E0E0E0', // Light gray for better contrast
    success: '#4CAF50',
    error: '#F44336',
    textPrimary: '#212121',
    textSecondary: '#757575',
    buttonText: '#FFFFFF',
    toast: {
      close: '#979FA9',
      success: {
        background: '#F6FFF9',
        border: '#48C1B5',
      },
      warning: {
        background: '#FFF8EC',
        border: '#F7D9A4',
      },
      error: {
        background: '#FFF5F3',
        border: '#F4B0A1',
      },
    },
  },
};

const themeDark: ThemeType = {
  colors: {
    primary: '#90CAF9',
    secondary: '#FFB74D',
    background: '#121212',
    bottomTab: '#1E1E1E', // Darker gray for a cleaner look
    success: '#66BB6A',
    error: '#EF5350',
    textPrimary: '#E0E0E0',
    textSecondary: '#BDBDBD',
    buttonText: '#E0E0E0',
    toast: {
      close: '#B0BEC5',
      success: {
        background: '#1B5E20',
        border: '#4CAF50',
      },
      warning: {
        background: '#4E342E',
        border: '#FFB74D',
      },
      error: {
        background: '#3E2723',
        border: '#EF5350',
      },
    },
  },
};

export { themeLight, themeDark };
