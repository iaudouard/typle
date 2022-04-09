import { Center, Input, Text, Flex, Box } from "@chakra-ui/react";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { getDate } from "../helpers/get-date";
import { getLS, setLS } from "../helpers/local-storage";

type Props = {
  textToType: string;
  hasCompleted: boolean;
  setHasCompleted: React.Dispatch<SetStateAction<boolean>>;
};

export default function Test({
  textToType,
  hasCompleted,
  setHasCompleted,
}: Props) {
  const [input, setInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(true);

  const [startTime, setStartTime] = useState<number | null>(null);

  const [wpm, setWpm] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput("");
  }, [textToType]);

  useEffect(() => {
    if (hasCompleted) {
      var pastTests = JSON.parse(getLS("pastTests")!);
      setWpm(Math.round(pastTests[pastTests.length - 1].wpm));
    }
  }, []);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    let tempInput = e.target.value;
    setInput(tempInput);

    if (tempInput === textToType && !hasCompleted) {
      setHasCompleted(true);

      const time = Date.now() - startTime!;
      const tempWpm = textToType.length / 5 / (time / 60000);
      const testData = {
        testLength: textToType.length,
        time: time,
        wpm: tempWpm,
        date: getDate(),
      };

      setLS("pastTests", [...JSON.parse(getLS("pastTests")!), testData]);

      setWpm(tempWpm);
    }
  };

  if (hasCompleted) {
    return (
      <Center>
        <Text color="white" fontSize="2xl" fontWeight="bold">
          <Box as="span" fontSize="8xl">
            {Math.round(wpm!)}
          </Box>{" "}
          wpm
        </Text>
      </Center>
    );
  }

  return (
    <Center w="70%">
      <Input
        tabIndex={0}
        position="absolute"
        color="transparent"
        variant="unstyled"
        w="auto"
        onChange={(e) => handleInputChange(e)}
        spellCheck={false}
        autoFocus
        onBlur={() => {
          setIsFocused(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        userSelect="none"
        opacity="0"
        id="test-input"
        onPaste={(e) => {
          e.preventDefault();
        }}
        ref={inputRef}
        autoCapitalize="off"
        autoComplete="off"
      />
      <Flex
        onClick={handleFocus}
        userSelect="none"
        zIndex="999"
        wordBreak="break-word"
        filter={isFocused ? "auto" : "blur(4px)"}
        textAlign="center"
        transition="0.4s"
      >
        <Text fontWeight="bold" fontSize="2rem">
          {textToType.split("").map((char, index) => {
            return (
              <Box
                key={index}
                as="span"
                color={
                  input.charAt(index)
                    ? input.charAt(index) === char
                      ? "white"
                      : "red"
                    : "grey"
                }
                transition="0.3s"
              >
                {char}
              </Box>
            );
          })}
        </Text>
      </Flex>
    </Center>
  );
}
