import { FormEvent, useState } from "react";
import {
    Box,
    Input,
    FormControl,
    FormLabel,
    VStack,
    Text,
    Circle,
    Image,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { CustomButton, CustomText } from "../components/common/common";

export default function Auth() {

        const [formData, setFormData] = useState({
            username: "",
            email: "",
            phone: "",
            password: "",
        });
        const [authType, setAuthType] = useState("login");
        const [loading, setLoading] = useState(false);
        // const [error, setError] = useState("");
        const toast = useToast();

        const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleSubmit = async (e: FormEvent) => {
            e.preventDefault();
            setLoading(true);
            // setError("");

            try {
                const response = await fetch(`${API_URL}/${authType}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error.message || "Something went wrong");
                }

                if (authType === "register") {
                    toast({
                        title: "Registration Successful",
                        description: "You can now log in.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    setAuthType("login");
                } else {
                    localStorage.setItem("accessToken", data.data.accessToken);
                    toast({
                        title: "Login Successful",
                        description: "Redirecting to onboarding...",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    setTimeout(() => {
                        window.location.assign("/health-profile");
                    }, 3000);
                }
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
            <Box maxW={{ base: "full", md: '1200px' }} m={"auto"}>
                <Box w={{ base: "90%", md: "500px" }} mx="auto" mt={20} p={6} boxShadow="lg" borderRadius="md" bg="#fff">
                    <Circle borderRadius={"full"}>
                        <Image src="./logo.jpg" width={"100px"} borderRadius={"inherit"} />
                    </Circle>
                    <CustomText fontSize={"2xl"} fontWeight={600} textAlign="center" size="lg" mb={4}>Welcome</CustomText>
                    {/* {error && <Text color="red.500" textAlign="center">{error}</Text>} */}
                    <Box>
                        <VStack mb={4} as="form" spacing={4} onSubmit={handleSubmit}>
                            {authType === "register" && (
                                <FormControl isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input placeholder="Oma" type="text" name="username" onChange={handleChange} />
                                </FormControl>
                            )}
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder="johndoe@company.com" type="email" name="email" onChange={handleChange} />
                            </FormControl>
                            {authType === "register" && (
                                <FormControl isRequired>
                                    <FormLabel>Phone</FormLabel>
                                    <Input placeholder="+2347012345678" type="tel" name="phone" onChange={handleChange} />
                                </FormControl>
                            )}
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input placeholder="********" type="password" name="password" onChange={handleChange} />
                            </FormControl>
                            <CustomButton type="submit" width="full" isLoading={loading}>
                                {authType === "login" ? "Login" : "Register"}
                            </CustomButton>
                        </VStack>
                        <Text fontSize={"sm"}>
                            {authType === "login" ? (
                                <>Don't have an account? <Text onClick={() => setAuthType("register")} as="span" color={"#683257"} cursor="pointer">Click here to Register</Text></>
                            ) : (
                                <>Already have an account? <Text onClick={() => setAuthType("login")} as="span" color={"#683257"} cursor="pointer">Click here to Login</Text></>
                            )}
                        </Text>
                    </Box>
                </Box>
            </Box>
        )
    }