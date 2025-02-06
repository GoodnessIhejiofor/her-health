import { Box } from "@chakra-ui/react";
import { AuthForm } from "../components/pages/auth";
import { useState } from "react";
import LoadingOverlay from "../components/common/common";


export default function Auth() {
    let [loading, setLoading] = useState(true);
    return (
        <Box py={12} maxW={"1200px"} m={"auto"}>
            {/* <LoadingOverlay loading={loading} /> */}
            <AuthForm />
        </Box>
    )
}