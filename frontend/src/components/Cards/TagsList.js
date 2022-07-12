import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography, Link } from "@mui/material";
export default function TagsList(props) {
  const tags = props.tags;
  return (
    <Stack spacing={1} direction="row">
      {tags ? tags.map((tag) => (
        <Link
          href={"/question/tagged/[" + tag.name + "]"}
          underline="none"
          sx={{
            padding: "2px 5px",
            color: "#39739D",
            backgroundColor: "#E1ECF4",
            borderRadius: "3px",
            "&:hover": {
              color: "#2C5877",
              backgroundColor: "#D0E3F1",
            },
          }}
        >
          <Typography
            variant="body1"
            component="div"
            sx={{
              display: { xs: "none", sm: "inline-block" },
              fontFamily:
                '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
              marginRight: "0px",
              fontSize: "12px",
              wordWrap: "wrap",
              wordBreak: "break-all",
            }}
            textTransform="none"
          >
            {tag.name}
          </Typography>
        </Link>
      )): null}
    </Stack>
  );
}
