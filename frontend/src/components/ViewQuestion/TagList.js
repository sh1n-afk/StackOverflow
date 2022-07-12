import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function TagList(props) {
  const [tag, setTag] = React.useState(props.tag);
  useEffect(() => {
    setTag(props.tag);
  }, [props.tag]);

  return (
    <Box
      component="div"
      sx={{
        display: "inline",
        p: 1,
        m: 0.5,
        bgcolor: "#e1ecf4",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 1,
        fontSize: "12px",
        fontWeight: "700",
      }}
    >
      <Link
        to={"/questions/tagged/[" + tag.name + "]"}
        style={{ textDecoration: "none", color: "#39739d" }}
      >
        {tag.name}
      </Link>
    </Box>
  );
}
