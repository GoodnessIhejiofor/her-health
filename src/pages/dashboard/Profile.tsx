"use client"

import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spinner,
    Stack,
    Text,
    Textarea,
    VStack,
    Avatar,
} from "@chakra-ui/react";
import { BiSave, BiUpload } from "react-icons/bi";
import { DashboardLayout } from "./Layout";

interface ProfileData {
    name: string;
    username: string;
    email: string;
    bio: string;
    phone: string;
    height: string;
    weight: string;
    birthdate: string;
}

export default function ProfilePage() {
    const API_URL = `${import.meta.env.VITE_API_URL}/api/user/info`;
    const accessToken = localStorage.getItem("accessToken");

    const [isLoading, setIsLoading] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData>({
        name: "John Doe",
        username: "Johnny",
        email: "john@example.com",
        bio: "Health enthusiast focused on improving mineral balance and overall wellness.",
        phone: "+1 (555) 123-4567",
        height: "5'10\"",
        weight: "175 lbs",
        birthdate: "1985-06-15",
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    useEffect(() => {
        const sendRequest = async () => {
          const response = await fetch(API_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
          });
    
          const data = await response.json();
    
          if (response.status === 401) {
            window.location.assign("/login");
            return;
          }
    
          if (!response.ok) {
            throw new Error(data.error?.message || "Something went wrong");
          }
    
          setProfileData({
            ...profileData,
            email: data?.data?.info?.email || "john@example.com",
            username: data?.data?.info?.username || "Jonny",
            phone: data?.data?.info?.phone || "08123343227",
          });
        };
    
        sendRequest();
      }, []);

    return (
        <DashboardLayout>
            <Container maxW="container.md" py={6}>
                <Heading size="lg" mb={2}>Profile Settings</Heading>
                <Text color="gray.600" mb={6}>Manage your account settings and preferences</Text>
                <Box bg="white" p={6} rounded="lg" boxShadow="sm">
                    <VStack spacing={4} align="start">
                        <Stack direction={{ base: "column", sm: "row" }} spacing={4} align="center">
                            <Avatar size="xl" name={profileData.name} />
                            <Button disabled leftIcon={<BiUpload size={16} />} variant="outline">Change Photo</Button>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} w="full">
                            <FormControl>
                                <FormLabel>Full Name</FormLabel>
                                <Input type="text" name="name" value={profileData.name} onChange={handleProfileChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" name="email" value={profileData.email} onChange={handleProfileChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phone Number</FormLabel>
                                <Input type="text" name="phone" value={profileData.phone} onChange={handleProfileChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Date of Birth</FormLabel>
                                <Input type="date" name="birthdate" value={profileData.birthdate} onChange={handleProfileChange} />
                            </FormControl>
                            <Divider />
                            <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                                <FormControl>
                                    <FormLabel>Height</FormLabel>
                                    <Input type="text" name="height" value={profileData.height} onChange={handleProfileChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Weight</FormLabel>
                                    <Input type="text" name="weight" value={profileData.weight} onChange={handleProfileChange} />
                                </FormControl>
                            </Stack>
                        </Stack>
                        <Button
                            leftIcon={isLoading ? <Spinner size="sm" /> : <BiSave size={16} />}
                            colorScheme="blue"
                            w="full"
                            disabled
                            onClick={handleSubmit}
                            isLoading={isLoading}
                        >
                            Save Changes
                        </Button>
                    </VStack>
                </Box>
            </Container>
        </DashboardLayout>
    );
}
