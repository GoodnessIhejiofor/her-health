import { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Radio, RadioGroup, Stack, useToast, VStack } from "@chakra-ui/react";
import LoadingOverlay, { CustomButton, CustomText } from "../components/common/common";

export default function HealthProfile() {
    const [responses, setResponses] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const toast = useToast();

    const API_URL = `${import.meta.env.VITE_API_URL}/api/onboarding/health-profile`;
    const accessToken = localStorage.getItem("accessToken");

    const handleResponseChange = (question: string, value: string) => {
        setResponses({ ...responses, [question]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!accessToken) {
            setError("Unauthorized: Please log in again.");
            return;
        }

        try {
            const formattedResponses = {
                has_received_treatment: responses["Was your last treatment received within 3-6 months ago?"] === "yes",
                has_suffered_cancer: responses["Has any female in your family suffered from breast/cervical cancer?"] === "yes",
                has_female_condition: responses["Have you ever been diagnosed with any female-related condition?"] === "yes",
                has_reproductive_issues: responses["Do you have any reproductive issues?"] === "yes",
                has_kids: responses["Do you have kids?"] === "yes",
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formattedResponses),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            toast({
                title: "Profile Updated!",
                description: "Your health profile has been updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setTimeout(() => {
                window.location.assign('/insurance')
            }, 3000)
        } catch (err: any) {
            setError(err.message);
            toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box
                w={{ base: "full", md: "700px" }}
                h={{ base: '660px', md: '600px' }}
                mx="auto"
                p={6}
                boxShadow="lg"
                borderRadius="md"
                bg="#fff"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                position="relative"
            >
                <LoadingOverlay loading={loading} />
                <Flex flex="1">
                    <Box>
                        <Box textAlign="start" pb={8}>
                            <CustomText fontSize="xl" fontWeight={600} py={2}>Onboarding</CustomText>
                            <CustomText fontSize="md" color="gray.600">Tell us more about yourself</CustomText>
                        </Box>
                        <VStack as="form" spacing={5} onSubmit={handleSubmit}>
                            {["Was your last treatment received within 3-6 months ago?",
                                "Has any female in your family suffered from breast/cervical cancer?",
                                "Have you ever been diagnosed with any female-related condition?",
                                "Do you have any reproductive issues?",
                                "Do you have kids?"].map((question, index) => (
                                    <FormControl key={index} isRequired>
                                        <FormLabel fontFamily="Inter">{question}</FormLabel>
                                        <RadioGroup onChange={(value) => handleResponseChange(question, value)}>
                                            <Stack direction="row">
                                                <Radio value="yes">Yes</Radio>
                                                <Radio value="no">No</Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </FormControl>
                                ))}
                        </VStack>
                    </Box>
                </Flex>

                <Flex justify="space-between" mt={4} pt={4} borderTop="1px solid #E2E8F0">
                    <Button isDisabled colorScheme="gray">
                        Back
                    </Button>
                    <CustomButton onClick={handleSubmit}>
                        Next
                    </CustomButton>
                </Flex>
            </Box>
        </>
    );
}
