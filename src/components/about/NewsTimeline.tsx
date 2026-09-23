import React, { useState } from 'react'
import { Box, Collapse, Flex, HStack, Link, Text, useColorMode, usePrefersReducedMotion } from '@chakra-ui/react'
import DynamicIcon from '../DynamicIcon'
import { NewsItem } from '../../types'
import { highlightData } from '../../utils/highlightData'
import { terminalPalette } from '@/config/theme'

interface NewsTimelineProps {
  news: NewsItem[]
}

const MONTHS: Record<string, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
}

const toYearMonth = (part: string): string | null => {
  const [month, year] = part.trim().split(/\s+/)
  return MONTHS[month] && year ? `${year}-${MONTHS[month]}` : null
}

/** "Feb 2026" → "2026-02"; "Jun 2026 – Sep 2026" → "2026-06→09" */
const formatDate = (dateString: string = ''): string => {
  if (!dateString) return ''

  const [start, end, ...extra] = dateString.split(/\s*[–—-]\s*|\s+to\s+/i)
  if (end && extra.length === 0) {
    const from = toYearMonth(start)
    const to = toYearMonth(end)
    if (from && to) {
      const [fromYear] = from.split('-')
      const [toYear, toMonth] = to.split('-')
      return fromYear === toYear ? `${from}→${toMonth}` : `${from}→${to}`
    }
  }

  return toYearMonth(dateString) ?? dateString
}

/** Each news type gets one accent color (a terminal palette key) and one icon. */
type PaletteKey = 'command' | 'warning' | 'param' | 'prompt' | 'highlight'

const TYPE_ACCENTS: Record<string, { color: PaletteKey; icon: string }> = {
  publication: { color: 'command', icon: 'FaFileAlt' },
  talk: { color: 'warning', icon: 'FaChalkboardTeacher' },
  course: { color: 'param', icon: 'FaGraduationCap' },
  release: { color: 'prompt', icon: 'FaRocket' },
  internship: { color: 'highlight', icon: 'FaBriefcase' },
}

const DEFAULT_ACCENT = { color: 'prompt', icon: 'FaCode' } as const

const NewsTimeline: React.FC<NewsTimelineProps> = ({ news }) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const reduceMotion = usePrefersReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const tc = terminalPalette.colors(isDark)
  const rowHoverBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
  const panelBg = isDark ? 'rgba(76,86,106,0.14)' : 'rgba(203,213,225,0.18)'

  const toggle = (index: number) => setOpenIndex(prev => (prev === index ? null : index))

  return (
    <Box
      w="full"
      overflow="hidden"
      borderRadius="md"
      fontFamily="mono"
      bg={tc.bg}
      boxShadow={`0 0 0 1px ${tc.border}, 0 2px 8px ${isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}`}
    >
      {/* Title bar — static, just enough terminal to place the card */}
      <Flex
        align="center"
        gap={2}
        px={[2, 3]}
        py={[1, 1.5]}
        bg={tc.header}
        borderBottom={`1px solid ${tc.border}`}
        fontSize={['3xs', '2xs']}
      >
        <HStack spacing={1.5} mr={1} flexShrink={0}>
          <Box w="9px" h="9px" borderRadius="full" bg={terminalPalette.rainbow[0]} />
          <Box w="9px" h="9px" borderRadius="full" bg={terminalPalette.rainbow[2]} />
          <Box w="9px" h="9px" borderRadius="full" bg={terminalPalette.rainbow[3]} />
        </HStack>
        <Text color={tc.secondary} isTruncated>~/news.log</Text>
        <Box flex="1" />
        <Text color={tc.secondary} flexShrink={0}>{news.length} entries</Text>
      </Flex>

      {news.length === 0 ? (
        <Text px={[2, 3]} py={[2, 3]} fontSize={['2xs', 'xs']} color={tc.secondary}>
          no entries yet
        </Text>
      ) : (
        news.map((item, index) => {
          const accent = TYPE_ACCENTS[item.type?.toLowerCase()] ?? DEFAULT_ACCENT
          const accentColor = tc[accent.color]
          const label = item.badge || item.type
          const isOpen = openIndex === index

          return (
            <Box key={`${item.sortDate ?? item.date}-${index}`} borderTop={index === 0 ? 'none' : `1px dotted ${tc.border}`}>
              <Flex
                as="button"
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(index)}
                w="full"
                align="center"
                textAlign="left"
                gap={[2, 3]}
                px={[2, 3]}
                py={[1.5, 2]}
                appearance="none"
                border="none"
                borderRadius="0"
                borderLeft="2px solid"
                borderLeftColor={accentColor}
                bg={isOpen ? rowHoverBg : 'transparent'}
                transition="background-color 0.15s ease"
                _hover={{ bg: rowHoverBg }}
                _focusVisible={{ outline: '2px solid', outlineColor: accentColor, outlineOffset: '-2px' }}
              >
                <Text as="span" flexShrink={0} w={['58px', '68px', '76px']} color={tc.secondary} fontSize={['3xs', '2xs', 'xs']}>
                  {formatDate(item.date)}
                </Text>
                <Text
                  as="span"
                  flexShrink={0}
                  w={['80px', '92px']}
                  display={['none', 'block']}
                  color={accentColor}
                  fontSize={['3xs', '2xs']}
                  fontWeight="bold"
                  letterSpacing="0.06em"
                  textTransform="uppercase"
                  isTruncated
                >
                  {label}
                </Text>
                <Text as="span" flex="1" minW={0} color={tc.text} fontSize={['2xs', 'xs', 'sm']} fontWeight="medium" noOfLines={[2, 1]}>
                  {item.title}
                </Text>
                <Text as="span" flexShrink={0} w="14px" textAlign="center" color={isOpen ? tc.secondary : accentColor} fontSize={['2xs', 'xs']}>
                  {isOpen ? '−' : '+'}
                </Text>
              </Flex>

              <Collapse
                in={isOpen}
                animateOpacity={!reduceMotion}
                transition={reduceMotion ? { enter: { duration: 0 }, exit: { duration: 0 } } : undefined}
              >
                <Box
                  borderLeft="2px solid"
                  borderLeftColor={accentColor}
                  bg={panelBg}
                  pl={[2, 3]}
                  pr={[2, 3]}
                  pt={[1, 1.5]}
                  pb={[2, 2.5]}
                >
                  <Flex align="center" gap={1.5} mb={1.5} display={['flex', 'none']}>
                    <DynamicIcon name={item.icon || accent.icon} boxSize={2.5} color={accentColor} />
                    <Text color={accentColor} fontSize="3xs" fontWeight="bold" textTransform="uppercase" letterSpacing="0.06em">
                      {label}
                    </Text>
                  </Flex>

                  {item.description && (
                    <Text fontSize={['2xs', 'xs']} color={tc.secondary} lineHeight="1.7" whiteSpace="pre-line">
                      {highlightData(item.description, { num: tc.highlight, kw: tc.command, str: tc.success })}
                    </Text>
                  )}

                  {item.links.length > 0 && (
                    <Flex wrap="wrap" gap={[2, 3]} mt={[1.5, 2]}>
                      {item.links.map((link, i) => (
                        <Link
                          key={i}
                          href={link.url}
                          isExternal
                          display="inline-flex"
                          alignItems="center"
                          gap={1}
                          color={tc.command}
                          fontSize={['3xs', '2xs']}
                          textUnderlineOffset="3px"
                          _hover={{ color: accentColor, textDecoration: 'underline' }}
                        >
                          <DynamicIcon name={link.icon || 'FaExternalLinkAlt'} boxSize={2.5} />
                          {link.text}
                        </Link>
                      ))}
                    </Flex>
                  )}
                </Box>
              </Collapse>
            </Box>
          )
        })
      )}
    </Box>
  )
}

export default NewsTimeline
