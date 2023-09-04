import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import axios from "axios";
import { Button, Input, background, useColorMode } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../services/api-client";

export interface LoginForm {
  user_name: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { toggleColorMode, colorMode } = useColorMode();
  const [accessToken, setAccessToken] = useState<string | null>("");

  // useEffect(() => {
  //   setAccessToken(localStorage.getItem("access"));
  // }, []);

  if (accessToken) return <Navigate to="/" />;

  const onSubmitForm = (data: LoginForm) => {
    console.log("data", data);

    axiosInstance.post("/jwt/create/", data).then((res) => {
      console.log(res);
      localStorage.clear();
      console.log("responce", res.data);

      

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setAccessToken(res.data.access);
    });

    // TokenService.getTokens<Token>(data).then((res) => {
    //   localStorage.clear();
    //   console.log('responce',res.data);

    //   localStorage.setItem("access", res.data.access);
    //   localStorage.setItem("refresh", res.data.refresh);
    //   setAccessToken(res.data.access);
    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="mb-3 h-75">
        <Input
          {...register("user_name")}
          borderColor="#ea6262"
          type="text"
          placeholder="Username"
          borderRadius={15}
          bg="whiteAlpha.800"
          height="7vh"
        />
      </div>
      <div className="mb-3 h-75">
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
          borderColor="#ea6262"
          borderRadius={15}
          bg="whiteAlpha.800"
          height="7vh"
        />
      </div>

      <Button
        textColor="whiteAlpha.700"
        type="submit"
        bg="#dd0939"
        padding={15}
        height="8vh"
        width="100%"
        borderRadius={15}
        _hover={{ bg: "whiteAlpha.400" }}
      >
        SIGN IN
      </Button>
    </form>
  );
};

export default Login;
