"use client"

import { useState } from "react"
import {
    VStack,
    FormControl,
    RadioGroup,
    Radio,
    Stack,
    useToast,
    FormErrorMessage,
    Icon,
    Box,
    Flex,
    Badge,
    useColorModeValue,
} from "@chakra-ui/react"
import { OnboardingLayout } from "./Layout"
import { CustomText } from "../../components/common/common"
import { CheckCircleIcon, InfoIcon } from "@chakra-ui/icons"
import { BiLogoMastercard, BiLogoVisa } from "react-icons/bi"

export default function InsuranceSelection() {
    const [selectedPlan, setSelectedPlan] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [touched, setTouched] = useState(false)
    const toast = useToast()

    // Calculate progress based on selection
    const progress = selectedPlan ? 100 : 0

    const handlePlanChange = (value: string) => {
        setSelectedPlan(value)
        setTouched(true)
    }

    const handleBack = () => {
        window.location.assign("/insurance")
    }

    const handleSubmit = () => {
        if (!selectedPlan) {
            setTouched(true)
            toast({
                title: "Please select a payment plan",
                description: "You must select a payment plan to continue",
                status: "warning",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        toast({
            title: "Onboarding complete!",
            description: "You will be redirected to your dashboard",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        setTimeout(() => {
            window.location.assign('/dashboard')
        }, 3000)
    }

    const cardBg = useColorModeValue("white", "gray.700")
    const cardBorderColor = useColorModeValue("gray.200", "gray.600")
    const selectedBorderColor = "primary";

    return (
        <OnboardingLayout
            title="Choose a payment method"
            subtitle="You will not be charged until you review this order on your dashboard"
            progress={progress}
            loading={loading}
            isNextDisabled={!selectedPlan}
            onBack={handleBack}
            onNext={handleSubmit}
            nextButtonText="Continue to Dashboard"
            isBackDisabled={false}
        >
            <VStack spacing={6} align="stretch" mb={8}>
                <FormControl isRequired isInvalid={touched && !selectedPlan}>
                    <RadioGroup onChange={handlePlanChange} value={selectedPlan}>
                        <Stack direction="column" spacing={4}>
                            <Box
                                as="label"
                                cursor="pointer"
                                borderWidth="1px"
                                borderRadius="md"
                                borderColor={selectedPlan === "debit-card" ? selectedBorderColor : cardBorderColor}
                                bg={cardBg}
                                p={4}
                                transition="all 0.2s"
                                _hover={{ borderColor: "primary.400", shadow: "sm" }}
                                position="relative"
                                overflow="hidden"
                            >
                                <Flex alignItems="flex-start">
                                    <Radio value="debit-card" size="lg" colorScheme="primary" mr={3} mt={1} />
                                    <Box flex="1">
                                        <Stack direction="row" align="center">
                                            <CustomText fontSize="md">Debit Card</CustomText>
                                            <Icon color={"primary"} as={BiLogoMastercard} boxSize={8} />
                                            <Icon color={"primary"} as={BiLogoVisa} boxSize={8} />
                                        </Stack>
                                        <Badge colorScheme="green" rounded="full" px={2}>
                                            Fast Delivery
                                        </Badge>
                                    </Box>
                                </Flex>
                                {selectedPlan === "debit-card" && (
                                    <Box position="absolute" top={2} right={2} color="primary">
                                        <CheckCircleIcon />
                                    </Box>
                                )}
                            </Box>

                            <Box
                                as="label"
                                cursor="pointer"
                                borderWidth="1px"
                                borderRadius="md"
                                borderColor={selectedPlan === "24-months" ? selectedBorderColor : cardBorderColor}
                                bg={cardBg}
                                p={4}
                                transition="all 0.2s"
                                _hover={{ borderColor: "primary.400", shadow: "sm" }}
                                position="relative"
                                overflow="hidden"
                            >
                                <Flex alignItems="flex-start">
                                    <Radio value="momo" size="lg" colorScheme="primary" mr={3} mt={1} />
                                    <Box flex="1">
                                        <Stack direction="row" align="center">
                                            <CustomText fontSize="md">Pay with MOMO</CustomText>
                                        </Stack>
                                        <Badge colorScheme="green" rounded="full" px={2}>
                                            Fast Delivery
                                        </Badge>
                                    </Box>
                                </Flex>
                                {selectedPlan === "momo" && (
                                    <Box position="absolute" top={2} right={2} color="primary">
                                        <CheckCircleIcon />
                                    </Box>
                                )}
                            </Box>
                        </Stack>
                    </RadioGroup>
                    <FormErrorMessage>
                        <Icon as={InfoIcon} mr={1} />
                        Please select a payment plan
                    </FormErrorMessage>
                </FormControl>
            </VStack>
        </OnboardingLayout>
    )
}

