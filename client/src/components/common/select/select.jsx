import {
  FormControl,
  InputLabel,
  ListItemText,
  Select as MUISelect,
  MenuItem
} from '@mui/material';
import { useController } from 'react-hook-form';

const MIN_SELECT_PAPER_WIDTH = 185;

const Select = ({
  name,
  control,
  options,
  label = '',
  paperWidth = MIN_SELECT_PAPER_WIDTH,
  selectedValueFieldName = 'id',
  selectedValueLabelName,
  disabled = false
}) => {
  const { field } = useController({ name, control });

  const handleChange = event => {
    const {
      target: { value }
    } = event;

    field.onChange(value);
  };

  return (
    <FormControl sx={{ width: paperWidth }}>
      <InputLabel id="select-label">{label}</InputLabel>
      <MUISelect
        labelId="select-label"
        autoWidth
        displayEmpty
        label={label}
        disabled={disabled}
        value={field.value}
        onChange={handleChange}
        sx={{
          '& .MuiInputBase-input': { minWidth: paperWidth }
        }}
        MenuProps={{
          PaperProps: {
            style: {
              width: paperWidth,
              minWidth: paperWidth
            }
          }
        }}
      >
        {options.map(option => (
          <MenuItem key={option.id} value={option[selectedValueFieldName]} sx={{ padding: '12px' }}>
            <ListItemText primary={option[selectedValueLabelName]} />
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};

export { Select };
