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
import sendTyreService, {
  SendTyre,
} from "../../../../services/Rebuild/send-tyre-service";
import SendTyreContext from "../../../../Contexts/Rebuild/SendTyreContext";
import SupplierFilter from "../../../../Registration/Supplier/SupplierFilter";
import SupplierContext from "../../../../Contexts/Registration/SupplierContext";
import AllSupplierContext from "../../../../Contexts/Registration/AllSupplierContext";
import AddSendTyreForm from "../Add/AddSendTyreForm";
import AddSendSupplierTyres from "../Add/AddSendSupplierTyres";

interface Props {
  selectedSendTyre: SendTyre;
}

const SendTyreUpdate = ({ selectedSendTyre }: Props) => {
  const { register, handleSubmit, control } = useForm<SendTyre>();
  const [errorSendTyreUpdate, setErrorSendTyreUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { colorMode } = useColorMode();

  const { sendTyres, setSendTyres } = useContext(SendTyreContext);
  const { allSuppliers } = useContext(AllSupplierContext);

  const onUpdate = (data: SendTyre) => {
    console.log(data, "submited update");

    sendTyreService
      .update(data, `${selectedSendTyre.order_no}`)
      .then((res) => {
        setSuccess(res.status === 200 ? "Updated Successfully" : "");
        console.log(res.data, "updated data");

        setSendTyres(
          sendTyres.map((sendTyre) =>
            sendTyre.order_no === selectedSendTyre.order_no
              ? res.data
              : sendTyre
          )
        );
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
              {...register("order_no")}
              type="text"
              defaultValue={selectedSendTyre.order_no}
            />
          </div>
          <div className="mb-3 w-50">
            <Select {...register("supplier")}>
              <option value={selectedSendTyre.supplier}>
                {
                  allSuppliers.find(
                    (sup) => sup.id === selectedSendTyre.supplier
                  )?.name
                }
              </option>
              {allSuppliers.map((supplier) => (
                <option value={supplier.id}>{supplier.name}</option>
              ))}
            </Select>
          </div>

          <div className="mb-3 w-100">
            <AddSendSupplierTyres
              register={register}
              control={control}
              sendTyreArrays={selectedSendTyre.send_tyres}
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

export default SendTyreUpdate;
