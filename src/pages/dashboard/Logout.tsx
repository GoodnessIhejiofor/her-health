import { useEffect } from "react";
import { CustomText } from "../../components/common/common";
import { Spinner } from "@chakra-ui/react";

export default function Logout() {
    useEffect(() => {
        if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
            window.localStorage.removeItem("accessToken");
            setTimeout(() => window.location.assign("/"), 1500)
        }
    })

    return <CustomText><Spinner size={"sm"}/> Signing you out...</CustomText>
}