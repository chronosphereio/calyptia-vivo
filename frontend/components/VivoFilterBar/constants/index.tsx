export const FILTER_BAR_STYLE = {
  alignItems: 'center',
  justifyContent: 'start',
  flex: 1,
  width: '100%',
  '& .MuiBox-root': {
    position: 'relative',
    '& input': {
      pl: 4,
    },
  },
  '& .traces': {
    flex: 10
  },
  '& .traces input': {
    width: '275px'
  },
};

export const BUTTON_GROUP = {
  boxShadow: 'none',
  backgroundColor: 'white',
  height: '34px',
  '& .MuiButton-root': {
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#686A7F',
    fontSize: '14px',
    border: '0.5px solid',
    borderRadius: '5px',
    borderRight: '0.5px solid',
    borderColor: '#C5CBE9',
    '& .MuiSvgIcon-root': {
      width: '13px',
      height: '13px',
      color: '#C5CBE9',
    },
  },
};

export const VERTICAL_RULE_STYLE = {
  width: '0px',
  height: '17px',
  border: '1px solid #6D77A1',
  m: 2,
};

export const SEARCH_ICON = {
  color: 'action.active',
  mr: 1,
  my: 0.5,
  position: 'absolute',
  left: '5px',
  top: '2px',
  zIndex: '999',
};

export const RATE_ICON = {
  color: 'action.active',
  mr: 1,
  my: 0.5,
  position: 'absolute',
  left: '10px',
  top: '2px',
  zIndex: '999',
};

export const INPUT_STYLE = {
  border: '0.5px solid #C5CBE9',
  borderRadius: '4px',
  height: '34px',
  mr: 4,
  background: 'white',
  '& input': {
    p: 0,
    px: 2,
    width: '226px',
    height: '34px',
  },
  '& label': {
    left: '20px',
    top: '-10px',
    color: '#A0A2B6',
  },
  '& .Mui-focused, & .MuiFormLabel-filled': {
    top: '0px',
    left: '0px',
  },
};

export const RATE_SELECT = {
  border: '0.5px solid #C5CBE9',
  borderRadius: '4px',
  width: '157px',
  height: '34px',
  background: 'white',
  '& .MuiInputBase-root': {
    height: '34px'
  },
  '& .MuiSelect-select ': {
    pl: 6,
    color: '#686A7F',
    fontSize: '14px',
    fontWeight: 'normal',
  },
};

export const TYPOGRAPHY_DIVIDER = {
  color: '#6D77A1',
  ml: 6,
  mr: 1,
  fontSize: '14px',
};
