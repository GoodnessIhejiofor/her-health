import { Button, ButtonProps, Text, TextProps } from "@chakra-ui/react";
import React from "react";

export const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <Button bg="primary" color="#fff" _hover={{ bg: 'primaryDark' }} {...props}>
            {children}
        </Button>
    );
};

export const CustomText = ({ fontFamily, fontWeight, ...props }: TextProps) => {
    return (
        <Text
            fontFamily={fontFamily || 'Poppins, serif'}
            fontWeight={fontWeight ?? 400}
            {...props}
        />
    );
};