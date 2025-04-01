"use client"

import type React from "react"
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
  Text,
  Box,
  Flex,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react"
import { CheckCircleIcon, InfoIcon } from "@chakra-ui/icons"
import { OnboardingLayout } from "./Layout"

export default function InsuranceSelection() {
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState(false)
  const toast = useToast()

  const API_URL = `${import.meta.env.VITE_API_URL}/api/onboarding/insurance`
  const accessToken = localStorage.getItem("accessToken")

  // Calculate progress based on selection
  const progress = selectedPlan ? 100 : 0

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value)
    setTouched(true)
  }

  const handleBack = () => {
    window.location.assign("/health-profile")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedPlan) {
      setTouched(true)
      toast({
        title: "Please select a plan",
        description: "You must select an insurance plan to continue",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ insurance_type: selectedPlan }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error.message || "Something went wrong")
      }

      toast({
        title: "Profile Updated!",
        description: "Your Insurance plan has been updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })

      setTimeout(() => {
        window.location.assign("/location")
      }, 3000)
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const cardBg = useColorModeValue("white", "gray.700")
  const cardBorderColor = useColorModeValue("gray.200", "gray.600")
  const selectedBorderColor = "primary"

  return (
    <OnboardingLayout
      title="Insurance Plans"
      subtitle="Choose an insurance plan that fits your needs"
      progress={progress}
      loading={loading}
      isNextDisabled={!selectedPlan}
      onBack={handleBack}
      onNext={handleSubmit}
      nextButtonText="Continue to Location"
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
                borderColor={selectedPlan === "12-months" ? selectedBorderColor : cardBorderColor}
                bg={cardBg}
                p={4}
                transition="all 0.2s"
                _hover={{ borderColor: "primary.400", shadow: "sm" }}
                position="relative"
                overflow="hidden"
              >
                <Flex alignItems="flex-start">
                  <Radio value="12-months" size="lg" colorScheme="primary" mr={3} mt={1} />
                  <Box flex="1">
                    <Flex justifyContent="space-between" alignItems="center" mb={2}>
                      <Text fontWeight="bold" fontSize="lg">
                        12 Month Plan
                      </Text>
                      <Text fontWeight="bold" color="primary">
                        $20
                      </Text>
                    </Flex>
                    <Text color="gray.600" mb={2}>
                      3 consultations per year
                    </Text>
                    <Badge colorScheme="green" rounded="full" px={2}>
                      Basic Coverage
                    </Badge>
                  </Box>
                </Flex>
                {selectedPlan === "12-months" && (
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
                  <Radio value="24-months" size="lg" colorScheme="primary" mr={3} mt={1} />
                  <Box flex="1">
                    <Flex justifyContent="space-between" alignItems="center" mb={2}>
                      <Text fontWeight="bold" fontSize="lg">
                        24 Month Plan
                      </Text>
                      <Text fontWeight="bold" color="primary">
                        $50
                      </Text>
                    </Flex>
                    <Text color="gray.600" mb={2}>
                      3 consultations per year + medication
                    </Text>
                    <Badge colorScheme="purple" rounded="full" px={2}>
                      Premium Coverage
                    </Badge>
                  </Box>
                </Flex>
                {selectedPlan === "24-months" && (
                  <Box position="absolute" top={2} right={2} color="primary">
                    <CheckCircleIcon />
                  </Box>
                )}
              </Box>
            </Stack>
          </RadioGroup>
          <FormErrorMessage>
            <Icon as={InfoIcon} mr={1} />
            Please select an insurance plan
          </FormErrorMessage>
        </FormControl>
      </VStack>
    </OnboardingLayout>
  )
}

