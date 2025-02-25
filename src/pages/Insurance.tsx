import { useState } from "react";
import { Box, Button, Flex, FormControl, Radio, RadioGroup, Stack, useToast, VStack } from "@chakra-ui/react";
import LoadingOverlay, { CustomButton, CustomText } from "../components/common/common";

export default function InsuranceSelection() {
    const toast = useToast();

    const [selectedPlan, setSelectedPlan] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = `${import.meta.env.VITE_API_URL}/api/onboarding/insurance`;
    const accessToken = localStorage.getItem("accessToken");

    const handlePlanChange = (value: string) => {
        setSelectedPlan(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPlan) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ insurance_type: selectedPlan }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error.message || "Something went wrong");
            }

            toast({
                title: "Profile Updated!",
                description: "Your Insurance plan has been updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setTimeout(() => {
                window.location.assign('/location')
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
                        <Box textAlign={"start"} pb={8}>
                            <CustomText fontSize="xl" fontWeight={600} py={2}>Insurance plans</CustomText>
                            <CustomText fontSize="md" color={"gray.600"}>Choose an Insurance plan</CustomText>
                        </Box>
                        {/* {error && <Text color="red.500" textAlign="center">{error}</Text>} */}
                        <VStack as="form" spacing={4} onSubmit={handleSubmit}>
                            <FormControl isRequired>
                                <RadioGroup onChange={handlePlanChange} value={selectedPlan}>
                                    <Stack direction="column">
                                        <Radio value="12-months">12 months ($20) - 3 consultations per year</Radio>
                                        <Radio value="24-months">24 months ($50) - 3 consultations per year + medication</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
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
