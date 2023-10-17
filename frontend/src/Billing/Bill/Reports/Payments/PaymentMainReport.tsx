import React, { useEffect, useRef, useState } from "react";
import CashReport from "./Cash/CashReport";
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  VStack,
  Text,
} from "@chakra-ui/react";
import ChequeReport from "./Cheque/ChequeReport";
import CreditCardReport from "./CreditCard/CreditCardReport";
import { BsPrinter } from "react-icons/bs";
import DownloadPdf from "../../../../PDF/DownloadPdf";

const PaymentMainReport = () => {
  const [currentValue, setCurrentValue] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  // For downloading pdf
  const [capture, setCapture] = useState<HTMLDivElement | null>(null);
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setCapture(pdfRef.current);
  }, []);

  return (
    <>
      <VStack>
        <HStack>
          <RadioGroup defaultValue="1" marginRight={5}>
            <Stack spacing={5} direction="row">
              <Radio
                colorScheme="orange"
                value="1"
                onChange={(e) => setCurrentValue(e.currentTarget.value)}
              >
                Cash
              </Radio>
              <Radio
                colorScheme="orange"
                value="2"
                onChange={(e) => setCurrentValue(e.currentTarget.value)}
              >
                Cheque
              </Radio>
              <Radio
                colorScheme="orange"
                value="3"
                onChange={(e) => setCurrentValue(e.currentTarget.value)}
              >
                Credit Card
              </Radio>
            </Stack>
          </RadioGroup>
          <Tooltip label="Download Payment Report">
            <Button onClick={() => DownloadPdf(capture, setLoader)} width="200px" bg="#e3a99c">
              <Text marginEnd={5} marginTop={3}>
                Payment Report
              </Text>{" "}
              <Text marginTop={3}>
                <BsPrinter />
              </Text>
            </Button>
          </Tooltip>
        </HStack>
        <HStack width="58vw">
          <InputGroup>
            <InputLeftAddon children="Start" />
            <Input
              type="date"
              width="20vw"
              onChange={(e) => setStartDate(e.currentTarget.value)}
              defaultValue={currentDate}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="End" />
            <Input
              type="date"
              width="20vw"
              onChange={(e) => setEndDate(e.currentTarget.value)}
            />
          </InputGroup>
        </HStack>
        <div ref={pdfRef}>
          {currentValue === "1" && (
            <CashReport startDate={startDate} endDate={endDate} />
          )}
          {currentValue === "2" && (
            <ChequeReport startDate={startDate} endDate={endDate} />
          )}
          {currentValue === "3" && (
            <CreditCardReport startDate={startDate} endDate={endDate} />
          )}
        </div>
      </VStack>
    </>
  );
};

export default PaymentMainReport;
