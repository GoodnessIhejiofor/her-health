import { VStack, Box, SimpleGrid, Text, Image, Menu, MenuButton, MenuList, MenuItem, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Avatar, Divider, Table, Tr, Td, useToast, Tbody } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUserMd, FaHospital, FaCalendarAlt, FaHeart, FaClipboardList, FaUserCircle } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { CustomButton } from "../../components/common/common";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { DashboardLayout } from "./Layout";

const menuItems = [
    { icon: FaUserMd, label: "My Doctor", action: "openDoctorProfile" },
    { icon: FaHospital, label: "My Clinic", action: "openClinicInfo" },
    { icon: FaCalendarAlt, label: "My Appointments", action: "openAppointment" },
    { icon: FaHeart, label: "Health Wellness", action: "openHealthWellness" },
    { icon: FaClipboardList, label: "Insurance", action: "openInsurance" },
    { icon: MdOutlineSupportAgent, label: "Contact us", action: "openContactInfo" },
];

export const MainContent = () => {
    const API_URL = `${import.meta.env.VITE_API_URL}/api/onboarding/info`;
    const accessToken = localStorage.getItem("accessToken");
    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isClinicOpen, onOpen: onClinicOpen, onClose: onClinicClose } = useDisclosure();
    const { isOpen: isAppointmentOpen, onOpen: onAppointmentOpen, onClose: onAppointmentClose } = useDisclosure();
    const { isOpen: isWellnessOpen, onOpen: onWellnessOpen, onClose: onWellnessClose } = useDisclosure();
    const { isOpen: isInsuranceOpen, onOpen: onInsuranceOpen, onClose: onInsuranceClose } = useDisclosure();
    const { isOpen: isContactOpen, onOpen: onContactOpen, onClose: onContactClose } = useDisclosure();

    const [insurancePlan, setInsurancePlan] = useState("24-months");
    const [location, setLocation] = useState("Abuja");
    const [loading, setLoading] = useState(false)

    const handleItemClick = (action: string) => {
        if (action === "openDoctorProfile") {
            onOpen();
        } else if (action === "openClinicInfo") {
            onClinicOpen();
        } else if (action === "openAppointment") {
            onAppointmentOpen();
        } else if (action === "openHealthWellness") {
            onWellnessOpen();
        } else if (action === "openInsurance") {
            onInsuranceOpen();
        } else if (action === "openContactInfo") {
            onContactOpen();
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
            if (!accessToken) {
                window.location.assign('/')
            }
        }
    }, [])

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                }
            });

            if (response.status === 401) {
                window.location.assign("/login");
                return;
              }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error.message || "Something went wrong");
            }

            setInsurancePlan(data?.data?.info?.insurance_type)
            setLocation(data?.data?.info?.location)
        }

        sendRequest()
    }, [])

    const sendEmail = async () => {
        setLoading(true);
        const API_URL = `${import.meta.env.VITE_API_URL}/api/onboarding/send-email`;

        if (!accessToken) {
            window.location.assign('/')
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            if (response.status === 401) {
                window.location.assign("/login");
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            toast({
                title: "Email Sent!",
                description: "Kindly check your inbox for your appointment details",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setLoading(false)
        } catch (err: any) {
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
        <DashboardLayout>

            <VStack display="flex" justifyContent="start" alignItems="center" p={4}>

                <Box
                    p={6}>
                    <SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 6 }} spacing={6}>
                        {menuItems.map((item, index) => (
                            <VStack key={index} bg="white" p={0} borderRadius="md" boxShadow="sm" _hover={{ boxShadow: "md", cursor: "pointer" }} overflow="hidden" border="1px solid #ddd" onClick={() => handleItemClick(item?.action || "")}>
                                <Box bg="primary" w="full" p={3} textAlign="center" color="white" borderTopRadius="md">
                                    <Text fontSize="md" fontWeight="bold">{item.label}</Text>
                                </Box>
                                <Box p={4}>
                                    <item.icon size={40} color="#683257" />
                                </Box>
                            </VStack>
                        ))}
                    </SimpleGrid>
                </Box>

                {/* Doctor Profile Modal */}
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent borderRadius="lg" p={4}>
                        <ModalHeader textAlign="center" fontSize="xl" fontWeight="bold">Doctor Profile</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4} textAlign="center">
                                <Avatar size="xl" name="Dr. John Doe" src="/doctor.png" />
                                <Text fontSize="lg" fontWeight="bold">Dr. John Doe</Text>
                                <Divider />
                                <Table w={"full"}>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                Specialization:
                                            </Td>
                                            <Td>
                                                Oncology
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                Hospital:
                                            </Td>
                                            <Td>
                                                {location} General Hospital
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                Years of Experience:
                                            </Td>
                                            <Td>
                                                15
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                Contact:
                                            </Td>
                                            <Td>
                                                johndoe@example.com
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                                <CustomButton mt={4}>Book an Appointment</CustomButton>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                {/* Clinic Info Modal */}
                <Modal isOpen={isClinicOpen} onClose={onClinicClose} isCentered>
                    <ModalOverlay />
                    <ModalContent borderRadius="lg" p={4}>
                        <ModalHeader textAlign="center" fontSize="xl" fontWeight="bold">My Clinic</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4} textAlign="center">
                                <Image src="/hospital.jpg" borderRadius="md" />
                                <Text fontSize="lg" fontWeight="bold">{location} General Hospital</Text>
                                <Text color="gray.600">For doctor details, visit "My Doctor".</Text>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <Modal isOpen={isWellnessOpen} onClose={onWellnessClose} isCentered>
                    <ModalOverlay />
                    <ModalContent borderRadius="lg" p={4}>
                        <ModalHeader textAlign="center" fontSize="xl" fontWeight="bold">Health & Wellness</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4} textAlign="left">
                                <Text fontSize="md" fontWeight="bold">Breast Cancer Awareness</Text>
                                <Text color="gray.600">Learn about early detection, risk factors, and treatment options for breast cancer.</Text>
                                <Divider />
                                <Text fontSize="md" fontWeight="bold">Nutrition & Diet</Text>
                                <Text color="gray.600">Healthy eating tips for a balanced lifestyle and better well-being.</Text>
                                <Divider />
                                <Text fontSize="md" fontWeight="bold">Mental Health</Text>
                                <Text color="gray.600">Resources to help manage stress, anxiety, and maintain mental wellness.</Text>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <Modal isOpen={isInsuranceOpen} onClose={onInsuranceClose} isCentered>
                    <ModalOverlay />
                    <ModalContent borderRadius="lg" p={4}>
                        <ModalHeader textAlign="center" fontSize="xl" fontWeight="bold">Insurance Plan</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4} textAlign="center">
                                <Text fontSize="lg" fontWeight="bold">Your Insurance Plan: {insurancePlan}</Text>
                                <Divider />

                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                Coverage:
                                            </Td>
                                            <Td>
                                                3 Tests / year
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                Medications:
                                            </Td>
                                            <Td>
                                                {(insurancePlan === "24-months") ? "Yes" : "No"}
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                Surgeries:
                                            </Td>
                                            <Td>
                                                {(insurancePlan === "24-months") ? "Yes" : "No"}

                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                                <CustomButton mt={4}>Pay Now</CustomButton>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <Modal isOpen={isContactOpen} onClose={onContactClose} isCentered>
                    <ModalOverlay />
                    <ModalContent borderRadius="lg" p={4}>
                        <ModalHeader textAlign="center" fontSize="xl" fontWeight="bold">Contact Us</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Table variant="simple">
                                <Tbody>
                                    <Tr>
                                        <Td fontWeight="bold">Email</Td>
                                        <Td>support@herhealth.info</Td>
                                    </Tr>
                                    <Tr>
                                        <Td fontWeight="bold">Phone</Td>
                                        <Td>+123 456 7890</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <Modal isOpen={isAppointmentOpen} onClose={onAppointmentClose} isCentered>
                    <ModalOverlay />
                    <ModalContent borderRadius="lg" p={4}>
                        <ModalHeader textAlign="center" fontSize="xl" fontWeight="bold">Next Appointment</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4} textAlign="center">
                                <Calendar tileDisabled={({ date }) => ![1, 5, 9].includes(date.getMonth())} />
                                <Text mt={4} fontSize="md" fontWeight="bold">
                                    In the next month (as stated in the calendar), you will receive your appointment details via email.
                                </Text>
                                <CustomButton isLoading={loading} loadingText="Please wait..." mt={4} onClick={() => sendEmail()}>Send Test Email</CustomButton>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </VStack>
        </DashboardLayout>
    );
};
