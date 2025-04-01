"use client"

import type React from "react"
import {
  Box,
  Flex,
  Progress,
  Text,
  Heading,
  useColorModeValue,
  Divider,
  HStack,
  ScaleFade,
  Button,
} from "@chakra-ui/react"
import { LoadingOverlay } from "./LoadingOverlay"
import { CustomText } from "../../components/common/common"

interface OnboardingLayoutProps {
  title: string
  subtitle: string
  progress: number
  loading: boolean
  isNextDisabled: boolean
  onBack?: () => void
  onNext: (e: React.FormEvent) => void
  backButtonText?: string
  nextButtonText?: string
  isBackDisabled?: boolean
  children: React.ReactNode
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  title,
  subtitle,
  progress,
  loading,
  isNextDisabled,
  onBack,
  onNext,
  backButtonText = "Back",
  nextButtonText = "Next",
  isBackDisabled = false,
  children,
}) => {
  const bgColor = useColorModeValue("white", "gray.800")
//   const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <ScaleFade in={true} initialScale={0.9}>
      <Box
        w={{ base: "full", md: "700px" }}
        h={{ base: "auto", md: "auto" }}
        minH={{ base: "660px", md: "600px" }}
        mx="auto"
        p={{ base: 4, md: 8 }}
        boxShadow="lg"
        borderRadius="xl"
        bg={bgColor}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        position="relative"
        borderTop="4px solid"
        borderColor="primary"
      >
        <LoadingOverlay loading={loading} />

        <Box>
          <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }} fontWeight={600} color="primary" mb={1}>
                {title}
              </Heading>
              <CustomText fontSize="md" color="gray.600">
                {subtitle}
              </CustomText>
            </Box>
            <HStack spacing={2}>
              <Text fontSize="sm" fontWeight="medium" color="primary">
                {progress}%
              </Text>
              <Text fontSize="sm" color="gray.500">
                Complete
              </Text>
            </HStack>
          </Flex>

          <Progress value={progress} size="sm" colorScheme="primary" borderRadius="full" mb={8} />

          <Box as="form" onSubmit={onNext}>
            {children}
          </Box>
        </Box>

        <Box>
          <Divider mb={4} />
          <Flex justify="space-between" pt={2} flexDir={{ base: "column", sm: "row" }} gap={{ base: 3, sm: 0 }}>
            <Button
              isDisabled={isBackDisabled}
              variant="outline"
              borderColor="gray.300"
              color="gray.500"
              order={{ base: 2, sm: 1 }}
              width={{ base: "full", sm: "auto" }}
              onClick={onBack}
            >
              {backButtonText}
            </Button>
            <Button
              onClick={onNext}
              isDisabled={isNextDisabled}
              bg="primary"
              color="white"
              _hover={{ bg: "primary.600" }}
              _active={{ bg: "primary.700" }}
              order={{ base: 1, sm: 2 }}
              width={{ base: "full", sm: "auto" }}
            >
              {isNextDisabled ? "Please Complete All Fields" : nextButtonText}
            </Button>
          </Flex>
        </Box>
      </Box>
    </ScaleFade>
  )
}

