import { ButtonFilter, InputFilter, SelectFilter, VerticalRule } from './elements';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import PausePresentationOutlinedIcon from '@mui/icons-material/PausePresentationOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ButtonGroup, Stack, Typography } from '@mui/material';

import { BUTTON_GROUP, FILTER_BAR_STYLE, TYPOGRAPHY_DIVIDER } from './constants';

export interface VivoFilterBarProps {
  filterActionHandler: (target: string, field: string) => void;
  rateActionHandler: (value: number) => void;
  playActionHandler: (value: boolean) => void;
  clearActionHandler: () => void;
  play: boolean;
  kind: string;
}

const VivoFilterBar = ({
  filterActionHandler,
  rateActionHandler,
  playActionHandler,
  clearActionHandler,
  play = true,
  kind
}: VivoFilterBarProps) => {
  return (
    <Stack direction="row" sx={FILTER_BAR_STYLE} >
      { kind != 'traces' ? 
        <Stack direction="row">
          <InputFilter
              changeHandler={(value: string) => filterActionHandler(value, 'metadata')}
              label="Search by Metadata"
            />
            <InputFilter changeHandler={(value: string) => filterActionHandler(value, 'event')} label="Search by Event" />
        </Stack>
       :
        <Stack direction="row" className={'traces'}>
          <InputFilter changeHandler={(value: string) => filterActionHandler(value, 'event')} label="Search by Event" />
        </Stack>
      }
      
      <Typography sx={TYPOGRAPHY_DIVIDER}>Refresh time</Typography>
      <SelectFilter selectHandler={rateActionHandler} />
      <VerticalRule />
      <ButtonGroup sx={BUTTON_GROUP} aria-label="primary button group">
        <ButtonFilter
          icon={play ? <PausePresentationOutlinedIcon /> : <PlayArrowIcon />}
          label={play ? 'Pause' : 'Play'}
          clickHandler={() => playActionHandler(play)}
        />
        <ButtonFilter icon={<ClearOutlinedIcon />} label={'Clear'} clickHandler={clearActionHandler} />
      </ButtonGroup>
    </Stack>
  );
};

export default VivoFilterBar;
