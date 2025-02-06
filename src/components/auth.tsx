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
} from "@chakra-ui/react";
import { CustomButton, CustomText } from "./common/CustomButton";

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
                            <Input _focus={{outlineColor: ''}} placeholder="johndoe@company.com" type="email" name="email" onChange={handleChange} />
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

export default AuthForm;
