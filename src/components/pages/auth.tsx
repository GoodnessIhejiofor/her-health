import { useState } from "react";
import {
    Box,
    Input,
    FormControl,
    FormLabel,
    VStack,
    Text,
    Circle,
    Image,
    RadioGroup,
    Stack,
    Radio,
    Select,
    Icon,
} from "@chakra-ui/react";
import { CustomButton, CustomText } from "../common/common";
import { BiLogoMastercard, BiLogoVisa } from "react-icons/bi";
import { SiAmericanexpress } from "react-icons/si";

const AuthForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const [authType, setAuthType] = useState('login')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };

    return (
        <Box w={{ base: "90%", md: "400px" }} mx="auto" mt={20} p={6} boxShadow="lg" borderRadius="md" bg="#fff">

            <Circle borderRadius={"full"}>
                <Image src="./logo.jpg" width={"100px"} borderRadius={"inherit"} />
            </Circle>
            <CustomText fontSize={"2xl"} fontWeight={600} textAlign="center" size="lg" mb={4}>Welcome</CustomText>

            {(authType === 'login') ?
                <Box>
                    <VStack mb={4} as="form" spacing={4} onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input _focus={{ outlineColor: '' }} placeholder="johndoe@company.com" type="email" name="email" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="********" name="password" onChange={handleChange} />
                        </FormControl>
                        <CustomButton type="submit" width="full">Login</CustomButton>
                    </VStack>
                    <Text fontSize={"sm"}>Don't have an account? <Text onClick={() => setAuthType('register')} as="span" color={"#683257"} cursor={"pointer"}>Click here to Register</Text></Text>
                </Box> :
                <Box>
                    <VStack mb={4} as="form" spacing={4} onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder="Oma" type="text" name="username" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="johndoe@company.com" type="email" name="email" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Phone</FormLabel>
                            <Input placeholder="+2347012345678" type="tel" name="phone" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder="********" type="password" name="password" onChange={handleChange} />
                        </FormControl>
                        <CustomButton type="submit" width="full">Register</CustomButton>
                    </VStack>
                    <Text fontSize={"sm"}>Already have an account? <Text onClick={() => setAuthType('login')} as="span" color={"#683257"} cursor={"pointer"}>Click here to Login</Text></Text></Box>
            }

        </Box>
    );
};


const OnboardingForm = () => {
    const [responses, setResponses] = useState<Record<string, string>>({});

    const handleResponseChange = (question: string, value: string) => {
        setResponses({ ...responses, [question]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Onboarding Responses:", responses);
    };

    return (
        <Box>
            <Box textAlign={"start"} pb={8}>
                <CustomText fontSize="xl" fontWeight={600} py={2}>Onboarding</CustomText>
                <CustomText fontSize="md" color={"gray.600"}>Tell us more about yourself</CustomText>
            </Box>
            <VStack as="form" spacing={5} onSubmit={handleSubmit}>
                {["Was your last treatment received within 3-6 months ago?",
                    "Has any female in your family suffered from breast/cervical cancer?",
                    "Have you ever been diagnosed with any female-related condition?",
                    "Do you have any reproductive issues?",
                    "Do you have kids?"].map((question, index) => (
                        <FormControl key={index} isRequired>
                            <FormLabel fontFamily={"Inter"}>{question}</FormLabel>
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
    );
};

const InsuranceSelection = () => {
    const [selectedPlan, setSelectedPlan] = useState<string>("");

    const handlePlanChange = (value: string) => {
        setSelectedPlan(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Selected Insurance Plan:", selectedPlan);
    };

    return (
        <Box>
            <Box textAlign={"start"} pb={8}>
                <CustomText fontSize="xl" fontWeight={600} py={2}>Insurance plans</CustomText>
                <CustomText fontSize="md" color={"gray.600"}>Choose an Insurance plan</CustomText>
            </Box>
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
    );
};

const LocationSelection = () => {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(e.target.value);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    };

    return (
        <Box>
            <Box textAlign={"start"} pb={8}>
                <CustomText fontSize="xl" fontWeight={600} py={2}>Select your location</CustomText>
                <CustomText fontSize="md" color={"gray.600"}>Let us pair you with a Healthcare provider</CustomText>
            </Box>
            <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Select placeholder="Select location" onChange={handleLocationChange}>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Enugu">Enugu</option>
                </Select>
            </FormControl>
            {loading ? (
                <Text mt={4} color="gray.600">Pairing you with available healthcare providers...</Text>
            ) : selectedLocation && (
                <Text mt={4} fontWeight="bold">{selectedLocation} General Hospital</Text>
            )}
        </Box>
    );
};

const PaymentSelection = () => {
    const [selectedMethod, setSelectedMethod] = useState("paypal");

    return (
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
                                <Text fontSize="md">Debit Card</Text>
                                <Icon color={"primary"} as={BiLogoMastercard} boxSize={8} />
                                <Icon color={"primary"} as={BiLogoVisa} boxSize={8} />
                            </Stack>
                        </Radio>
                    </Box>

                    <Box width="full" border="1px solid #E2E8F0" p={4} borderRadius="md">
                        <Radio value="momo">
                            <Stack direction="row" align="center">
                                <Text fontSize="md">Pay with momo</Text>
                            </Stack>
                        </Radio>
                        {selectedMethod === "momo" && (
                            <Text fontSize="sm" color="gray.600" mt={2}>
                                Continuing will take you to a secured page. You'll be able to review and submit your order after you log in.
                            </Text>
                        )}
                    </Box>

                    <Box width="full" border="1px solid #E2E8F0" p={4} borderRadius="md">
                        <Radio value="opay">
                            <Stack direction="row" align="center">
                                <Text fontSize="md">Pay with Opay</Text>
                            </Stack>
                        </Radio>
                        {selectedMethod === "opay" && (
                            <Text fontSize="sm" color="gray.600" mt={2}>
                                Continuing will take you to a secured page. You'll be able to review and submit your order after you log in.
                            </Text>
                        )}
                    </Box>

                </VStack>
            </RadioGroup>

            {/* Continue Button */}
            {/* <CustomButton
                mt={6}
                width="full"
                bg="black"
                color="white"
                _hover={{ bg: "gray.800" }}
                isDisabled={!selectedMethod}
            >
                {selectedMethod === "paypal" ? "Continue to PayPal" : "Continue"}
            </CustomButton> */}
        </Box>
    );
};

export { AuthForm, OnboardingForm, InsuranceSelection, LocationSelection, PaymentSelection };
