import { Box, SimpleGrid, Text, Icon, VStack, Circle, Image } from "@chakra-ui/react";
import { FaUserMd, FaHospital, FaClipboardList, FaHeart, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";

const menuItems = [
    { icon: FaUserMd, label: "My Doctor" },
    { icon: FaHospital, label: "My Clinic" },
    { icon: FaCalendarAlt, label: "Next Appointment" },
    { icon: FaHeart, label: "Health Wellness" },
    { icon: FaClipboardList, label: "Insurance" },
    { icon: MdOutlineSupportAgent, label: "Contact us" },
];

export const MainContent = () => {
    return (
        <>
            <VStack w="100vw" h="100vh" display="flex" justifyContent="center" alignItems="center" p={4}>
                <Circle borderRadius={"full"}>
                    <Image src="./logo.jpg" width={"150px"} borderRadius={"inherit"} />
                </Circle>

                <Box w={{ base: "90%", md: "400px" }} bg="white" borderRadius="lg" boxShadow="lg" p={4}>
                    <SimpleGrid columns={2} spacing={4}>
                        {menuItems.map((item, index) => (
                            <VStack key={index} bg="gray.100" p={4} borderRadius="md" boxShadow="sm">
                                <Icon as={item.icon} boxSize={8} color="primary" />
                                <Text fontSize="sm" fontWeight="medium" textAlign="center">{item.label}</Text>
                            </VStack>
                        ))}
                    </SimpleGrid>
                </Box>
            </VStack>
        </>

    );
}
