import { Box, Container, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'

const photos = [
  // Dec 2025 - Yunnan
  { src: '/images/photo/lugulake.jpeg', location: 'Lugu Lake, Yunnan, China', date: 'December 2025', camera: 'iPhone' },
  { src: '/images/photo/szl.jpeg', location: 'Songzanlin monastery, Yunnan, China', date: 'December 2025', camera: 'iPhone' },
  { src: '/images/photo/deqing.jpeg', location: 'Meili Snow Mountains, Yunnan, China', date: 'December 2025', camera: 'iPhone' },
  // Nov 2025 - Cruise
  { src: '/images/photo/cruise.JPG', location: 'Royal Carribian Cruise - Icon of the Sea', date: 'November 2025', camera: 'iPhone' },
  { src: '/images/photo/miami.jpeg', location: 'Miami, Florida, USA', date: 'November 2025', camera: 'iPhone' },
  // May 2025 - Yellowstone
  { src: '/images/photo/ys1.JPG', location: 'Yellowstone, Wyoming, USA', date: 'May 2025', camera: 'Canon EOS R5' },
  { src: '/images/photo/ys2.jpeg', location: 'Yellowstone, Wyoming, USA', date: 'May 2025', camera: 'iPhone' },
  { src: '/images/photo/ys3.JPG', location: 'Yellowstone, Wyoming, USA', date: 'May 2025', camera: 'iPhone' },
  // November 2024 — Hawaii
  { src: '/images/photo/hwi4.JPG', location: 'Waikiki, Hawaii, USA', date: 'November 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/hwi3.JPG', location: 'Diamond Head Monument, Hawaii, USA', date: 'November 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/hwi1.JPG', location: 'Waikiki, Hawaii, USA', date: 'November 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/hwi2.JPG', location: 'Polynesian Culture Center, Hawaii, USA', date: 'November 2024', camera: 'Fujifilm X-T4' },
  // August 2024 — Urbana
  { src: '/images/photo/cat3.jpg', location: 'Urbana, Illinois, USA', date: 'August 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/cat4.jpg', location: 'Urbana, Illinois, USA', date: 'August 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/cat5.jpg', location: 'Urbana, Illinois, USA', date: 'August 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/cat6.jpg', location: 'Urbana, Illinois, USA', date: 'August 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/cat7.jpg', location: 'Urbana, Illinois, USA', date: 'August 2024', camera: 'Fujifilm X-T4' },
  // April 2024 — Southwest USA
  { src: '/images/photo/zion1.jpg', location: 'Zion National Park, Utah, USA', date: 'April 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/hs.jpg', location: 'Horseshoe Bend, Arizona, USA', date: 'April 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/av.jpg', location: 'Antelope Canyon, Arizona, USA', date: 'April 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/mv.jpg', location: 'Monument Valley, Arizona, USA', date: 'April 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/mv1.jpg', location: 'Monument Valley, Arizona, USA', date: 'April 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/mv2.jpg', location: 'Monument Valley, Arizona, USA', date: 'April 2024', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/gc.jpg', location: 'Grand Canyon National Park, Arizona, USA', date: 'April 2024', camera: 'Fujifilm X-T4' },
  // March 2024 — Philadelphia
  { src: '/images/photo/cat2.jpg', location: "My friend's cat, Philadelphia, USA", date: 'March 2024', camera: 'iPhone' },
  // August–September 2023 — Japan
  { src: '/images/photo/j1.jpg', location: 'Tokyo Skytree, Tokyo, Japan', date: 'August–September 2023', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/j2.jpg', location: 'Sensō-ji, Tokyo, Japan', date: 'August–September 2023', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/j3.jpg', location: 'Sushi, Tokyo, Japan', date: 'August–September 2023', camera: 'Fujifilm X-T4' },
  // August 2023 — Hong Kong
  { src: '/images/photo/hk1.jpg', location: 'Victoria Harbour, Hong Kong, China', date: 'August 2023', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/hk2.jpg', location: 'Street view, Hong Kong, China', date: 'August 2023', camera: 'Fujifilm X-T4' },
  // July 2023 — New York & Philadelphia
  { src: '/images/photo/ny1.jpg', location: 'The Vessel, New York, USA', date: 'July 2023', camera: 'Fujifilm X-T4' },
  { src: '/images/photo/cat1.jpg', location: "Friend's cat, Philadelphia, USA", date: 'July 2023', camera: 'Fujifilm X-T4' },
  // June 2023 — Philadelphia
  { src: '/images/photo/tracking1.jpg', location: '"Full body tracking", Philadelphia, USA', date: 'June 2023', camera: 'iPhone' },
]

export default function Photo() {
  const [selected, setSelected] = useState<typeof photos[0] | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const captionColor = useColorModeValue('gray.500', 'gray.400')

  const handleOpen = (photo: typeof photos[0]) => {
    setSelected(photo)
    onOpen()
  }

  return (
    <Box w="full" py={[4, 6, 8]}>
      <Container maxW={["full", "full", "7xl"]} px={[2, 4, 8]}>
        <VStack spacing={[4, 6]} align="stretch">
          <Flex align="center" gap={3}>
            <Box h="2px" w="20px" bg="cyan.400" borderRadius="full" flexShrink={0} />
            <Heading size="md" fontWeight="semibold">Traveling Photography</Heading>
            <Box flex="1" h="1px" bg={borderColor} />
          </Flex>

          <Box
            display="grid"
            gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
            gap={4}
          >
            {photos.map((photo, i) => (
              <Box
                key={i}
                overflow="hidden"
                borderRadius="md"
                border="1px solid"
                borderColor={borderColor}
                bg={bg}
                cursor="zoom-in"
                onClick={() => handleOpen(photo)}
                transition="all 0.2s"
                _hover={{ borderColor: 'cyan.400' }}
              >
                <Image
                  src={photo.src}
                  alt={photo.location}
                  w="full"
                  display="block"
                  transition="transform 0.3s"
                  _hover={{ transform: 'scale(1.02)' }}
                />
                <Box px={3} py={2}>
                  <Text fontSize="xs" color={useColorModeValue('gray.700', 'gray.200')} fontWeight="medium">{photo.location}</Text>
                  <Text fontSize="xs" color={captionColor}>{photo.date} · {photo.camera}</Text>
                </Box>
              </Box>
            ))}
          </Box>
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalCloseButton />
          <ModalBody p={4}>
            {selected && (
              <VStack spacing={3} align="stretch">
                <Image
                  src={selected.src}
                  alt={selected.location}
                  maxH="75vh"
                  w="full"
                  objectFit="contain"
                  borderRadius="md"
                />
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('gray.700', 'gray.200')}>{selected.location}</Text>
                  <Text fontSize="xs" color={captionColor}>{selected.date} · {selected.camera}</Text>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
