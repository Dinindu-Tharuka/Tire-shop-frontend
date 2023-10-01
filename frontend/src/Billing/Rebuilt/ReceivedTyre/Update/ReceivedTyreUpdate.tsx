import {
  Button,
  HStack,
  Input,
  Select,
  Table,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import receivedTyreService, {
  ReceivedTyre,
} from "../../../../services/Rebuild/Received/received-tyre-service";
import AllReceivedTyresContext from "../../../../Contexts/Rebuild/Received/AllReceivedtyreContext";

import AddSupplierReceivedTyres from "../Add/AddSupplierReceivedTyres";
import AllReceivedSupplierTyresContext from "../../../../Contexts/Rebuild/Received/AllReceivedSupplierTyre";
import ReceivedTyreContext from "../../../../Contexts/Rebuild/Received/ReceivedTyreContex";

interface Props {
  selectedReceivedTyre: ReceivedTyre;
}

const ReceivedTyreUpdate = ({ selectedReceivedTyre }: Props) => {
  const { register, handleSubmit, control } = useForm<ReceivedTyre>();
  const [errorSendTyreUpdate, setErrorSendTyreUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { colorMode } = useColorMode();

  const { allReceivedTyres, setAllReceivedTyres } = useContext(
    AllReceivedTyresContext
  );
  const { receivedTyres, setReceivedTyres } = useContext(ReceivedTyreContext);
  const { allReceivedSupplierTyres, setAllReceivedSupplierTyres } = useContext(
    AllReceivedSupplierTyresContext
  );

  const onUpdate = (data: ReceivedTyre) => {
    console.log(data, "submited update");

    receivedTyreService
      .update(data, `${selectedReceivedTyre.invoice_no}`)
      .then((res) => {
        setSuccess(res.status === 200 ? "Updated Successfully" : "");
        console.log(res.data, "updated data");

       
        setReceivedTyres(
          allReceivedTyres.map((receivedTyre) =>
            receivedTyre.invoice_no === selectedReceivedTyre.invoice_no
              ? res.data
              : receivedTyre
          )
        );

        setAllReceivedSupplierTyres([
          ...allReceivedSupplierTyres,
          ...res.data.received_tyres,
        ]);
      })
      .catch((err) => setErrorSendTyreUpdate(err.message));
  };
  return (
    <>
      {errorSendTyreUpdate && (
        <Text textColor="#dd0939">{errorSendTyreUpdate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onUpdate)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 w-50">
            <Input
              {...register("invoice_no")}
              type="text"
              defaultValue={selectedReceivedTyre.invoice_no}
            />
          </div>

          <div className="mb-3 w-100">
            <AddSupplierReceivedTyres
              register={register}
              control={control}
              sendTyreArrays={selectedReceivedTyre.received_tyres}
            />
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorSendTyreUpdate("");
              setSuccess("");
            }}
          >
            Update
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default ReceivedTyreUpdate;
