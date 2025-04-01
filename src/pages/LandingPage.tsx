import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    SimpleGrid,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Text,
    useBreakpointValue,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"

const Navbar = () => {
    const isMobile = useBreakpointValue({ base: true, md: false })

    return (
        <Box
            as="nav"
            py={4}
            px={4}
            borderBottom="1px"
            borderColor="gray.200"
            position="sticky"
            top={0}
            bg="white"
            zIndex={10}
        >
            <Container maxW="container.xl">
                <Flex justify="space-between" align="center">
                    <Heading size="md" color="primary">
                        <Image src="./logo.jpg" width={"80px"} borderRadius={"inherit"} />
                    </Heading>

                    {isMobile ? (
                        <Menu>
                            <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
                            <MenuList>
                                <MenuItem as={Link} href="#">
                                    Home
                                </MenuItem>
                                <MenuItem as={Link} href="#">
                                    About
                                </MenuItem>
                                <MenuItem as={Link} href="#">
                                    Contact
                                </MenuItem>
                                <MenuItem as={Link} href="/login">
                                    Login
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <HStack spacing={{ md: 4, lg: 8 }}>
                            <Link href="#" fontWeight="medium">
                                Home
                            </Link>
                            <Link href="#" fontWeight="medium">
                                About
                            </Link>
                            <Link href="#" fontWeight="medium">
                                Contact
                            </Link>
                            <Link href="/login" fontWeight="medium">
                                Login
                            </Link>
                        </HStack>
                    )}
                </Flex>
            </Container>
        </Box>
    )
}

const Hero = () => {
    return (
        <Box bg={useColorModeValue("gray.50", "gray.900")} py={{ base: 10, md: 16 }}>
            <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }} alignItems="center">
                    <VStack spacing={{ base: 4, md: 6 }} align="flex-start">
                        <Heading
                            as="h1"
                            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
                            fontWeight="bold"
                            color="primary"
                            lineHeight="shorter"
                        >
                            Dedicated to Cancer Care & Support
                        </Heading>
                        <Text fontSize={{ base: "md", md: "lg" }} color={useColorModeValue("gray.600", "gray.400")}>
                            We provide comprehensive care and support for cancer patients and their families. Our team of specialists
                            is committed to delivering personalized treatment plans.
                        </Text>
                        <Button
                            size={{ base: "md", md: "lg" }}
                            bg="primary"
                            color="white"
                            rounded="md"
                            px={{ base: 6, md: 8 }}
                            _hover={{ bg: "primary.600" }}
                        >
                            Learn More
                        </Button>
                    </VStack>
                    <Box>
                        <Image
                            src="/cancer.jpg"
                            alt="Cancer care"
                            borderRadius="lg"
                            shadow="lg"
                            w="full"
                            h="auto"
                        />
                    </Box>
                </SimpleGrid>
            </Container>
        </Box>
    )
}

const Statistics = () => {
    return (
        <Box py={{ base: 10, md: 16 }}>
            <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                <VStack spacing={{ base: 8, md: 12 }}>
                    <Heading textAlign="center" color="primary" fontSize={{ base: "2xl", md: "3xl" }}>
                        Our Impact
                    </Heading>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 5, md: 10 }} width="full">
                        <Stat
                            bg={useColorModeValue("white", "gray.800")}
                            p={{ base: 4, md: 6 }}
                            rounded="lg"
                            shadow="md"
                            borderTop="4px"
                            borderColor="primary"
                            textAlign="center"
                        >
                            <StatLabel fontSize={{ base: "md", md: "lg" }}>Patients Treated</StatLabel>
                            <StatNumber fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" color="primary">
                                15,000+
                            </StatNumber>
                            <Text mt={2}>Since our founding</Text>
                        </Stat>
                        <Stat
                            bg={useColorModeValue("white", "gray.800")}
                            p={{ base: 4, md: 6 }}
                            rounded="lg"
                            shadow="md"
                            borderTop="4px"
                            borderColor="primary"
                            textAlign="center"
                        >
                            <StatLabel fontSize={{ base: "md", md: "lg" }}>Success Rate</StatLabel>
                            <StatNumber fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" color="primary">
                                85%
                            </StatNumber>
                            <Text mt={2}>For early detection cases</Text>
                        </Stat>
                        <Stat
                            bg={useColorModeValue("white", "gray.800")}
                            p={{ base: 4, md: 6 }}
                            rounded="lg"
                            shadow="md"
                            borderTop="4px"
                            borderColor="primary"
                            textAlign="center"
                            gridColumn={{ base: "1 / -1", sm: "auto" }}
                            mx={{ base: "auto", sm: 0 }}
                            maxW={{ base: "sm", sm: "full" }}
                        >
                            <StatLabel fontSize={{ base: "md", md: "lg" }}>Specialist Doctors</StatLabel>
                            <StatNumber fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" color="primary">
                                50+
                            </StatNumber>
                            <Text mt={2}>Dedicated oncologists</Text>
                        </Stat>
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    )
}

const BreastCancerSection = () => {
    return (
        <Box bg={useColorModeValue("primary.50", "gray.800")} py={{ base: 10, md: 16 }}>
            <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }} alignItems="center">
                    <Box order={{ base: 2, md: 1 }}>
                        <Image
                            src="/support.jpg"
                            alt="Breast cancer awareness"
                            borderRadius="lg"
                            shadow="lg"
                            w="full"
                            h="auto"
                        />
                    </Box>
                    <VStack spacing={{ base: 4, md: 6 }} align="flex-start" order={{ base: 1, md: 2 }}>
                        <Heading as="h2" fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} fontWeight="bold" color="primary">
                            Breast Cancer Awareness & Treatment
                        </Heading>
                        <Text fontSize={{ base: "md", md: "lg" }} color={useColorModeValue("gray.600", "gray.400")}>
                            Early detection is key in the fight against breast cancer. Our specialized team provides comprehensive
                            screening, diagnosis, and treatment options tailored to each patient's unique needs.
                        </Text>
                        <StatGroup width="full" flexDirection={{ base: "column", sm: "row" }} gap={{ base: 4, sm: 0 }}>
                            <Stat>
                                <StatLabel>Screenings</StatLabel>
                                <StatNumber color="primary">5,000+</StatNumber>
                                <Text fontSize="sm">Annual screenings</Text>
                            </Stat>
                            <Stat>
                                <StatLabel>Recovery</StatLabel>
                                <StatNumber color="primary">92%</StatNumber>
                                <Text fontSize="sm">Early stage recovery</Text>
                            </Stat>
                        </StatGroup>
                        <Button
                            as={"a"}
                            href="/login"
                            size={{ base: "md", md: "lg" }}
                            bg="primary"
                            color="white"
                            rounded="md"
                            px={{ base: 6, md: 8 }}
                            _hover={{ bg: "primary.600" }}
                        >
                            Schedule Screening
                        </Button>
                    </VStack>
                </SimpleGrid>
            </Container>
        </Box>
    )
}

const Footer = () => {
    return (
        <Box bg={useColorModeValue("gray.100", "gray.900")} py={{ base: 8, md: 10 }}>
            <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 4 }}
                    spacing={{ base: 8, md: 8 }}
                    templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
                >
                    <VStack align="flex-start" mb={{ base: 6, sm: 0 }}>
                        <Heading size="md" color="primary" mb={4}>
                            HerHealth
                        </Heading>
                        <Text>Providing quality healthcare services since 1995.</Text>
                    </VStack>
                    <VStack align="flex-start">
                        <Heading size="sm" mb={4}>
                            Services
                        </Heading>
                        <Link>Cancer Screening</Link>
                        <Link>Treatment Options</Link>
                        <Link>Support Groups</Link>
                        <Link>Research</Link>
                    </VStack>
                    <VStack align="flex-start">
                        <Heading size="sm" mb={4}>
                            Resources
                        </Heading>
                        <Link>Patient Portal</Link>
                        <Link>Education</Link>
                        <Link>FAQ</Link>
                        <Link>Insurance</Link>
                    </VStack>
                    <VStack align="flex-start">
                        <Heading size="sm" mb={4}>
                            Contact
                        </Heading>
                        <Text>123 Medical Center Dr.</Text>
                        <Text>Healthville, HV 12345</Text>
                        <Text>contact@healthcare.com</Text>
                        <Text>(555) 123-4567</Text>
                    </VStack>
                </SimpleGrid>
                <Text mt={{ base: 8, md: 12 }} textAlign="center">
                    © {new Date().getFullYear()} HealthCare. All rights reserved.
                </Text>
            </Container>
        </Box>
    )
}

export default function LandingPage() {
    return (
        <Box>
            <Navbar />
            <Hero />
            <Statistics />
            <BreastCancerSection />
            <Footer />
        </Box>
    )
}

