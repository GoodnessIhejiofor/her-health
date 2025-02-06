import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { InsuranceSelection, LocationSelection, OnboardingForm, PaymentSelection } from "../components/pages/auth";
import LoadingOverlay, { CustomButton } from "../components/common/common";

// Define the steps as components
const steps = [
    { id: "step1", component: <OnboardingForm /> },
    { id: "step2", component: <InsuranceSelection /> },
    { id: "step3", component: <LocationSelection /> },
    { id: "step4", component: <PaymentSelection /> },
];

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(0);
    const [loadingStep, setLoadingStep] = useState(false);

    const nextStep = () => {
        setLoadingStep(true);
        setTimeout(() => {
            setLoadingStep(false);
            if (currentStep < steps.length - 1) {
                setCurrentStep((prev) => prev + 1);
            }
        }, 3000)
    };

    const prevStep = () => {
        setLoadingStep(true);
        setTimeout(() => {
            setLoadingStep(false);
            if (currentStep > 0) {
                setCurrentStep((prev) => prev - 1);
            }
        }, 3000)
    };


    return (
        <Box
            w={{ base: "90%", md: "700px" }}
            h="600px"
            mx="auto"
            mt={20}
            p={6}
            boxShadow="lg"
            borderRadius="md"
            bg="#fff"
            display="flex"
            flexDirection="column"
            justifyContent="space-between" // Ensures spacing between steps and buttons
            position="relative"
        >
            <LoadingOverlay loading={loadingStep} />
            {/* Step Content */}
            <Flex flex="1"
            // justify="center" 
            // align="center"
            >
                {steps[currentStep].component}
            </Flex>

            {/* Navigation Buttons (Stuck to Bottom) */}
            <Flex justify="space-between" mt={4} pt={4} borderTop="1px solid #E2E8F0">
                <Button onClick={prevStep} isDisabled={currentStep === 0} colorScheme="gray">
                    Back
                </Button>
                <CustomButton onClick={nextStep} isDisabled={currentStep === steps.length - 1} colorScheme="blue">
                    {currentStep === steps.length - 1 ? "Finish" : "Next"}
                </CustomButton>
            </Flex>
        </Box>

    );
}
