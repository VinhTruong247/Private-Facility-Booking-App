import { Box, Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        marginTop: "2rem",
        marginBottom: "2rem",
        minHeight: "calc(100vh - 250px)",
        padding: "2rem",
      }}
    >
      <Skeleton height={80} />
      <Skeleton variant="rectangular" height={200} />
    </Box>
  );
};

export default Loading;
