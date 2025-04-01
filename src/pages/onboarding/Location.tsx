"use client"

import type React from "react"
import { useState } from "react"
import {
    VStack,
    FormControl,
    useToast,
    Box,
    FormLabel,
    Select,
    FormErrorMessage,
    Icon,
} from "@chakra-ui/react"
import { OnboardingLayout } from "./Layout"
import { CustomText } from "../../components/common/common"
import { InfoIcon } from "@chakra-ui/icons"

export default function InsuranceSelection() {
    const [touched, setTouched] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast()

    const API_URL = `${import.meta.env.VITE_API_URL}/api/onboarding/location`;

    const handleLocationChange = (value: string) => {
        setSelectedLocation(value)
        setTouched(true)
    }

    const handleBack = () => {
        window.location.assign("/insurance")
    }

    const progress = selectedLocation ? 100 : 0

    const handleSubmit = async () => {
        setLoading(true);

        if (!selectedLocation) {
            setTouched(true)
            toast({
                title: "Please select a location",
                description: "You must select a location to continue",
                status: "warning",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            // setError("Unauthorized: No access token found");
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
            // setError(err.message);
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
        <OnboardingLayout
            title="Select your location"
            subtitle="Let us pair you with a Healthcare provider"
            progress={progress}
            loading={loading}
            isNextDisabled={!selectedLocation}
            onBack={handleBack}
            onNext={handleSubmit}
            nextButtonText="Continue to Payment"
            isBackDisabled={false}
        >
            <VStack spacing={6} align="stretch" mb={8}>
                <Box>
                    <FormControl isRequired isInvalid={touched && !selectedLocation}>
                        <FormLabel>Location</FormLabel>
                        <Select placeholder="Select location" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            handleLocationChange(e.target.value)
                        }} value={selectedLocation}>
                            <option value="Lagos">Lagos</option>
                            <option value="Abuja">Abuja</option>
                            <option value="Enugu">Enugu</option>
                        </Select>
                        <FormErrorMessage>
                            <Icon as={InfoIcon} mr={1} />
                            Please select a location
                        </FormErrorMessage>
                    </FormControl>
                    {loading ? (
                        <CustomText mt={4} color="gray.600">Pairing you with available healthcare providers...</CustomText>
                    ) : selectedLocation && (
                        <CustomText mt={4} fontWeight="bold">{selectedLocation} General Hospital</CustomText>
                    )}
                    {/* {error && <Text color="red.500">{error}</Text>} */}
                </Box>
            </VStack>
        </OnboardingLayout>
    )
}