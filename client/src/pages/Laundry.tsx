import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MachineCard from "../components/MachineCard";

import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../app/store";
//actions
import { createLaundry, createMachine } from "../app/features/laundrySlice";
import { Laundry as LaundryType, Machine } from "../types/laundryTypes";
import MachineAddForm from "../components/MachineAddForm";
//axios
import laundryServices from "../app/services/laundryServices";

type locationStateProps = LaundryType | null;

export default function Laundry() {
  //TODO: Refactor. Split this component to 2 or three
  const location = useLocation();
  const locationState = location.state as locationStateProps;
  console.log("locationState", locationState);

  let navigate = useNavigate();
  let auth = useAuth();
  const dispatch = useAppDispatch();
  const [newLaundry, setNewLaundry] = useState<LaundryType | null>(null);
  console.log("newLaundry", newLaundry);

  const [newMachines, setNewMachines] = useState<Machine[]>([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    locationState && setNewLaundry(locationState);
    return () => {};
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let name = formData.get("name") as string;
    let phone = formData.get("phone") as string;
    let address = formData.get("address") as string;
    let city = formData.get("city") as string;
    let postcode = formData.get("postcode") as string;
    let isAdmin = formData.get("admin") as number | null;

    const laundryData: Omit<LaundryType, "id" | "is_active"> = {
      name,
      phone,
      address,
      city,
      postcode,
      admin_id: isAdmin,
    };
    dispatch(createLaundry(laundryData))
      .unwrap()
      .then((originalPromiseResult) => {
        setNewLaundry(originalPromiseResult.data.laundry);
        enqueueSnackbar(
          `Laundry ${originalPromiseResult.data.laundry.name} added`,
          {
            variant: "success",
          }
        );
      })
      .catch((rejectedValueOrSerializedError) => {
        enqueueSnackbar(rejectedValueOrSerializedError.message, {
          variant: "error",
        });
      });
  }
  function handleMachineAdd(machNumber: number, machSize: number) {
    newLaundry &&
      dispatch(
        createMachine({
          size: machSize,
          number: machNumber,
          laundryId: newLaundry?.id,
        })
      )
        .unwrap()
        .then((originalPromiseResult) => {
          setNewMachines([
            ...newMachines,
            originalPromiseResult.data.newMachine,
          ]);
          enqueueSnackbar(
            `Machine ${originalPromiseResult.data.newMachine.number} added`,
            {
              variant: "success",
            }
          );
        })
        .catch((rejectedValueOrSerializedError) => {
          enqueueSnackbar(rejectedValueOrSerializedError.message, {
            variant: "error",
          });
        });
  }

  function handleMachineDelete(id: number) {
    laundryServices
      .removeMachine(id)
      .then((result) => {
        setNewMachines(
          newMachines.filter(
            (machine) => machine.id !== result.data.data.deletedId
          )
        );
        enqueueSnackbar(`Machine id:${result.data.data.deletedId} removed`, {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      });
  }
  return (
    <Box>
      <Container maxWidth="md">
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h3">
              Add a Laundry
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Laundry name"
                    name="name"
                    defaultValue={newLaundry?.name}
                    disabled={newLaundry ? true : false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone"
                    type="text"
                    id="phone"
                    defaultValue={newLaundry?.phone}
                    disabled={newLaundry ? true : false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Laundry Address"
                    name="address"
                    defaultValue={newLaundry?.address}
                    disabled={newLaundry ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="city"
                    name="city"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    defaultValue={newLaundry?.city}
                    disabled={newLaundry ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="postcode"
                    label="Postcode"
                    name="postcode"
                    autoComplete="postal-code"
                    defaultValue={newLaundry?.address}
                    disabled={newLaundry ? true : false}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  disabled={newLaundry ? true : false}
                  control={
                    <Checkbox
                      value={auth.user?.id}
                      color="primary"
                      name="admin"
                    />
                  }
                  label="I am admin of this laundry."
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={newLaundry ? true : false}
              >
                Register Laundry
              </Button>
            </Box>
          </Box>
          {newLaundry && (
            <Box>
              <Typography
                component="h3"
                variant="h6"
                sx={{ my: 2, textAlign: "center" }}
              >
                Add Machines to laundry
              </Typography>
              <MachineAddForm handleMachineAdd={handleMachineAdd} />
              <Typography
                component="h3"
                variant="h6"
                sx={{ my: 2, textAlign: "center" }}
              >
                Laundry's Machines
              </Typography>
              {newMachines.map((machine) => (
                <MachineCard
                  machine={machine}
                  onMachineDelete={handleMachineDelete}
                  key={machine.id}
                />
              ))}
            </Box>
          )}
        </Container>
      </Container>
    </Box>
  );
}
