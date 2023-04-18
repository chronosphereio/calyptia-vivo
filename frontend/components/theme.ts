import { createTheme } from '@mui/material';

// allow custom variant using `createTheme`
declare module '@mui/material/styles' {
  interface TypographyVariants {
    bodyMedium: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    bodyMedium?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodyMedium: true;
  }
}

export const palette = {
  primary: {
    main: 'hsla(206, 77%, 38%, 1)',
    light: 'hsl(204, 89%, 64%)',
    dark: 'hsla(206, 76%, 22%, 1)',
    states: {
      'outlined-resting-border': 'hsla(230, 48%, 47%, 0.5)',
    },
  },
  secondary: {
    main: 'hsla(250, 100%, 69%, 1)',
    light: 'hsl(247, 47%, 73%)',
    dark: 'hsl(253, 50%, 32%)',
    contrastText: 'hsla(0, 33%, 99%, 0.87)',
    states: {
      'outlined-resting-border': 'hsla(339, 100%, 48%, 0.5)', // #F5005780
    },
  },
  background: {
    default: 'hsl(220, 33%, 98%)',
    paper: 'hsl(0, 0%, 100%)', // #ffffff
    panel: 'hsl(0, 0%, 98%)',
    tab: 'hsl(240, 20%, 96%, 0.3)',
  },
  text: {
    primary: 'hsl(240, 20%, 24%)',
    disabled: 'hsl(202, 10%, 67%)',
    secondary: 'hsl(214, 6%, 51%)',
    
  },
  error: {
    main: 'hsl(0, 100%, 50%)',
    light: 'hsl(0, 100%, 60%)',
    dark: 'hsl(4, 90%, 47%)',
    background: 'hsla(4, 90%, 58%, 0.08)',
  },
  warning: {
    main: 'hsl(42, 100%, 50%)',
    light: 'hsl(42, 94%, 64%)',
    dark: 'hsl(42, 99%, 26%)',
    contrastText: 'hsla(0, 0%, 100%, 0.87)',
  },
  info: {
    main: 'hsl(196, 100%, 54%)',
    light: 'hsl(196, 96%, 63%)',
    dark: 'hsl(196, 86%, 37%)',
    contrastText: 'hsla(0, 0%, 100%, 0.87)',
    paper: 'hsl(231, 48%, 48%)',
  },
  success: {
    main: 'hsl(152, 82%, 40%)',
    light: 'hsl(152, 52%, 51%)',
    dark: 'hsl(153, 82%, 29%)',
    contrastText: 'hsla(0, 0%, 100%, 0.87)',
  },
  divider: 'hsla(0, 4%, 28%, 0.12)',
};

export type MuiThemeColors = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
export const LIGHT_GREEN_BACKGROUND = 'hsla(122, 39%, 49%, 0.08)';
export const LIGHT_RED_BACKGROUND = 'hsla(4, 89%, 58%, 0.08)';
export const LIGHT_BLUE_BACKGROUND = 'hsla(206, 89%, 54%, 0.08)';

// Metric Colours:
export const EPS_COLOUR = 'hsl(36, 100%, 64%)';
export const DP_COLOUR = 'hsl(187, 100%, 42%)';

export const SIDEBAR_BACKGROUND_COLOR = 'hsla(266, 40%, 97%, 1.000)';
export const CARD_BACKGROUND = 'hsla(246, 100%, 83%, 0.09)';
export const NAVBAR_BACKGROUND_COLOR = 'hsl(206, 76%, 22%)'; // #0d3e63
export const SIDEBAR_WIDTH = '278px';
export const SIDEBAR_PADDING = '15px';
export const NAVBAR_HEIGHT = '64px';
export const BUTTON_BORDER_COLOR = 'hsla(230, 48%, 48%, 0.2)';
export const HEADER_BACKGROUND_COLOR = 'hsla(230, 48%, 48%, 0.08)';
export const INFO_BACKGROUND = 'hsl(233, 43%, 96%)';
export const SERVICES_ICONS_COLOR = 'hsl(244, 40%, 86%)';
/**Mariano (3/31/23): This is the only way I found to change a svg color */
export const SERVICES_ICONS_COLOR_FILTER =
  'invert(88%) sepia(12%) saturate(899%) hue-rotate(200deg) brightness(97%) contrast(88%)';
export const LANDING_PAGE_BACKGROUND_COLOR = 'hsl(245,48%,95%)';
export const PAGE_LAYOUT_HEADER_COLOR = '#F0F1F9';

// Colors matching Figma color styles:
export const BACK_CARDS_COLORED_COLOR = '	hsl(240, 20%, 96%)'; // #f3f3f7
export const SELECTED_COLOR = 'hsl(245, 48%, 95%)'; // #ecebf8
export const NEW_CTA_COLOR = 'hsl(250, 100%, 69%)'; // #7b61ff
export const NEW_CTA_COLOR_FILTER =
  'invert(42%) sepia(28%) saturate(5897%) hue-rotate(229deg) brightness(99%) contrast(111%)';
export const LINK_BUTTONS_COLOR = 'hsl(230, 44%, 64%)';
export const CODEBOX_BACKGROUND_COLOR = 'hsl(205,88%,14%)';
export const KUBERNETES_COLOR = 'hsl(214, 76%, 46%)';
export const DOCKER_COLOR = 'hsl(205, 66%, 58%)';
export const WHITE_COLOR_FILTER = 'brightness(0) invert(1);';

export const INPUT_TEXT_COLOR = 'hsla(218, 14%, 69%)';
export const BOX_SHADOW_STYLE = '0 0 20px 0 hsla(229, 33%, 88%, 0.5)'; // #d5d9ea73

export const THEME = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        outlined: {
          padding: '6px 16px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          backgroundColor: 'inherit',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: 'inherit',
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: 'inherit',
          margin: '32px 0px 24px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        sizeSmall: {
          fontSize: '0.75rem',
          padding: 'auto 16px',
        },
        sizeMedium: {
          padding: '8px 20px',
        },
        sizeLarge: {
          padding: '11px 24px',
        },
        textSizeSmall: {
          padding: '7px 12px',
        },
        textSizeMedium: {
          padding: '9px 16px',
        },
        textSizeLarge: {
          padding: '12px 16px',
        },
      
        // https://mui.com/material-ui/api/button/#css
        textError: {
          color: palette.secondary.states['outlined-resting-border'],
        },
        outlinedError: {
          borderColor: palette.error.dark,
          color: palette.secondary.states['outlined-resting-border'],
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { border: `1px solid ${BUTTON_BORDER_COLOR}` },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          borderRadius: '4px',
          '&:last-child': {
            paddingBottom: '32px',
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'subtitle1',
          color: NAVBAR_BACKGROUND_COLOR,
        },
        subheaderTypographyProps: {
          variant: 'body2',
          color: NAVBAR_BACKGROUND_COLOR,
          sx: { opacity: 0.7 },
        },
      },
      styleOverrides: {
        root: {
          padding: '16px',
          backgroundColor: HEADER_BACKGROUND_COLOR,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
      
        '#__next': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          '& .MuiTableCell-root': {
            borderBottom: 'none',
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          },
          '& .MuiTableCell-paddingCheckbox': {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardInfo: {
          backgroundColor: INFO_BACKGROUND,
          color: palette.info.paper,
          '& .MuiAlert-icon': {
            color: palette.info.paper,
          },
        },
        standardError: {
          color: palette.error.dark,
          '& .MuiAlert-icon': {
            color: palette.error.dark,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: palette.background.paper,
          },
        },
      },
    },
  },
  palette,
  typography: {
    fontFamily: ['Rubik', '-apple-system', 'Arial', 'sans-serif'].join(','),
    fontSize: 14,
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    bodyMedium: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.375,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.375,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.375,
    },
  },
});
