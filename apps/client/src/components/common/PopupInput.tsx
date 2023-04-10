import { Text, Input } from '@chakra-ui/react'
import React from 'react'

type PopupInputProps = {
  title: string
  type: string
  name: string
  value: string | number
  func: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PopupInput(props: PopupInputProps) {
  const { title, type, name, value, func } = props
  return (
    <>
      <Text mb={2} color="#fff">
        {title}
      </Text>
      <Input
        mb={6}
        borderRadius="none"
        bgColor="#fff"
        type={type}
        name={name}
        value={value}
        onChange={func}
        placeholder={`${title}을 입력하세요.`}
      />
    </>
  )
}
