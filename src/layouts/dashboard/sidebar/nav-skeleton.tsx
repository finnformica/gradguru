import { Skeleton, Stack } from "@mui/material";
import _ from "lodash";

type NewSkeletonProps = {
  count: number;
};

const NavSkeleton = ({ count }: NewSkeletonProps) => {
  return (
    <Stack
      direction={"column"}
      sx={{ height: "90vh" }}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack spacing={2}>
        {_.range(count).map((c) => (
          <Stack
            key={c}
            direction={"column"}
            spacing={1}
            justifyContent="center"
            alignItems="center"
            mx="auto"
            maxWidth="100%"
          >
            <Skeleton variant="circular" width={35} height={35} />
            <Skeleton variant="text" sx={{ fontSize: "0.5rem", width: 50 }} />
          </Stack>
        ))}
      </Stack>
      <Skeleton variant="circular" width={35} height={35} sx={{ mb: "2rem" }} />
    </Stack>
  );
};

export default NavSkeleton;
