export const PAPER_STYLE = {
  boxShadow: 'none',
  background: 'none',
  flex: 16,
  width: '100%',
  overflow: 'scroll'
};

export const HEADER_STYLES = {
  py: 1,
  px: 0,
  pl: 1,
  flex: 1,
  '& .MuiTypography-root': {
    color: '#686A7F',
    textTransform: 'uppercase',
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px'
  },
  '& .MuiTypography-root.heading-0': {
    width: '162px'
  },
  '& .MuiTypography-root.heading-1': {
    width: '150px'
  }
};

export const PAGINATOR_STYLES = {
  flex: 1,
};

export const LOG_EVENT_ROW_STYLE = {
  borderRadius: '8px',
  border: '1px solid #F7F8FC',
  background: '#FFFFFF',
  mb: '2px',
  height: '35px',
  alignItems: 'center',
  justifyContent: 'left',
  p: 1,
  fontFamily: 'Source Code Pro',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '16px',
  letterSpacing: '-0.5px',
  width: '100%',
  '& .cell': {
    color: '#686A7F',
    flex: 1,
    px: 4,
    fontSize: '12px',
  },
  '& .cell-0': {
    color: '#A0A2B6',
    width: '132px',
    flexGrow: 0,
    fontSize: '12px',
  },
  '& .cell-0.expanded': {
    flex: 3,
    color: '#6D77A1',
  },
  '& .cell-1': {
    width: '185px',
    flexGrow: 0,
  },
  '& .cell-2': {
    width: '600px',
    flexGrow: 3,
  },
  '& .chevron-label': {
    color: '#6D77A1',
    px: 0,
    fontSize: '12px',
    visibility: 'hidden'
  },
  '& .MuiSvgIcon-root': {
    width: '14px',
    height: '14px'
  },
  '& .chevron': {
    transform: 'rotate(270deg)',
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), #ECEBF8',
    borderRadius: '2px',
    mx: 1,
    cursor: 'pointer',
    visibility: 'hidden'
  },
  '& .chevron.expanded': {
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), #9FA7DA',
    transform: 'rotate(90deg)',
  },
  '& .delete-icon': {
    color: '#FFAAA8',
    cursor: 'pointer',
  },
  flex: 16,
};

export const LOG_DETAIL_PANEL = {
  p: 2,
  background: '#6D77A1',
  borderRadius: '0px 0px 8px 8px',
  mb: 1,
  color: '#ECEBF8',
  fontFamily: 'Source Code Pro',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '16px',
  textTransform: 'uppercase',
  '& .cm-scroller': {
    borderRadius: '8px',
  },
  '& .cm-editor': {
    backgroundColor: '#6D77A1',
    mb: 2,
    overflowY: 'scroll',
  },
};

export const LOG_EVENT_BOX_STYLE = {
  '& .hidden': {
    display: 'none',
  },
  '&:hover .MuiStack-root .chevron, &:hover .MuiStack-root .chevron-label': {
    visibility: "visible"
  },
};
