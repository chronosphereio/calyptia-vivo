import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Stack } from '@mui/material';

export interface PageSelectorProps {
  rows: number;
  end: number;
  page: number;
  pageChangeHandler: (value: number) => void;
}

const PageSelector = ({ page, rows, end, pageChangeHandler }: PageSelectorProps) => {
  const isBackDisabled = page == 0 ? 'disabled' : '';
  const isForwardDisabled = ((page+1) * Number(rows)) >= Number(end) ? 'disabled' : '';

  return (
    <Stack direction="row">
      <ArrowBackIosNewOutlinedIcon className={isBackDisabled} onClick={() => pageChangeHandler(page-1)} />
      <ArrowForwardIosOutlinedIcon className={isForwardDisabled} onClick={() => pageChangeHandler(page + 1)} />
    </Stack>
  );
};

export { PageSelector };
