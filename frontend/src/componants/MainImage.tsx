import { Box, Image } from "@chakra-ui/react"
import main_image from '../assets/main.jpeg'

const MainImage = () => {
  return (
    <Box alignItems='center' justifyContent='center'>
      <Image height='50vh' src={main_image}/>
    </Box>
  )
}

export default MainImage