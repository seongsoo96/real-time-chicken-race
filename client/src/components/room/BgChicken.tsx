import { Icon } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  color: string
}

export default function BgChicken({ color }: Props) {
  return (
    <Icon
      w="44px"
      h="44px"
      pos="absolute"
      display="flex"
      viewBox="0 0 112 128"
      color={color}
    >
      <path
        fill="currentColor"
        d="M88 128V112H80V104H88V96H96V88H104V80H112V72V64V56H104V48H96V40H88V32V24H80V16H72V8H64V0H48V8H40V16H32V24H24V32V40H16V48H8V56H0V64V72V80H8V88H16V96H24V104H32V112H24V128H88Z"
      />
    </Icon>
  )
}
