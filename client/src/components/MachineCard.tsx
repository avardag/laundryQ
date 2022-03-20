import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Machine } from "../types/laundryTypes";

import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  display: "flex",
  justifyContent: "space-between",
  // color: theme.palette.main,
}));

const StyledSpan = styled("span")({
  color: "teal",
});

// export default function MachineCard({ id, size, number }: Machine) {
type MachineCardProps = {
  machine: Machine;
};
export default function MachineCard({ machine }: MachineCardProps) {
  return (
    <StyledCard>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          Machine Number in Laundry: <StyledSpan>{machine.number}</StyledSpan>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Machine Size: <StyledSpan>{machine.size} kg</StyledSpan>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color="error">
          Delete
        </Button>
      </CardActions>
    </StyledCard>
  );
}
