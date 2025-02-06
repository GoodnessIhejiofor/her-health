import { Box } from "@chakra-ui/react";
import { AuthForm } from "../components/pages/auth";
import { useState } from "react";


export default function Auth() {
    return (
        <Box maxW={{base: "full", md: '1200px'}} m={"auto"}>
            <AuthForm />
        </Box>
    )
}