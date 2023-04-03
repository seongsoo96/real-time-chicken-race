import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function ListItems({ children }: Props) {
  return (
    <Box bgColor="#FAF0D1" p={1}>
      <Box bgColor="#EFAF6F" p={1}>
        <Box bgColor="#DF9A59" p={1}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
