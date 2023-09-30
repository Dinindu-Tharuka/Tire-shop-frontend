import {
  Button,
  useColorMode,
  Text,
  Select,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import sendTyreService, {
  SendTyre,
} from "../../../../services/Rebuild/send-tyre-service";
import SendTyreContext from "../../../../Contexts/Rebuild/SendTyreContext";
import SupplierContext from "../../../../Contexts/Registration/SupplierContext";
import AddSendSupplierTyres from "./AddSendSupplierTyres";
import SupplierFilter from "../../../../Registration/Supplier/SupplierFilter";
import { Supplier } from "../../../../services/Registration/supplier-service";
import AllSendSupplierTyresContext from "../../../../Contexts/Rebuild/AllSendSupplierContext";

const AddSendTyreForm = () => {
  const { register, handleSubmit, control } = useForm<SendTyre>();
  const [seletedSuplier, setSelectedSuppier] = useState<Supplier>();

  const [errorSendTyreCreate, setErrorSendTyreCreate] = useState("");
  const [success, setSuccess] = useState("");
  const { colorMode } = useColorMode();

  const { sendTyres, setSendTyres } = useContext(SendTyreContext);
  const { setAllSendSupplierTyres, allSendSupplierTyres } = useContext(
    AllSendSupplierTyresContext
  );

  const onCreate = (data: SendTyre) => {
    const newly = { ...data, supplier: seletedSuplier?.id };
    console.log(newly, "create");
    const originalTakenTyres = [...sendTyres];

    sendTyreService
      .create(newly)
      .then((res) => {
        setSuccess("Succefully created.");
        console.log(res.data, "response");

        setSendTyres([res.data, ...sendTyres]);
        setAllSendSupplierTyres([
          ...allSendSupplierTyres,
          ...res.data.send_tyres,
        ]);
      })
      .catch((err) => {
        setErrorSendTyreCreate("Not Succefully created.");
        setSendTyres([...originalTakenTyres]);
      });
  };
  return (
    <>
      {errorSendTyreCreate && (
        <Text textColor="#dd0939">{errorSendTyreCreate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onCreate)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 w-50">
            <Input {...register("order_no")} placeholder="Order No" />
          </div>

          <div className="mb-3 w-50">
            <SupplierFilter
              selectedSupplier={(supplier) => setSelectedSuppier(supplier)}
            />
          </div>
          <div className="mb-3 w-100">
            <AddSendSupplierTyres register={register} control={control} />
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorSendTyreCreate("");
              setSuccess("");
            }}
          >
            Create
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default AddSendTyreForm;
