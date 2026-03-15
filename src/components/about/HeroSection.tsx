import { Box, VStack, Text, useColorModeValue, Image, HStack, Container, Stack, Link, Tooltip } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { withBase } from '@/utils/asset'
import DynamicIcon from '../DynamicIcon'
import { siteOwner, siteConfig, heroSocialIcons } from '@/site.config'

const MotionBox = motion(Box)
const MotionText = motion(Text)

interface HeroSectionProps {
  title: string
  avatar: string
}

const HeroSection = ({ title, avatar }: HeroSectionProps) => {
  const headingColor = useColorModeValue('gray.800', 'white')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const bg = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box
      w="full"
      bg={bg}
      py={[3, 4, 6]}
      mt={[2, 3, 4]}
    >
      <Container maxW={["full", "full", "7xl"]} px={[2, 4, 8]}>
        <Stack
          direction={['column', 'column', 'row']}
          spacing={[3, 4, 6]}
          align="center"
          justify="space-between"
        >
          <VStack spacing={[2, 3]} align={['center', 'center', 'flex-start']} flex="1">
            <MotionText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              as="h1"
              fontSize={["lg", "xl", "3xl"]}
              fontWeight="bold"
              color={headingColor}
              lineHeight="shorter"
              mb={[1, 2, 3]}
              display="flex"
              alignItems="center"
              gap={[1, 2]}
              flexWrap={["wrap", "wrap", "nowrap"]}
              textAlign={["center", "center", "left"]}
              w="full"
              sx={{
                justifyContent: ["center", "center", "flex-start"]
              }}
            >
              <MotionText
                as="span"
                color="yellow.400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                $
              </MotionText>
              <MotionText
                as="span"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                overflow="hidden"
                whiteSpace="nowrap"
                display="inline-block"
              >
                Hi there, I'm{' '}
              </MotionText>
              <MotionText
                as="span"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.6 }}
                color="cyan.400"
                fontFamily="mono"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <MotionText
                  as="span"
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {siteOwner.name.display}
                </MotionText>
              </MotionText>
            </MotionText>

            <HStack
              spacing={[1, 2]}
              mb={[2, 3, 4]}
              justify={['center', 'center', 'flex-start']}
              flexWrap="wrap"
              w="full"
            >
              <Text color="yellow.400" fontSize={["xs", "sm"]}>$</Text>
              {/* <Text fontSize={["xs", "sm"]} color={useColorModeValue('gray.600', 'gray.400')}>Sometimes I</Text> */}
              <Box h={["18px", "20px", "24px"]} overflow="hidden">
                <MotionBox
                  animate={{ y: [5, -13, -31, -49, 5] }}
                  transition={{
                    duration: 4.5,
                    times: [0, 0.15, 0.3, 0.45],
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {siteOwner.rotatingSubtitles.map((text, index) => (
                    <Text
                      key={index}
                      h={["18px", "20px", "24px"]}
                      color="cyan.400"
                      fontWeight="bold"
                      fontSize={["xs", "sm"]}
                      fontFamily="mono"
                    >
                      {text}
                    </Text>
                  ))}
                </MotionBox>
              </Box>
            </HStack>


            <Box maxW={["full", "full", "900px"]} w="full" borderTop="1px dashed" borderColor={useColorModeValue('gray.200', 'gray.700')} />

            {/* Bio */}
            <Box maxW={["full", "full", "900px"]} fontSize="xs" color={textColor} lineHeight="tall" textAlign={['center', 'center', 'left']}>
              <Text as="span">I am a second-year Ph.D. candidate advised by </Text>
              <Link href="https://thehcalab.web.illinois.edu/" isExternal color="cyan.600" _hover={{ color: 'cyan.400' }}>Dr. Katherine Driggs-Campbell</Link>
              <Text as="span"> at University of Illinois Urbana-Champaign (UIUC) Electrical and Computer Engineering (ECE) department. I received my M.S.E. in Robotics from </Text>
              <Link href="https://www.grasp.upenn.edu/" isExternal color="cyan.600" _hover={{ color: 'cyan.400' }}>GRASP Lab</Link>
              <Text as="span"> of University of Pennsylvania, co-advised by </Text>
              <Link href="https://nbfigueroa.github.io/" isExternal color="cyan.600" _hover={{ color: 'cyan.400' }}>Dr. Nadia Figueroa</Link>
              <Text as="span"> and </Text>
              <Link href="https://www.grasp.upenn.edu/people/ruzena-bajcsy/" isExternal color="cyan.600" _hover={{ color: 'cyan.400' }}>Dr. Ruzena Bajcsy</Link>
              <Text as="span">. Prior to graduate study, I received my B.E. in Computer Science from </Text>
              <Link href="https://www.shanghaitech.edu.cn/eng/" isExternal color="cyan.600" _hover={{ color: 'cyan.400' }}>ShanghaiTech University</Link>
              <Text as="span"> in 2022, advised by </Text>
              <Link href="https://xmhe.bitbucket.io/" isExternal color="cyan.600" _hover={{ color: 'cyan.400' }}>Dr. Xuming He</Link>
              <Text as="span">.</Text>
            </Box>

            <Box maxW={["full", "full", "900px"]} fontSize="xs" color={textColor} lineHeight="tall" textAlign={['center', 'center', 'left']}>
              My research interests lie in human-robot interaction (HRI), particularly in preference learning and intent recognition. From an application 
              perspective, I am especially interested in assistive technologies, such as eldercare robots, which require safe and efficient HRI algorithms.
            </Box>


            <Box maxW={["full", "full", "900px"]} w="full" borderTop="1px dashed" borderColor={useColorModeValue('gray.200', 'gray.700')} />

            <Box maxW={["full", "full", "900px"]} fontSize="xs" color={textColor} lineHeight="tall" textAlign={['center', 'center', 'left']}>
              I'm always open to collaboration. If you have ideas you'd like to explore or develop together, feel free to reach out!
            </Box>

            {/* Social icons */}
            <HStack spacing={[6, 8]} justify="center" maxW={["full", "full", "900px"]} w="full">
              {heroSocialIcons.map((item) => (
                <Tooltip key={item.label} label={item.label} fontSize="xs" hasArrow placement="bottom" openDelay={200} fontFamily="mono">
                  <Link href={item.href} isExternal _hover={{ textDecoration: 'none' }}>
                    <Box
                      p={1.5}
                      cursor="pointer"
                      color={useColorModeValue('gray.400', 'gray.500')}
                      transition="all 0.2s"
                      _hover={{ color: item.color, transform: 'scale(1.2)' }}
                    >
                      <DynamicIcon name={item.icon} boxSize={[5, 6]} />
                    </Box>
                  </Link>
                </Tooltip>
              ))}
            </HStack>

          </VStack>
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <VStack spacing={[2, 3]}>
              <Image
                src={withBase(`images/${avatar}`)}
                alt={title}
                borderRadius="xl"
                boxSize={["160px", "190px", "230px"]}
                objectFit="cover"
              />
              {(siteConfig.pets as { name: string; emoji: string; image: string; title: string; description: string }[]).length > 0 && (
                <HStack spacing={[8, 12]} justify="center" mt={[3, 4]}>
                  {(siteConfig.pets as { name: string; emoji: string; image: string; title: string; description: string }[]).map((pet) => (
                    <Tooltip key={pet.name} label={pet.description} fontSize="xs" hasArrow placement="bottom" openDelay={200} fontFamily="mono">
                      <VStack spacing={1} cursor="default">
                        {pet.image && (
                          <Image
                            src={pet.image}
                            alt={pet.name}
                            borderRadius="full"
                            boxSize={["60px", "72px"]}
                            objectFit="cover"
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
              )}
            </VStack>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  )
}

export default HeroSection
