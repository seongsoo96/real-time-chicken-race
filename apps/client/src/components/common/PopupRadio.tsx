import { Stack, Text, HStack, useRadioGroup } from '@chakra-ui/react'
import CustomRadio from './CustomRadio'

type Props = {
  func: (color: string) => void
}

export default function PopupRadio({ func }: Props) {
  const colors = [
    { name: 'white', color: '#FFFFFF' },
    { name: 'red', color: '#F94143' },
    { name: 'orange', color: '#F9961F' },
    { name: 'yellowGreen', color: '#91BE6D' },
    { name: 'green', color: '#43AA8C' },
    { name: 'blue', color: '#57758F' },
  ]

  const { getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: '#FFFFFF',
    onChange: (color: string) => func(color),
  })

  return (
    <>
      <Stack {...getRootProps()}>
        <Text mb={2} color="#fff">
          캐릭터 색상
        </Text>
        <HStack display="flex" justifyContent="space-around">
          {colors.map((color) => (
            <CustomRadio
              key={color.name}
              color={color.color}
              {...getRadioProps({ value: color.color })}
            />
          ))}
        </HStack>
      </Stack>
    </>
  )
}
