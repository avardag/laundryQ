import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAuth } from "../hooks/useAuth";
import { useAppSelector, useAppDispatch } from "../app/store";
import { getAllLaundries } from "../app/features/laundrySlice";
import { updateUserLaundry } from "../app/features/authSlice";
import { Divider } from "@mui/material";

export default function MyLaundry() {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const laundries = useAppSelector((state) => state.laundry.laundries);
  useEffect(() => {
    dispatch(getAllLaundries());
  }, []);
  const [laundry, setLaundry] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setLaundry(event.target.value);
  };
  const handleSubmit = () => {
    if (laundry && auth.user?.id) {
      let laundryId = parseInt(laundry);
      dispatch(updateUserLaundry({ id: auth.user?.id, laundryId }));
    }
  };
  //height og a select dropdown. Paper inside of select compt
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
  const usersLaundry = () => {
    const usersLnd = auth.user?.laundryId
      ? laundries.find((l) => l.id === auth.user?.laundryId)
      : null;
    if (usersLnd) {
      return `${usersLnd.name} on ${usersLnd.address}`;
    }
  };
  return (
    <Box>
      {auth.user?.laundryId ? (
        <Typography mt={8}>
          Your registered laundry is <em>{usersLaundry()}</em>
        </Typography>
      ) : (
        <Typography color="red">
          You don't have a laundry registered on your account
        </Typography>
      )}
      <Divider sx={{ mb: 5, mt: 1 }} />
      <Typography variant="h6" color="primary">
        You can set or update your laundry
      </Typography>
      <FormControl variant="standard" fullWidth>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={laundry}
          onChange={handleChange}
          label="Laundry"
          MenuProps={MenuProps}
          displayEmpty
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {laundries.map((laundry) => (
            <MenuItem key={laundry.id} value={laundry.id}>
              {laundry.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        size="large"
        variant="contained"
        sx={{ mt: 5 }}
        onClick={handleSubmit}
      >
        Sumit
      </Button>
    </Box>
  );
}
