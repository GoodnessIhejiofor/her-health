import { Button, ButtonProps, Text, TextProps, Box, Flex } from "@chakra-ui/react";
import React from "react";
import FadeLoader from "react-spinners/FadeLoader";


export const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <Button bg="primary" color="#fff"
            fontFamily={'Inter, serif'}
            _hover={{ bg: 'primaryDark' }} {...props}>
            {children}
        </Button>
    );
};

export const CustomText = ({ fontFamily, fontWeight, ...props }: TextProps) => {
    return (
        <Text
            fontFamily={fontFamily || 'Inter, serif'}
            fontWeight={fontWeight ?? 400}
            {...props}
        />
    );
};

interface LoadingOverlayProps {
    loading: boolean;
    color?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading, color = "#683257" }) => {
    if (!loading) return null; // Don't render if not loading

    return (
        <Box
            position="absolute"
            top={0}
            left={0}
            width="100%" // Ensure it takes full width of the parent
            height="100%" // Ensure it takes full height of the parent
            bg="rgba(0, 0, 0, 0.1)" // Semi-transparent background
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="inherit" // Maintain border radius if present
            zIndex={10} // Ensure it's above the content but within the container
        >
            <FadeLoader color={color} aria-label="Loading Spinner" />
        </Box>
    );
};

export default LoadingOverlay;
