import { ReactNode } from "react";
import { Box, Flex, IconButton, VStack, Divider, Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, useDisclosure, Image } from "@chakra-ui/react";
import { HamburgerIcon, UnlockIcon, ExternalLinkIcon, StarIcon } from "@chakra-ui/icons";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  dividerAfter?: boolean;
}

const navItems: NavItem[] = [
  { title: "Overview", href: "/dashboard", icon: StarIcon },
  { title: "Profile", href: "/dashboard/profile", icon: UnlockIcon },
  { title: "Logout", href: "/logout", icon: ExternalLinkIcon },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex direction="column" minH="100vh">
      <Box as="header" position="sticky" top={0} zIndex={50} borderBottomWidth={1} bg="white" p={4} shadow="sm">
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold"><Image src="/logo.jpg" width={"50px"} borderRadius={"inherit"} /></Text>
          <Flex gap={4} align="center">
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<HamburgerIcon />}
              aria-label="Toggle Menu"
              onClick={onOpen}
            />
          </Flex>
        </Flex>
      </Box>

      <Flex flex={1}>
        <Box display={{ base: "none", md: "block" }} w="240px" borderRightWidth={1} bg="gray.50" p={4}>
          <DashboardNav />
        </Box>

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody p={4}>
              <DashboardNav />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Box flex={1} overflowX="auto" bg="gray.100" p={4}>{children}</Box>
      </Flex>
    </Flex>
  );
}

export function DashboardNav() {
  return (
    <VStack spacing={2} align="stretch">
      {navItems.map((item) => (
        <Box key={item.href}>
          <Flex
            as="a"
            href={item.href}
            align="center"
            gap={3}
            p={2}
            borderRadius="md"
            fontSize="sm"
            fontWeight="medium"
            transition="background 0.2s"
            _hover={{ bg: "blue.50" }}
          >
            <item.icon />
            <Text>{item.title}</Text>
          </Flex>
          {item.dividerAfter && <Divider my={2} />}
        </Box>
      ))}
    </VStack>
  );
}
