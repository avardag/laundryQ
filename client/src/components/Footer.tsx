import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Logo from "../assets/LaundryQ_logo_bl_bg.png";

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Contacts",
    description: [
      "Laundry Q llc",
      "Alpha Str 22",
      "Stockholm",
      "tel: +46(76)111221",
    ],
  },
];

function Copyright() {
  return (
    <Typography variant="body2" color="#fff">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/" underline="none">
        Laundry Q
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.primary.main
            : theme.palette.primary.light,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            py: 3,
          }}
        >
          <Box
            component="img"
            sx={{
              height: 50,
            }}
            alt="Your logo."
            src={Logo}
          />
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="white" gutterBottom>
                  {footer.title}
                </Typography>
                {footer.description.map((item) => (
                  <Link
                    href="#"
                    variant="subtitle1"
                    color="text.secondary"
                    underline="none"
                  >
                    <p>{item}</p>
                  </Link>
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Copyright />
        </Stack>
      </Container>
    </Box>
  );
}
