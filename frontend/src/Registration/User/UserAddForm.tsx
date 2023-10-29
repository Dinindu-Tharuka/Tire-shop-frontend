import {
  Button,
  HStack,
  Input,
  Text,
  useColorMode,
  Select,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import UserContext from "../../Contexts/User/UserContext";
import axiosInstance from "../../services/api-client";

const UserAddForm = () => {
  const { register, handleSubmit } = useForm();

  const [errorUserCreate, setErrorUserCreate] = useState("");
  const [success, setSuccess] = useState("");
  const { colorMode } = useColorMode();
  const [value, setValue] = useState("1");

  const { users, setUsers } = useContext(UserContext);

  const onSubmit = (data: FieldValues) => {
    const newly = { ...data, is_manager: value === "1" ? false : true , is_staff:true};

    axiosInstance
      .post('/users/',newly)
      .then((res) => {
        if (res.status === 201) {
          setSuccess("Successfully Created.");
          setUsers([res.data, ...users]);
          console.log(res.data)
        }
      })
      .catch((err) => setErrorUserCreate("Not Successfully Created."));
  };
  return (
    <>
      {errorUserCreate && <Text textColor="#dd0939">{errorUserCreate}</Text>}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <Input
              {...register("user_name")}
              type="text"
              placeholder="User Name"
            />
          </div>

          <div className="mb-3 h-75">
            <Input {...register("email")} type="email" placeholder="Email" />
          </div>
          
          <div className="mb-3 h-75">
            <RadioGroup value={value} onChange={setValue}>
              <Stack direction="row">
                <Radio value="1">Cashier</Radio>
                <Radio value="2">Manager</Radio>
              </Stack>
            </RadioGroup>
          </div>
          <div className="mb-3 h-75">
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="mb-3 h-75">
            <Input
              {...register("re_password")}
              type="password"
              placeholder="Confirmation Password"
            />
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorUserCreate("");
              setSuccess("");
            }}
          >
            Save
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default UserAddForm;
