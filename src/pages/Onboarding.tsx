import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { InsuranceSelection, LocationSelection, OnboardingForm, PaymentSelection } from "../components/pages/auth";
import LoadingOverlay, { CustomButton } from "../components/common/common";
import { Bounce, toast, ToastContainer } from "react-toastify";

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
            } else {
                toast('Welcome!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
    
                setTimeout(() => {
                    window.location.assign('/dashboard');
                }, 3000);
            }
        }, 3000);
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
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

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
                <LoadingOverlay loading={loadingStep} />
                <Flex flex="1">
                    {steps[currentStep].component}
                </Flex>

                <Flex justify="space-between" mt={4} pt={4} borderTop="1px solid #E2E8F0">
                    <Button onClick={prevStep} isDisabled={currentStep === 0} colorScheme="gray">
                        Back
                    </Button>
                    <CustomButton onClick={nextStep}>
                        {currentStep === steps.length - 1 ? "Finish" : "Next"}
                    </CustomButton>
                </Flex>
            </Box>
        </>
    );
}
