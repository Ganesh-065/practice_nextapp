import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function BasicCard() {
  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 290,
        borderRadius: 2,
        height: "max-content",
        backgroundColor: "#e9e9e9",
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert"
          height={35}
          width={35}
        />
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          HR Prompt Pack
        </Typography>
        <Typography variant="body2">563 prompts</Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default BasicCard;

export function SecondaryCard() {
  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 290,
        borderRadius: 2,
        height: "max-content",
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Introduction to Prompt Engineering
            </Typography>
            <Typography variant="body2">12 lessons . 5 hours</Typography>
          </Box>
          <CircularProgress variant="determinate" value={60} />
        </Box>
      </CardContent>
      {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
    </Card>
  );
}
