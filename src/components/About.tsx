import { Box, VStack, Heading, Text, useColorModeValue, Link, HStack, Container, Badge, Flex, Image, Collapse, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useMemo } from 'react'
import { experience, news, publications, institutionLogos } from '../data'
import { siteConfig } from '@/site.config'
import DynamicIcon from './DynamicIcon'

// Import sub-components
import HeroSection from './about/HeroSection'
import Footer from './about/Footer'
import NewsTimeline from './about/NewsTimeline'


const universityLogos = institutionLogos


// Publication card component with its own state
const PubLink = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
  <Link href={href} isExternal _hover={{ textDecoration: 'none' }}>
    <HStack
      spacing={1.5}
      px={2.5}
      py={1}
      borderRadius="sm"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize="xs"
      fontFamily="mono"
      transition="all 0.15s"
      _hover={{ borderColor: 'cyan.400', color: 'cyan.400', bg: useColorModeValue('gray.50', 'whiteAlpha.50') }}
    >
      <DynamicIcon name={icon} boxSize={3} />
      <Text>{label}</Text>
    </HStack>
  </Link>
);

const PublicationCard = ({ pub }: { pub: any }) => {
  const { isOpen: isAbstractOpen, onToggle: onToggleAbstract } = useDisclosure();
  const { isOpen: isImageOpen, onOpen: onImageOpen, onClose: onImageClose } = useDisclosure();
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={[4, 5, 6]}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="md"
      border="1px solid"
      borderColor={borderColor}
      transition="all 0.2s"
      _hover={{ borderColor: useColorModeValue('cyan.300', 'cyan.600') }}
    >
      <Flex
        direction={["column", "column", "row"]}
        gap={[4, 4, 6]}
        align="stretch"
      >
        {/* Featured Image */}
        {pub.featuredImage && (
          <Box
            flexShrink={0}
            w={["full", "full", "160px"]}
            minH={["140px", "140px", "auto"]}
            role="button"
            tabIndex={0}
            onClick={onImageOpen}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onImageOpen()
              }
            }}
            cursor="zoom-in"
            overflow="hidden"
            borderRadius="sm"
          >
            <Image
              src={pub.featuredImage}
              alt={pub.title}
              w="full"
              h="full"
              objectFit="contain"
              bg={useColorModeValue('gray.50', 'gray.900')}
              p={1}
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.03)' }}
            />
          </Box>
        )}

        {/* Publication Details */}
        <VStack align="start" spacing={2.5} flex={1} justify="center">
          {/* Venue line */}
          {/* Venue */}
          <HStack spacing={2} flexWrap="wrap" align="center">
            <Box h="2px" w="16px" bg="cyan.400" borderRadius="full" />
            <Text fontSize="xs" fontFamily="mono" color="cyan.400" fontWeight="semibold" letterSpacing="wide" textTransform="uppercase">
              {pub.venue && String(pub.year) && pub.venue.includes(String(pub.year))
                ? pub.venue
                : `${pub.venue} ${pub.year}`}
            </Text>
            {pub.venueType && (
              <Text fontSize="2xs" color={useColorModeValue('gray.400', 'gray.500')} fontFamily="mono">
                / {pub.venueType}
              </Text>
            )}
          </HStack>

          {/* Title */}
          <Heading size="sm" lineHeight="tall" fontWeight="semibold" color={useColorModeValue('gray.800', 'gray.100')}>
            {pub.title}
          </Heading>

          {/* Authors */}
          <VStack align="start" spacing={1.5} w="full">
            <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')} lineHeight="base" noOfLines={2}>
              {pub.authors.map((author: string, idx: number) => {
                const isSelf = (siteConfig.name.authorVariants as string[]).some(v => author.includes(v) || v.includes(author))
                const isCoFirst = pub.isCoFirst && pub.coFirstAuthors?.includes(author)
                return (
                  <Text
                    as="span"
                    key={idx}
                    fontWeight={isSelf ? 'bold' : 'normal'}
                    color={isSelf ? useColorModeValue('gray.800', 'gray.100') : undefined}
                  >
                    {author}
                    {isCoFirst && <Text as="sup" fontSize="2xs" color="cyan.400">*</Text>}
                    {idx < pub.authors.length - 1 && ', '}
                  </Text>
                )
              })}
            </Text>
            {pub.isCoFirst && (
              <Text fontSize="2xs" color={useColorModeValue('gray.400', 'gray.500')} fontStyle="italic">
                * equal contribution
              </Text>
            )}
          </VStack>

          {/* Divider */}
          <Box w="full" h="1px" bg={useColorModeValue('gray.100', 'gray.700')} />

          {/* Links */}
          <HStack spacing={1.5} flexWrap="wrap">
            {pub.abstract && (
              <HStack
                as="button"
                spacing={1.5}
                px={2.5}
                py={1}
                borderRadius="sm"
                border="1px solid"
                borderColor={isAbstractOpen ? useColorModeValue('cyan.300', 'cyan.600') : borderColor}
                color={isAbstractOpen ? 'cyan.400' : useColorModeValue('gray.600', 'gray.400')}
                fontSize="xs"
                fontFamily="mono"
                transition="all 0.15s"
                _hover={{ borderColor: 'cyan.400', color: 'cyan.400' }}
                onClick={onToggleAbstract}
              >
                <DynamicIcon name="FaChevronRight" boxSize={2.5} style={{ transform: isAbstractOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }} />
                <Text>TL;DR</Text>
              </HStack>
            )}
            {pub.links.projectPage && <PubLink href={pub.links.projectPage} icon="FaGlobe" label="Project" />}
            {pub.links.arxiv && <PubLink href={pub.links.arxiv} icon="SiArxiv" label="arXiv" />}
            {pub.links.paper && <PubLink href={pub.links.paper} icon="FaFileAlt" label="Paper" />}
            {pub.links.demo && <PubLink href={pub.links.demo} icon="FaPlay" label="Video" />}
            {pub.links.code && <PubLink href={pub.links.code} icon="FaGithub" label="Code" />}
            {pub.links.dataset && <PubLink href={pub.links.dataset} icon="FaDatabase" label="Dataset" />}
          </HStack>
        </VStack>
      </Flex>

      {/* Abstract - full width below */}
      {pub.abstract && (
        <Collapse in={isAbstractOpen} animateOpacity>
          <Box
            mt={4}
            p={4}
            bg={useColorModeValue('gray.50', 'gray.900')}
            borderRadius="md"
            borderLeft="2px solid"
            borderLeftColor="cyan.400"
          >
            <Text fontSize={["xs", "sm"]} lineHeight="tall" color={useColorModeValue('gray.600', 'gray.400')}>
              {pub.abstract}
            </Text>
            {pub.keywords && (
              <HStack mt={3} spacing={1.5} flexWrap="wrap">
                {pub.keywords.map((keyword: string) => (
                  <Text
                    key={keyword}
                    fontSize="2xs"
                    fontFamily="mono"
                    color={useColorModeValue('gray.500', 'gray.500')}
                    px={1.5}
                    py={0.5}
                    bg={useColorModeValue('gray.100', 'gray.800')}
                    borderRadius="sm"
                  >
                    {keyword}
                  </Text>
                ))}
              </HStack>
            )}
          </Box>
        </Collapse>
      )}

      <Modal isOpen={isImageOpen} onClose={onImageClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton color={useColorModeValue('gray.700', 'gray.200')} />
          <ModalBody p={0} display="flex" alignItems="center" justifyContent="center">
            <Image
              src={pub.featuredImage}
              alt={`${pub.title} large preview`}
              maxH="80vh"
              maxW="90vw"
              objectFit="contain"
              borderRadius="lg"
              bg={useColorModeValue('white', 'gray.900')}
              p={4}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default function About() {
  // Sort news items by date (newest first)
  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => {
      if (!a.sortDate && !b.sortDate) return 0;
      if (!a.sortDate) return 1;
      if (!b.sortDate) return -1;
      return b.sortDate.localeCompare(a.sortDate);
    });
  }, [news]);

  const selectedPublications = useMemo(() => {
    const orderedIds = siteConfig.selectedPublicationIds as string[]
    const pubMap = new Map(publications.map(p => [p.id, p]))
    return orderedIds.map(id => pubMap.get(id)).filter(Boolean) as typeof publications
  }, []);

  return (
    <Box w="full">
      <VStack spacing={0} align="stretch" w="full">
        <HeroSection
          title={siteConfig.title}
          avatar={siteConfig.avatar}
        />
        
        <Box w="full" py={[2, 2, 3]}>
          <Container maxW={["full", "full", "7xl"]} px={[2, 4, 8]}>
            <VStack spacing={[2, 3, 4]} align="stretch">
              {/* News Section */}
              <Box w="full">
                <Flex align="center" gap={3} mb={4}>
                  <Box h="2px" w="20px" bg="cyan.400" borderRadius="full" flexShrink={0} />
                  <Heading size="md" fontWeight="semibold">Recent Updates</Heading>
                  <Badge colorScheme="green" variant="subtle" fontSize="2xs" fontFamily="mono">News</Badge>
                  <Box flex="1" h="1px" bg={useColorModeValue('gray.200', 'gray.700')} />
                </Flex>

                <NewsTimeline news={sortedNews} showHeader={false} />
              </Box>

              {/* Main Content Sections */}
              <VStack spacing={[6, 8, 10]} align="stretch" mt={[4, 6, 8]}>
                {/* Publications Section */}
                <Box w="full">
                  <Flex align="center" gap={3} mb={[3, 4]}>
                    <Box h="2px" w="20px" bg="cyan.400" borderRadius="full" flexShrink={0} />
                    <Heading size="md" fontWeight="semibold">Publications</Heading>
                    <Box flex="1" h="1px" bg={useColorModeValue('gray.200', 'gray.700')} />
                  </Flex>
                  
                  <VStack spacing={[4, 5, 6]} align="stretch">
                    {selectedPublications.map((pub) => (
                      <PublicationCard key={pub.id} pub={pub} />
                    ))}
                    
                  </VStack>
                </Box>

                {/* Education Section */}
                <Box w="full">
                  <VStack spacing={[4, 5, 6]} align="start" w="full">
                    <Flex align="center" gap={3} w="full">
                      <Box h="2px" w="20px" bg="cyan.400" borderRadius="full" flexShrink={0} />
                      <Heading size={["sm", "md"]} fontWeight="semibold">Education</Heading>
                      <Box flex="1" h="1px" bg={useColorModeValue('gray.200', 'gray.700')} />
                    </Flex>

                    <Box w="full" position="relative">
                      {/* Vertical line */}
                      <Box
                        position="absolute"
                        left="7px"
                        top="12px"
                        bottom="12px"
                        w="1px"
                        bg={useColorModeValue('gray.200', 'gray.700')}
                      />
                      <VStack spacing={0} align="stretch">
                        {experience.education.courses.map((item: any, index: number) => {
                          const logo = universityLogos[item.institution]
                          return (
                            <Flex key={index} gap={[3, 4]} align="start" py={3} position="relative">
                              {/* Dot */}
                              <Box flexShrink={0} mt="6px">
                                <Box
                                  w="14px"
                                  h="14px"
                                  borderRadius="full"
                                  border="2px solid"
                                  borderColor={index === 0 ? 'cyan.400' : useColorModeValue('gray.300', 'gray.600')}
                                  bg={index === 0 ? 'cyan.400' : useColorModeValue('white', 'gray.800')}
                                />
                              </Box>
                              {/* Logo */}
                              <Box flexShrink={0} w={["50px", "65px"]} display="flex" alignItems="center" justifyContent="center">
                                {logo ? (
                                  <Image src={logo} alt={item.institution} h={item.logoHeight ?? "60px"} w="full" objectFit="contain" objectPosition="center" />
                                ) : (
                                  <Box w="50px" h="50px" borderRadius="md" bg={useColorModeValue('gray.100', 'gray.700')} display="flex" alignItems="center" justifyContent="center">
                                    <Text fontSize="lg" fontWeight="bold" color="cyan.400">{item.institution.charAt(0)}</Text>
                                  </Box>
                                )}
                              </Box>
                              {/* Content */}
                              <Box flex={1} pb={2}>
                                <Text fontSize="2xs" fontFamily="mono" color="cyan.400" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide" mb={0.5}>
                                  {item.year}
                                </Text>
                                <Text fontSize="sm" fontWeight="semibold" color={useColorModeValue('gray.800', 'gray.100')} mb={0.5}>
                                  {item.institution}
                                </Text>
                                <Text fontSize="xs" color={useColorModeValue('gray.600', 'gray.300')} mb={1}>
                                  {item.course}
                                </Text>
                                {item.details && (
                                  <VStack align="start" spacing={0.5}>
                                    {item.details.map((detail: string, i: number) => (
                                      <Text key={i} fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')} lineHeight="tall">
                                        · {detail}
                                      </Text>
                                    ))}
                                  </VStack>
                                )}
                              </Box>
                            </Flex>
                          )
                        })}
                      </VStack>
                    </Box>
                  </VStack>
                </Box>

                {/* Miscellanea Section */}
                <Box w="full">
                  <Flex align="center" gap={3} mb={[3, 4]}>
                    <Box h="2px" w="20px" bg="cyan.400" borderRadius="full" flexShrink={0} />
                    <Heading size={["sm", "md"]} fontWeight="semibold">Miscellanea</Heading>
                    <Box flex="1" h="1px" bg={useColorModeValue('gray.200', 'gray.700')} />
                  </Flex>
                  <VStack align="start" spacing={2}>
                    {[
                      <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} lineHeight="tall">I love traveling 🏞️ and photographing 📸. Check out some of them <Link href="/photo" color="cyan.600" _hover={{ color: 'cyan.400' }}>here</Link>.</Text>,
                      <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} lineHeight="tall">I like playing video games 🎮, especially roguelike ones such as Balatro and Slay the Spire.</Text>,
                      <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} lineHeight="tall">I enjoy doing sports, especially snowboarding 🏂, swimming 🏊, playing badminton 🏸.</Text>,
                      <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} lineHeight="tall">I can read tarot cards 🔮, and I believe in the conservation of luck ✨.</Text>,
                    ].map((item, i) => (
                      <HStack key={i} align="start" spacing={2}>
                        <Text fontSize="2xl" color="cyan.400" lineHeight="1" flexShrink={0}>·</Text>
                        {item}
                      </HStack>
                    ))}
                  </VStack>
                </Box>

              </VStack>
            </VStack>
          </Container>
        </Box>

        <Footer />
      </VStack>
    </Box>
  )
} 
