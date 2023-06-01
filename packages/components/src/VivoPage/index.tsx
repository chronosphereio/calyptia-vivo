import { Box, Stack } from '@mui/material';

import VivoFilterBar from '@calyptia-vivo/components/VivoFilterBar';
import VivoLogTable from '@calyptia-vivo/components/VivoLogTable';
import VivoPaginator from '@calyptia-vivo/components/VivoPaginator';
import VivoSideBar from '@calyptia-vivo/components/VivoSideBar';
import { CONTENT_STYLES, PAGE_STYLES } from '@calyptia-vivo/components/VivoPage/constants';
import { Header } from '@calyptia-vivo/components/VivoPage/elements';

export interface VivoPageProps {
  menuActionHandler: (target: string) => void;
  learnHowActionHandler: () => void;
  recordStart: string;
  recordEnd?: string;
  recordsPerPage: string;
  page: number;
  pageChangeHandler: (value: number) => void;
  rowsPerPageHandler: (value: number) => void;
  filterActionHandler: (target: string, field: string) => void;
  rateActionHandler: (value: number) => void;
  playActionHandler: (play: boolean) => void;
  clearActionHandler: () => void;
  play: boolean;
  tab: string;
  data: any;
}

const VivoPage = ({
  menuActionHandler,
  learnHowActionHandler,
  recordStart,
  recordEnd,
  recordsPerPage,
  page,
  pageChangeHandler,
  rowsPerPageHandler,
  filterActionHandler,
  rateActionHandler,
  playActionHandler,
  clearActionHandler,
  play,
  tab,
  data
}: VivoPageProps) => {
  return (
    <Stack sx={PAGE_STYLES} direction="row">
      <VivoSideBar menuActionHandler={menuActionHandler} learnHowActionHandler={learnHowActionHandler} active={tab} />
      <Box className={'content-container'}>
        <Stack sx={CONTENT_STYLES} direction="column">
          <Header kind={tab} />
          <VivoFilterBar 
            filterActionHandler={filterActionHandler}
            rateActionHandler={rateActionHandler}
            playActionHandler={playActionHandler}
            clearActionHandler={clearActionHandler}
            play={play}
            kind={tab}
          />
          <VivoLogTable rows={data} kind={tab} />
          { recordEnd ? (
            <VivoPaginator
              page={page}
              recordStart={recordStart}
              recordEnd={recordEnd}
              rowsPerPage={recordsPerPage}
              pageChangeHandler={pageChangeHandler}
              rowsPerPageHandler={rowsPerPageHandler}
            />
        ): ''} 
        </Stack>
      </Box>
    </Stack>
  );
};

export default VivoPage;
