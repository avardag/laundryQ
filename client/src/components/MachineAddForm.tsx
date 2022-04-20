import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Machine } from "../types/laundryTypes";

type MachineFormProps = {
  handleMachineAdd: (machNumber: number, machSize: number) => void;
};

export default function MachineAddForm({ handleMachineAdd }: MachineFormProps) {
  const [machNumber, setMachNumber] = useState(1);
  const [machSize, setMachSize] = useState(1);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleMachineAdd(machNumber, machSize);
    setMachNumber(1);
    setMachSize(1);
  }
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            type="number"
            InputProps={{ inputProps: { min: 1, max: 200 } }}
            id="number"
            label="Machine Number"
            name="number"
            helperText="Machine number in laundry"
            value={machNumber}
            onChange={(e) =>
              e.target.value && setMachNumber(parseInt(e.target.value))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            type="number"
            InputProps={{ inputProps: { min: 1, max: 100 } }}
            id="size"
            label="Machine Size"
            name="size"
            helperText="Size in kilograms"
            value={machSize}
            onChange={(e) =>
              e.target.value && setMachSize(parseInt(e.target.value))
            }
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
        Add
      </Button>
    </Box>
  );
}
