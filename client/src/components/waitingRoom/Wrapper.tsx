import { Box } from '@chakra-ui/react'

export default function Wrapper({ children }: any) {
  return (
    <Box
      maxW="375px"
      minH="100vh"
      my="0"
      mx="auto"
      display="flex"
      flexDir="column"
    >
      {children}
    </Box>
  )
}
