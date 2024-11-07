import React from 'react'
import { HStack, Stack } from "@chakra-ui/react"
import { Skeleton, SkeletonCircle } from "./skeleton1"
function Skeletons() {
  return (
    <div>
<Stack gap="5">
      <SkeletonCircle size="12" />
      <Stack flex="1">
        <Skeleton height="5" />
        <Skeleton height="5" width="100%" />
      </Stack>
      <SkeletonCircle size="12" />
      <Stack flex="1">
        <Skeleton height="5" />
        <Skeleton height="5" width="100%" />
      </Stack>
      <SkeletonCircle size="12" />
      <Stack flex="1">
        <Skeleton height="5" />
        <Skeleton height="5" width="100%" />
      </Stack>
      <SkeletonCircle size="12" />
      <Stack flex="1">
        <Skeleton height="5" />
        <Skeleton height="5" width="100%" />
      </Stack>
    </Stack>
    </div>
  )
}

export default Skeletons