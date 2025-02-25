import { useState } from "react";
import { Box, Button, Flex, Icon, Radio, RadioGroup, Stack, useToast, VStack, } from "@chakra-ui/react";
import { CustomButton, CustomText } from "../components/common/common";
import { BiLogoMastercard, BiLogoVisa } from "react-icons/bi";

export default function PaymentSelection() {
    const [selectedMethod, setSelectedMethod] = useState("paypal");
    const toast = useToast();

    const handleSubmit = () => {
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
                <Flex flex="1">
                    <Box>
                        {/* Header */}
                        <Box textAlign="start" pb={8}>
                            <CustomText fontSize="xl" fontWeight="bold" py={2}>Choose a payment method</CustomText>
                            <CustomText fontSize="md" color="gray.600">
                                You will not be charged until you review this order on the next page.
                            </CustomText>
                        </Box>

                        {/* Payment Options */}
                        <RadioGroup onChange={setSelectedMethod} value={selectedMethod}>
                            <VStack spacing={4} align="start">
                                {/* Card Option */}
                                <Box width="full" border="1px solid #E2E8F0" p={4} borderRadius="md">
                                    <Radio value="card">
                                        <Stack direction="row" align="center">
                                            <CustomText fontSize="md">Debit Card</CustomText>
                                            <Icon color={"primary"} as={BiLogoMastercard} boxSize={8} />
                                            <Icon color={"primary"} as={BiLogoVisa} boxSize={8} />
                                        </Stack>
                                    </Radio>
                                </Box>

                                <Box width="full" border="1px solid #E2E8F0" p={4} borderRadius="md">
                                    <Radio value="momo">
                                        <Stack direction="row" align="center">
                                            <CustomText fontSize="md">Pay with momo</CustomText>
                                        </Stack>
                                    </Radio>
                                    {selectedMethod === "momo" && (
                                        <CustomText fontSize="sm" color="gray.600" mt={2}>
                                            Continuing will take you to a secured page. You'll be able to review and submit your order after you log in.
                                        </CustomText>
                                    )}
                                </Box>

                                <Box width="full" border="1px solid #E2E8F0" p={4} borderRadius="md">
                                    <Radio value="opay">
                                        <Stack direction="row" align="center">
                                            <CustomText fontSize="md">Pay with Opay</CustomText>
                                        </Stack>
                                    </Radio>
                                    {selectedMethod === "opay" && (
                                        <CustomText fontSize="sm" color="gray.600" mt={2}>
                                            Continuing will take you to a secured page. You'll be able to review and submit your order after you log in.
                                        </CustomText>
                                    )}
                                </Box>

                            </VStack>
                        </RadioGroup>
                    </Box>
                </Flex>

                <Flex justify="space-between" mt={4} pt={4} borderTop="1px solid #E2E8F0">
                    <Button isDisabled colorScheme="gray">
                        Back
                    </Button>
                    <CustomButton onClick={handleSubmit}>
                        Finish
                    </CustomButton>
                </Flex>
            </Box>
        </>
    );
}
