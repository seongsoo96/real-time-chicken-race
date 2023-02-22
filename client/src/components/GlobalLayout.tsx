import { Box } from '@chakra-ui/react'
import { GlobalLayoutProps } from '../../interface'

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <Box
      maxW="500px"
      h="100vh"
      my="0"
      mx="auto"
      bg="lightgray"
      textAlign="center"
    >
      {children}
    </Box>
  )
}
