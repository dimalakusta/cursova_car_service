import {
  Autocomplete as MuiAutocomplete,
  TextField,
  Checkbox,
  InputAdornment
} from '@mui/material';
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
  SearchRounded as SearchRoundedIcon
} from '@mui/icons-material';
import { useController } from 'react-hook-form';

const MIN_AUTOCOMPLETE_PAPER_WIDTH = 185;

const Autocomplete = ({
  name,
  control,
  options,
  displayedLabelName,
  label = '',
  placeholder = 'Введіть послугу',
  paperWidth = MIN_AUTOCOMPLETE_PAPER_WIDTH
}) => {
  const { field } = useController({ name, control });

  const handleChange = (event, value) => {
    field.onChange(value);
  };

  return (
    <MuiAutocomplete
      multiple
      onChange={handleChange}
      options={options}
      // disableCloseOnSelect
      getOptionLabel={option => option[displayedLabelName]}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxIcon fontSize="small" color="primary" />}
            checkedIcon={<CheckBoxOutlineBlankIcon fontSize="small" color="primary" />}
            style={{ marginRight: 8 }}
            checked={!selected}
          />
          {option[displayedLabelName]}
        </li>
      )}
      style={{ width: paperWidth }}
      renderInput={params => <TextField {...params} label={label} placeholder={placeholder} />}
    />
  );
};

export { Autocomplete };
