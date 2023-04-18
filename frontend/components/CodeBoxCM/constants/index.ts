import { CODEBOX_BACKGROUND_COLOR, SELECTED_COLOR, THEME } from '../../theme';
import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

export const CALYPTIA_CODEBOX_THEME: Extension = EditorView.theme(
  {
    '&': {
      fontFamily: 'monospace',
      fontSize: '12px',
      fontWeight: 400,
      color: SELECTED_COLOR,
      backgroundColor: 'black',
    },
    '.cm-gutters': { backgroundColor: CODEBOX_BACKGROUND_COLOR },
    '.cm-scroller': { backgroundColor: CODEBOX_BACKGROUND_COLOR, padding: '20px 15px' },
    /**Shell highlight colors */
    'span.ͼa': {
      color: THEME.palette.success.light,
    },
    'span.ͼb': {
      color: THEME.palette.success.light,
    },
    'span.ͼc': {
      color: THEME.palette.success.light,
    },
    'span.ͼd': {
      color: THEME.palette.success.light,
    },
    'span.ͼe': {
      color: THEME.palette.success.light,
    },
    'span.ͼg': {
      color: THEME.palette.success.light,
    },
  },
  { dark: true }
);
