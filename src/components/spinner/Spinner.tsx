import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface ISpinnerProps {
  marginTop?: string;
  marginBottom?: string;
}
export function Spinner(props: ISpinnerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
