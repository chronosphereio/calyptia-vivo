import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Stack } from '@mui/material';

export interface PageSelectorProps {
  rows: string;
  end: string;
  page: number;
  pageChangeHandler: (value: number) => void;
}

const PageSelector = ({ page, rows, end, pageChangeHandler }: PageSelectorProps) => {
  const isBackDisabled = page == 0 ? 'disabled' : '';
  const isForwardDisabled = ((page+1) * Number(rows)) >= Number(end) ? 'disabled' : '';

  return (
    <Stack direction="row">
      <ArrowBackIosNewOutlinedIcon className={isBackDisabled} onClick={() => pageChangeHandler(-1)} />
      <ArrowForwardIosOutlinedIcon className={isForwardDisabled} onClick={() => pageChangeHandler(1)} />
    </Stack>
  );
};

export { PageSelector };
