export const VIVO_LOGO_ICON = {
  width: '100px',
};

export const VIVO_LOGO_STACK = {
  alignItems: 'center',
};

export const VIVO_LOGO_TEXT = {
  textTransform: 'uppercase',
  color: '#FFFFFF',
  fontSize: '12px',
  pb: 3,
};

export const VIVO_SIDEBAR_STYLE = {
  background:
    'linear-gradient(180deg, rgba(109, 119, 161, 0.6) 0%, rgba(128, 96, 255, 0) 100%), rgba(109, 119, 161, 0.6)',
  p: 4,
  width: '225px',
  height: '95vh',
  borderRadius: '9px',
  '& .menu-stack': {
    flex: 1,
  },
  '& .menu-stack.calyptia-logo': {
    flex: 220,
    justifyContent: 'end',
  },
};

export const HORIZONTAL_RULE_STYLE = {
  alignItems: 'center',
  '& .MuiBox-root': {
    height: '0px',
    width: '85%',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    mb: 4,
  },
};

export const MENU_STYLE = {
  width: '100%',
  maxWidth: 360,
  '& .MuiListItemButton-root': {
    p: 1,
  },
  '& .MuiListItemIcon-root': {
    width: '10px',
    pr: '4px',
  },
  '& .MuiTypography-root, & .MuiListItemIcon-root': {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '140%',
    letterSpacing: '-0.15px',
    color: '#FFFFFF',
  },
  '& .MuiListItemButton-root:hover, & .MuiListItemButton-root.active': {
    background: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0px 8px 17.869px rgba(75, 47, 160, 0.1348), 0px 6.6501px 5.32008px rgba(75, 47, 160, 0.1252)',
    borderRadius: '5px',
    '& .MuiListItemIcon-root, & .MuiTypography-root': {
      color: '#6D77A1',
    },
  },
};

export const CALYPTIA_LOGO_STYLES = {
  fontFamily: 'Rubik',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '24px',
  letterSpacing: '-0.2px',
  textAlign: 'center',
  '& .promo-box': {
    mb: 2,
    color: '#6D77A1',
    background: 'rgba(255, 255, 255, 0.5)',
    border: '0.5px solid rgba(245, 239, 235, 0.16)',
    borderRadius: '18px',
    p: 2,
    '& .display': {
      color: 'rgba(36, 34, 32, 0.56)',
      fontSize: '14px',
    },
    '& button': {
      background: '#6D77A1',
      boxShadow: '0px 4px 24px rgba(109, 119, 161, 0.18)',
      borderRadius: '12px',
      p: 1,
      pr: 2,
      mt: 2,
      fontSize: '11px',
      '& .MuiSvgIcon-root': {
        width: '12px',
        height: '12px',
        mx: 1,
      },
    },
  },
  '& .powered-by': {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '140%',
    letterSpacing: '-0.15px',
    color: 'rgba(255, 255, 255, 0.5)',
    mb: 1,
  },
};
