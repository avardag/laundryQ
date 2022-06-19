import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

import HeroSection from "../components/HeroSection";

import AddLaundrySection from "../components/AddLaundrySection";

export default function Home() {
  return (
    <Box>
      <Container maxWidth="xl">
        <HeroSection />
      </Container>
      <Box sx={{ bgcolor: grey[200] }}>
        <Container maxWidth="lg">
          <AddLaundrySection />
        </Container>
      </Box>
    </Box>
  );
}
