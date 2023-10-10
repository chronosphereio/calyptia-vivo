import { Box, Stack } from '@mui/material';

import VivoFilterBar from '@calyptia-vivo/components/VivoFilterBar';
import VivoLogTable from '@calyptia-vivo/components/VivoLogTable';
import VivoSideBar from '@calyptia-vivo/components/VivoSideBar';
import { CONTENT_STYLES, PAGE_STYLES } from '@calyptia-vivo/components/VivoPage/constants';
import { Header } from '@calyptia-vivo/components/VivoPage/elements';
import { Stream, StreamKind } from '@calyptia-vivo/lib/types';

export interface VivoPageProps {
  menuActionHandler: (target: StreamKind) => void;
  learnHowActionHandler: () => void;
  page: number;
  pageChangeHandler: (value: number) => void;
  rowsPerPageHandler: (value: number) => void;
  filterActionHandler: (target: string, field: string) => void;
  rateActionHandler: (value: number) => void;
  defaultRate: number;
  playActionHandler: (play: boolean) => void;
  clearActionHandler: () => void;
  play: boolean;
  stream: Stream;
}

const VivoPage = ({
  menuActionHandler,
  learnHowActionHandler,
  filterActionHandler,
  rateActionHandler,
  defaultRate,
  playActionHandler,
  clearActionHandler,
  play,
  stream,
}: VivoPageProps) => {
  return (
    <Stack sx={PAGE_STYLES} direction="row">
      <VivoSideBar menuActionHandler={menuActionHandler} learnHowActionHandler={learnHowActionHandler} active={stream.kind} />
      <Box className={'content-container'}>
        <Stack sx={CONTENT_STYLES} direction="column">
          <Header kind={stream.kind} />
          <VivoFilterBar 
            filterActionHandler={filterActionHandler}
            rateActionHandler={rateActionHandler}
            defaultRate={defaultRate}
            playActionHandler={playActionHandler}
            clearActionHandler={clearActionHandler}
            play={play}
            kind={stream.kind}
          />
          <VivoLogTable stream={stream} />
        </Stack>
      </Box>
    </Stack>
  );
};

export default VivoPage;
