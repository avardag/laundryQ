import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { Laundry } from "../types/laundryTypes";

interface LaundryEditCardProps {
  laundry: Laundry;
  onDelete: (id: number) => void;
  onActivate: (id: number) => void;
}

export default function LaundryEditCard({
  laundry,
  onDelete,
  onActivate,
}: LaundryEditCardProps) {
  return (
    <Card
      sx={{
        minWidth: 250,
        my: 1,
      }}
    >
      <Typography
        variant="body1"
        color="primary"
        align="center"
        sx={{ backgroundColor: grey[100] }}
      >
        {laundry.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardContent>
          <Box>
            <Typography>
              {laundry.address},{laundry.postcode}, {laundry.city}
            </Typography>
          </Box>
          <Box>
            <Typography>tel: {laundry.phone}</Typography>
          </Box>
          <Box>
            {laundry.is_active ? (
              <Typography color="primary" variant="subtitle2">
                Active
              </Typography>
            ) : (
              <Typography color="error" variant="subtitle2">
                Not Active
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ flexDirection: "column" }}>
          <Button
            component={RouterLink}
            to="/laundry"
            state={{ id: laundry.id }}
            size="small"
            color="success"
          >
            Edit
          </Button>
          {laundry.is_active ? (
            <Button
              size="small"
              color="error"
              onClick={() => onActivate(laundry.id)}
            >
              Deactivate
            </Button>
          ) : (
            <Button
              size="small"
              color="info"
              onClick={() => onActivate(laundry.id)}
            >
              Activate
            </Button>
          )}
          <Button
            size="small"
            color="secondary"
            onClick={() => onDelete(laundry.id)}
          >
            Delete
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

/**
 * <Link to="/laundry" state={{ id: laundry.id }}>
              <LaundryEditCard
                laundry={laundry}
                onDelete={handleLaundryDelete}
              />
            </Link>
 */
