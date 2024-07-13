import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { Diagnosis } from "../../types";
import diagnosesServices from "../../services/diagnoses";

type CodeSelectorProps = {
    selected:(data:string[]) => void
};

const CodeSelector = ({selected}:CodeSelectorProps) => {

    const [codes, setCodes] = useState<Array<Diagnosis>>([]);
    const [selectedCodes, setsetSelectedCodes] = useState<string[]>([]);

    useEffect(() => {
        const getData = async() => {
            const data = await diagnosesServices.getAll();
            setCodes(data);
        };
        getData();
    },[]);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };
    const handleChange = (event: SelectChangeEvent<typeof selectedCodes>) => {
        const {
          target: { value },
        } = event;
        const codes = typeof value === 'string' ? value.split(',') : value;
        setsetSelectedCodes(codes);
        selected(codes);
      };
    return (
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Diagnosis Codes</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedCodes}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {codes.map((code) => (
                <MenuItem key={code.code} value={code.code}>
                  <Checkbox checked={selectedCodes.indexOf(code.code) > -1} />
                  <ListItemText primary={code.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      );
};

export default CodeSelector;