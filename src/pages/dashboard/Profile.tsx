import { Box, Text, VStack, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

const Profile = () => {
    const [user] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "********",
        insuranceType: "Premium Plan",
        hospital: "General Hospital"
    });

    return (
        <Box
            w="full"
            maxW="md"
            mx="auto"
            mt={10}
            p={6}
            boxShadow="md"
            borderRadius="lg"
            bg="white"
        >
            <Text fontSize="2xl" fontWeight="bold" mb={4}>Profile</Text>
            <VStack spacing={4} align="stretch">
                <Box>
                    <Text fontWeight="medium">Full Name</Text>
                    <Input value={user.name} isReadOnly />
                </Box>
                <Box>
                    <Text fontWeight="medium">Email</Text>
                    <Input value={user.email} isReadOnly />
                </Box>
                <Box>
                    <Text fontWeight="medium">Password</Text>
                    <Input value={user.password} isReadOnly type="password" />
                </Box>
                <Box>
                    <Text fontWeight="medium">Insurance Type</Text>
                    <Input value={user.insuranceType} isReadOnly />
                </Box>
                <Box>
                    <Text fontWeight="medium">Hospital</Text>
                    <Input value={user.hospital} isReadOnly />
                </Box>
                <Button colorScheme="blue" onClick={() => window.history.back()}>
                    Go Back
                </Button>
            </VStack>
        </Box>
    );
};

export default Profile;
