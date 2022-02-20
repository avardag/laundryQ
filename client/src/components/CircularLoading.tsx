import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularLoading() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={120} />
    </Box>
  );
}
