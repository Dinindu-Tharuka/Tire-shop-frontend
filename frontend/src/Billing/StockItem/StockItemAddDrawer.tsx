import {
  Button,
  HStack,
  Input,
  Select,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import StockItemService,{ StockItem } from "../../services/Stock/stock-item-service";


const StockItemAddDrawer = () => {

  const { register, handleSubmit } = useForm<StockItem>();
  const [errorItemCreate, setErrorItemCreate] = useState("");
  const [success, setSuccess] = useState("");

  const { toggleColorMode, colorMode } = useColorMode();

  const { stockItems, setStockItems } = useContext(StockItemContext);

  const onSubmit = (data: StockItem) => {
    console.log('Item', data);

    
    
    StockItemService.create(data)
      .then((res) => {
        if (res.status === 201) {
          setSuccess("Successfully Created.");
          setStockItems([res.data, ...stockItems]);
        }
      })
      .catch((err) => {
        setErrorItemCreate(err.message);
      });
  };
  return (
    <>
      {errorItemCreate && <Text textColor="#dd0939">{errorItemCreate}</Text>}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form color="red" onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <Input
              type="text"
              placeholder="Item ID"
              {...register("item")}
            ></Input>
          </div>
          <div className="mb-3">
            <Input type="text" placeholder="Name" {...register("retail_price")}></Input>
          </div>
          <div className="mb-3">
            <Input type="text" placeholder="Size" {...register("cost")}></Input>
          </div>
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Brand"
              {...register("selling_price")}
            ></Input>
          </div>
          <div className="mb-3">
            <Input type="text" placeholder="Type" {...register("discount")}></Input>
          </div>
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Plyrating"
              {...register("qty")}
            ></Input>
          </div>
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Country"
              {...register("sold_qty")}
            ></Input>
          </div>      
          
        </div>
        <HStack justifyContent="space-between">
          <Button
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            type="submit"
            onClick={() => {
              setErrorItemCreate("");
              setSuccess("");
            }}
          >
            Add
          </Button>
        </HStack>
      </form>
    </>
  )
}

export default StockItemAddDrawer