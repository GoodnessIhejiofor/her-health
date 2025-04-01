"use client"

import type React from "react"
import { useState } from "react"
import {
    VStack,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Stack,
    useToast,
    FormErrorMessage,
    Icon,
    ScaleFade,
    Text,
} from "@chakra-ui/react"
import { CheckCircleIcon, InfoIcon } from "@chakra-ui/icons"
import { OnboardingLayout } from "./Layout"

const questions = [
    "Was your last treatment received within 3-6 months ago?",
    "Has any female in your family suffered from breast/cervical cancer?",
    "Have you ever been diagnosed with any female-related condition?",
    "Do you have any reproductive issues?",
    "Do you have kids?",
]

export default function HealthProfile() {
    const [responses, setResponses] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)
    const [touched, setTouched] = useState<Record<string, boolean>>({})
    const toast = useToast()

    const API_URL = `${import.meta.env.VITE_API_URL}/api/onboarding/health-profile`
    const accessToken = localStorage.getItem("accessToken")

    // Calculate progress
    const progress = Math.round((Object.keys(responses).length / questions.length) * 100)

    // Check if all questions are answered
    const isFormComplete = questions.every((q) => responses[q])

    const handleResponseChange = (question: string, value: string) => {
        setResponses({ ...responses, [question]: value })
        setTouched({ ...touched, [question]: true })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Check if all questions are answered
        if (!isFormComplete) {
            // Mark all fields as touched to show validation errors
            const allTouched = questions.reduce(
                (acc, question) => {
                    acc[question] = true
                    return acc
                },
                {} as Record<string, boolean>,
            )

            setTouched(allTouched)

            toast({
                title: "Please complete all fields",
                description: "All questions require an answer to proceed",
                status: "warning",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        setLoading(true)

        if (!accessToken) {
            toast({
                title: "Authentication Error",
                description: "Unauthorized: Please log in again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            setLoading(false)
            return
        }

        try {
            const formattedResponses = {
                has_received_treatment: responses["Was your last treatment received within 3-6 months ago?"] === "yes",
                has_suffered_cancer: responses["Has any female in your family suffered from breast/cervical cancer?"] === "yes",
                has_female_condition: responses["Have you ever been diagnosed with any female-related condition?"] === "yes",
                has_reproductive_issues: responses["Do you have any reproductive issues?"] === "yes",
                has_kids: responses["Do you have kids?"] === "yes",
            }

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formattedResponses),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong")
            }

            toast({
                title: "Profile Updated!",
                description: "Your health profile has been updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            })

            setTimeout(() => {
                window.location.assign("/insurance")
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

    return (
        <OnboardingLayout
            title="Health Profile"
            subtitle="Tell us more about your health history"
            progress={progress}
            loading={loading}
            isNextDisabled={!isFormComplete}
            onNext={handleSubmit}
            nextButtonText="Continue to Insurance"
            isBackDisabled={true}
        >
            <VStack spacing={6} align="stretch" mb={8}>
                {questions.map((question, index) => (
                    <ScaleFade key={index} in={true} initialScale={0.9} delay={index * 0.1}>
                        <FormControl isRequired isInvalid={touched[question] && !responses[question]}>
                            <FormLabel fontFamily="Inter" fontWeight="medium" display="flex" alignItems="center">
                                <Text mr={2}>{question}</Text>
                                {responses[question] && <Icon as={CheckCircleIcon} color="green.500" boxSize={4} />}
                            </FormLabel>
                            <RadioGroup
                                onChange={(value) => handleResponseChange(question, value)}
                                value={responses[question] || ""}
                                colorScheme="primary"
                            >
                                <Stack direction={{ base: "column", sm: "row" }} spacing={{ base: 2, sm: 6 }}>
                                    <Radio
                                        value="yes"
                                        size="lg"
                                        _checked={{
                                            bg: "primary",
                                            borderColor: "primary",
                                        }}
                                    >
                                        <Text fontWeight="medium">Yes</Text>
                                    </Radio>
                                    <Radio
                                        value="no"
                                        size="lg"
                                        _checked={{
                                            bg: "primary",
                                            borderColor: "primary",
                                        }}
                                    >
                                        <Text fontWeight="medium">No</Text>
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                            <FormErrorMessage>
                                <Icon as={InfoIcon} mr={1} />
                                This question requires an answer
                            </FormErrorMessage>
                        </FormControl>
                    </ScaleFade>
                ))}
            </VStack>
        </OnboardingLayout>
    )
}

