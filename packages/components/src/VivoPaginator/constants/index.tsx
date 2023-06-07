export const PAGINATOR_STYLE = {
  alignItems: 'center',
  justifyContent: 'end',
  width: '100%',
  borderTop: 'solid 1px #686A7F',
  mt: 1,
  pt: 1,
  fontSize: '12px',
  '& .disabled': {
    visibility: 'hidden'
  },
  '& .MuiInputBase-root': {
    fontSize: '12px'
  },
  '& .MuiTypography-root': {
    color: '#6D77A1',
    fontSize: '12px',
    px: 1
  },

  '& .MuiSvgIcon-root': {
    width:'8px',
    height: '12px',
    color: '#6D77A1',
    cursor: 'pointer'
  },

  '& .page-selector': {
    alignItems: 'center'
  }
};

export const PAGINATOR_DISPLAY_STYLE = {
  color: '#6D77A1',
};
