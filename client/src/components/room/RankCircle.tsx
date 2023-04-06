import { Box, Flex, Text } from '@chakra-ui/react'

export default function RankCircle({ imgName }: { imgName: string }) {
  const url = `/images/room/${imgName}.png`
  return (
    <Box w="72px" p="7px" bgImg="/images/room/bgBadge.png">
      <Flex
        bgImg={url}
        height="100%"
        bgSize="cover"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="28px">1</Text>
      </Flex>
    </Box>
  )
}
