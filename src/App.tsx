import {
  Button,
  Card,
  HStack,
  IconButton,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Provider } from "./components/ui/provider";
import { IoVolumeHigh, IoCopy, IoShareSocial } from "react-icons/io5";
import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import QUOTES from "./en.json";
import { copy } from "./copy";
import { sayQuote } from "./speak";

function App() {
  const [randomBetween0And364, setRandomBetween0And364] = useState<number>(
    Math.floor(Math.random() * 365)
  );

  const quote = useMemo(
    () => QUOTES[randomBetween0And364],
    [randomBetween0And364]
  );

  const componentRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (componentRef.current) {
      try {
        const dataUrl = await toPng(componentRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "quote.png";
        link.click();
      } catch (err) {
        console.error("Failed to generate image:", err);
      }
    }
  };

  return (
    <Provider>
      <Stack
        h="vh"
        w={"vw"}
        bg={"blue.500"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Card.Root
          ref={componentRef}
          minW={"25vw"}
          maxW={"500px"}
          variant={"elevated"}
          bg={"white"}
          color={"blackAlpha.800"}
          fontFamily={"sans-serif"}
          borderRadius={"1.5vw"}
        >
          <Card.Header>
            <Card.Title textAlign={"center"}>
              <Text fontWeight={"bold"} textStyle="3xl">
                Quote of the Day{" "}
              </Text>
            </Card.Title>
          </Card.Header>
          <Card.Body mt={5}>
            <HStack gap={1}>
              <Text
                fontWeight={"bold"}
                textStyle="3xl"
                h={"100%"}
                alignItems={"flex-start"}
                display={"flex"}
              >
                &ldquo;
              </Text>
              <Text textStyle="lg">{quote.phrase}</Text>
              <Text
                fontWeight={"bold"}
                textStyle="3xl"
                h={"100%"}
                alignItems={"flex-end"}
                display={"flex"}
              >
                &rdquo;
              </Text>
            </HStack>

            <Text fontStyle={"italic"} textStyle="sm" textAlign={"right"}>
              — {quote.author}
            </Text>
          </Card.Body>
          <Card.Footer>
            <VStack w={"100%"} alignItems={"flex-start"}>
              <Separator size="xs" w={"100%"} borderColor={"gray"} />

              <HStack mt={5} justifyContent={"space-between"} w={"100%"}>
                <HStack>
                  <IconButton
                    onClick={() => {
                      sayQuote(quote.phrase);
                      sayQuote(quote.author);
                    }}
                    borderColor={"blue.500"}
                    colorPalette={"blue.500"}
                    variant={"solid"}
                    rounded={"full"}
                  >
                    <IoVolumeHigh color={"#3b82f6"} />
                  </IconButton>

                  <IconButton
                    onClick={() => copy(quote.phrase + "\n — " + quote.author)}
                    borderColor={"blue.500"}
                    colorPalette={"blue.500"}
                    variant={"solid"}
                    rounded={"full"}
                  >
                    <IoCopy color={"#3b82f6"} />
                  </IconButton>

                  <IconButton
                    onClick={() => downloadImage()}
                    borderColor={"blue.500"}
                    colorPalette={"blue.500"}
                    variant={"solid"}
                    rounded={"full"}
                  >
                    <IoShareSocial color={"#3b82f6"} />
                  </IconButton>
                </HStack>
                <Stack>
                  <Button
                    colorPalette="blue"
                    variant="solid"
                    rounded={"2xl"}
                    onClick={() =>
                      setRandomBetween0And364(Math.floor(Math.random() * 365))
                    }
                  >
                    New Quote
                  </Button>
                </Stack>
              </HStack>
            </VStack>
          </Card.Footer>
        </Card.Root>

        <Text fontWeight={"bold"} textStyle="md" textAlign={"center"} mt={1}>
          &copy; 2024 Vitoria Moreira.
          <br />
          All rights reserved!
        </Text>
      </Stack>
    </Provider>
  );
}

export default App;
