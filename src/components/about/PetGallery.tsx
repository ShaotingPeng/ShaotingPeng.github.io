import { useState } from 'react'
import {
  Box,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { withBase } from '@/utils/asset'
import { pets, type Pet } from '@/site.config'

/**
 * Hero pet avatars. A pet with a `photo` becomes a button that opens
 * the full portrait in a lightbox; one without stays a plain label.
 */
const PetGallery = () => {
  const [selected, setSelected] = useState<Pet | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const modalBg = useColorModeValue('white', 'gray.800')
  const captionColor = useColorModeValue('gray.500', 'gray.400')

  if (pets.length === 0) return null

  const openPortrait = (pet: Pet) => {
    setSelected(pet)
    onOpen()
  }

  return (
    <>
      <HStack spacing={[8, 12]} justify="center" mt={[3, 4]}>
        {pets.map((pet) => (
          <Tooltip
            key={pet.name}
            label={pet.description}
            fontSize="xs"
            hasArrow
            placement="bottom"
            openDelay={200}
            fontFamily="mono"
          >
            <VStack
              as={pet.photo ? 'button' : 'div'}
              role="group"
              spacing={1}
              px={2}
              py={1}
              borderRadius="lg"
              cursor={pet.photo ? 'zoom-in' : 'default'}
              onClick={pet.photo ? () => openPortrait(pet) : undefined}
              aria-label={pet.photo ? `View a larger photo of ${pet.name}` : undefined}
              transition="transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
              _hover={pet.photo ? { transform: 'translateY(-3px)' } : undefined}
              _active={pet.photo ? { transform: 'translateY(-1px)' } : undefined}
              _focusVisible={{
                outline: '2px solid',
                outlineColor: 'cyan.400',
                outlineOffset: '3px',
              }}
            >
              {pet.image && (
                <Image
                  src={withBase(pet.image)}
                  alt={pet.name}
                  borderRadius="full"
                  boxSize={["60px", "72px"]}
                  objectFit="cover"
                  boxShadow="0 0 0 0 rgba(0, 0, 0, 0)"
                  transition="transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s"
                  _groupHover={pet.photo ? {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 0 3px var(--chakra-colors-cyan-400)',
                  } : undefined}
                />
              )}
              <Text fontSize="sm" fontWeight="medium">{pet.name} {pet.emoji}</Text>
              {pet.title && (
                <Text fontSize="xs" color="gray.500">{pet.title}</Text>
              )}
            </VStack>
          </Tooltip>
        ))}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalCloseButton />
          <ModalBody p={4}>
            {selected?.photo && (
              <VStack spacing={3} align="stretch">
                <Image
                  src={withBase(selected.photo)}
                  alt={selected.name}
                  maxH="75vh"
                  w="full"
                  objectFit="contain"
                  borderRadius="md"
                />
                <Box>
                  <Text fontSize="sm" fontWeight="medium">{selected.name} {selected.emoji}</Text>
                  <Text fontSize="xs" color={captionColor} fontFamily="mono">{selected.description}</Text>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PetGallery
