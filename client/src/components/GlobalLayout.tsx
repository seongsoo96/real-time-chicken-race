import { Box } from '@chakra-ui/react'
import { GlobalLayoutProps } from 'types'

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <Box h="100vh" bg="#323B38" textAlign="center">
      {children}
    </Box>
  )
}
