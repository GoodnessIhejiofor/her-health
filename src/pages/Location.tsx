import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Select, useToast, } from "@chakra-ui/react";
import LoadingOverlay, { CustomButton, CustomText } from "../components/common/common";

export default function LocationSelection() {
    const toast = useToast();
    const [selectedLocation, setSelectedLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = `${import.meta.env.VITE_API_URL}/api/onboarding/location`;

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            setError("Unauthorized: No access token found");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ location: selectedLocation }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error.message || "Failed to update location");
            }

            toast({
                title: "Profile Updated!",
                description: "Your location has been updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setTimeout(() => {
                window.location.assign('/payment')
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
                            <CustomText fontSize="xl" fontWeight={600} py={2}>Select your location</CustomText>
                            <CustomText fontSize="md" color={"gray.600"}>Let us pair you with a Healthcare provider</CustomText>
                        </Box>
                        <FormControl isRequired>
                            <FormLabel>Location</FormLabel>
                            <Select placeholder="Select location" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setSelectedLocation(e.target.value)
                            }} value={selectedLocation}>
                                <option value="Lagos">Lagos</option>
                                <option value="Abuja">Abuja</option>
                                <option value="Enugu">Enugu</option>
                            </Select>
                        </FormControl>
                        {loading ? (
                            <CustomText mt={4} color="gray.600">Pairing you with available healthcare providers...</CustomText>
                        ) : selectedLocation && (
                            <CustomText mt={4} fontWeight="bold">{selectedLocation} General Hospital</CustomText>
                        )}
                        {/* {error && <Text color="red.500">{error}</Text>} */}
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
