import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import axios from "axios";
import { Button, Input, useColorMode } from "@chakra-ui/react";
import createTokens from "../services/http-service-token";
import TokenService, { Token } from "../services/Authentication/token-service";
import { Navigate } from "react-router-dom";

export interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();  
  const { toggleColorMode, colorMode } = useColorMode();
  const [accessToken, setAccessToken] = useState<string | null>('')

  useEffect(()=>{
    setAccessToken(localStorage.getItem('access'))

  },[])


  if (accessToken)
    return <Navigate to='/'/>

  const onSubmitForm = (data: LoginForm)=>{
 

   TokenService
        .getTokens<Token>(data)
        .then(res => {
            console.log(res.data)
            localStorage.clear()
            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)
            setAccessToken(res.data.access)
            
        }
        )
    
    
        
  } 



  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="mb-3 h-75">
        <Input {...register("username")} type="text" placeholder="Username" />
      </div>
      <div className="mb-3 h-75">
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
      </div>

      <Button type="submit" bg={colorMode === "light" ? "#e3a99c" : "#575757"}>
        Login
      </Button>
    </form>
  );
};

export default Login;
