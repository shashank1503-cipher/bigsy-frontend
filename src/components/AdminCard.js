import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
export default function AdminCard(props) {
  let navigate = useNavigate()
  return (
    <Center p={6} onClick={()=>{navigate(props.url)}}>
      <Box
      transition={'all 0.2s ease-in-out'}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        minW={'250px'}
        _hover={{ transform: "scale(1.05)" }}
        cursor={"pointer"}
      >
        <Stack
          textAlign={"center"}
          p={8}
          // color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text color={""} fontSize={"8xl"}>
            {props.icon && <Icon as={props.icon} />}
          </Text>
          <Text>{props.title}</Text>
        </Stack>
      </Box>
    </Center>
  );
}
