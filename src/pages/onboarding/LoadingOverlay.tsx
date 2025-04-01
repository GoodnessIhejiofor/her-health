import type React from "react"
import { Flex, Progress } from "@chakra-ui/react"
import { CustomText } from "../../components/common/common"

interface LoadingOverlayProps {
  loading: boolean
  message?: string
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading, message = "Saving your information..." }) => {
  if (!loading) return null

  return (
    <Flex
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="rgba(255, 255, 255, 0.8)"
      zIndex="10"
      justify="center"
      align="center"
      borderRadius="md"
      flexDirection="column"
    >
      <Progress size="xs" isIndeterminate width="50%" colorScheme="primary" mb={4} />
      <CustomText>{message}</CustomText>
    </Flex>
  )
}

