import { Box } from '@chakra-ui/react'

export default function Wrapper({ children }: any) {
  return (
    <Box
      maxW="375px"
      minH="100vh"
      bgColor="#323B38"
      my="0"
      mx="auto"
      display="flex"
      flexDir="column"
      pos="relative"
      overflow="hidden"
    >
      {children}
    </Box>
  )
}
