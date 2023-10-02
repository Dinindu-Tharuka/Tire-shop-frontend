import { Box, Flex, Image } from "@chakra-ui/react"
import main_image from '../assets/main.jpeg'

const MainImage = () => {
  return (
    <Flex alignItems='center' justifyContent='center' width='100%'>
      <Image height='80vh' src={main_image} borderRadius={100}/>
    </Flex>
  )
}

export default MainImage