import { Box, chakra, useRadio } from '@chakra-ui/react'

type Props = {
  color: string
}

export default function CustomRadio(props: Props) {
  const { color, ...radioProps } = props
  const { state, getInputProps, getRadioProps, htmlProps } =
    useRadio(radioProps)

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({})} hidden />
      <Box {...getRadioProps} w="42px" h="42px" border="4px solid #fff">
        <Box
          w="full"
          h="full"
          bgColor={color}
          bgImg={state.isChecked ? '/images/common/check.png' : 'transparent'}
          bgSize="85%"
          bgRepeat="no-repeat"
          bgPos="center"
        />
      </Box>
    </chakra.label>
  )
}
