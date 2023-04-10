// import { Flex, Box, Text, Img } from '@chakra-ui/react'
// import { MouseEvent, ReactNode } from 'react'
// import { PlayerInfo, RoomInfo } from 'types'
// import BgChicken from './BgChicken'

// type Props = {
//   mainIcon?: string
//   description: ReactNode
//   buttonIcon: string
//   onButtonClick?: (event?: MouseEvent<HTMLDivElement>) => void
// }

// export default function PlayerListItem({
//   buttonIcon,
//   description,
//   mainIcon,
//   onButtonClick,
// }: Props) {
//   return (
//     <Flex bgImg="" h="72px">
//       {mainIcon ? (
//         <Box w="72px" px="5px" py="8px" bgImg="/images/room/bgChicken.png">
//           <Box
//             h="full"
//             bgColor="#fff"
//             pos="relative"
//             opacity="0.5"
//             px="9px"
//             py="6px"
//           >
//             <BgChicken color="blue" />
//             <Img pos="absolute" src={main} />
//           </Box>
//         </Box>
//       ) : null}
//       <Box flex="1" px="12px" py="15.5px" bgImg="/images/room/bgList.png">
//         {description}
//         {/* <Text fontSize="14px" align="left">
//           홍길동
//         </Text>
//         <Text fontSize="14px" align="left">
//           28,000km
//         </Text> */}
//       </Box>

//       <Box
//         w="72px"
//         p="7px"
//         bgImg="/images/room/bgBadge.png"
//         onClick={(event) => onButtonClick && onButtonClick(event)}
//       >
//         <Img
//           src={buttonIcon ? buttonIcon : '/images/room/badgeRed.png'}
//           alt="badge-red"
//         />
//       </Box>
//     </Flex>
//   )
// }
