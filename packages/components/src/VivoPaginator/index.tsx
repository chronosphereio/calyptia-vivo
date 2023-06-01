import { PageSelector, RecordsDisplay, RecordsSelector } from '@calyptia-vivo/components/VivoPaginator/elements';
import { Stack } from '@mui/material';

import { PAGINATOR_STYLE } from '@calyptia-vivo/components/VivoPaginator/constants';

export interface VivoPaginatorProps {
  recordStart: string;
  recordEnd: string;
  rowsPerPage: string;
  page: number;
  pageChangeHandler: (value: number) => void;
  rowsPerPageHandler: (value: number) => void;
}

const VivoPaginator = ({ recordStart, recordEnd, rowsPerPage, page, pageChangeHandler, rowsPerPageHandler }: VivoPaginatorProps) => {
  return (
    <Stack direction="row" sx={PAGINATOR_STYLE}>
      <RecordsSelector rows={rowsPerPage} rowsPerPageHandler={rowsPerPageHandler} />
      <RecordsDisplay start={recordStart} rows={rowsPerPage} end={recordEnd} />
      <PageSelector end={recordEnd} rows={rowsPerPage} page={page} pageChangeHandler={pageChangeHandler} />
    </Stack>
  );
};

export default VivoPaginator;
