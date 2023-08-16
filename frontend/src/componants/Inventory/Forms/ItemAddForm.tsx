import { Button, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from 'react-hook-form'
import apiClient from "../../../services/api-client";

interface Props{
  onClose:()=>void;
}

const ItemAddForm = ({onClose}:Props) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const onSubmit = (data:FieldValues)=>{
    console.log(data);
    
    apiClient
      .post('/items/', data)
      .catch(err =>{
        if (err.message !== 'canceled'){
          setError(err.message)
        }
      })
    
  }
 
  
  
  return (
    <>
      
      <form onSubmit={handleSubmit(onSubmit)} 
        className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">            
            <input { ...register('item_id')} id="id" type="text" className="form-control" placeholder="Item ID" />
          </div>
          <div className="mb-3">
            <input { ...register('name')} type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="mb-3">
            <input { ...register('size')} type="text" className="form-control" placeholder="Size" />
          </div>
          <div className="mb-3">
            <input { ...register('brand')} type="text" className="form-control" placeholder="Brand" />
          </div>
          <div className="mb-3">
            <input { ...register('type')} type="text" className="form-control" placeholder="Type" />
          </div>
          <div className="mb-3">
            <input { ...register('plyrating')} type="text" className="form-control" placeholder="Plyrating" />
          </div>
          <div className="mb-3">
            <input { ...register('country')} type="text" className="form-control" placeholder="Country" />
          </div>
          <div className="mb-3">
            <select { ...register('vale_type')} className="select w-100 p-2"> 
              <option value="Not selected">Valve Type</option>
              <option value="Long Valve">Long Valve</option>
              <option value="Short Valve">Short Valve</option>
            </select>
          </div>
          <div className="mb-3">
            <select { ...register('item_category')} className="select w-100 p-2"> 
              <option value="Not selected">Select Category</option>
              <option value="1">Two</option>
              <option value="2">Three</option>
            </select>
          </div>
          <div className="mb-3">
            <select { ...register('supplier')} className="select w-100 p-2"> 
              <option value="Not selected">Select Supplier</option>
              <option value="1">Two</option>
              <option value="2">Three</option>
            </select>
          </div>
        </div>
        <HStack justifyContent='space-between'>
          <button onClick={()=>{
            

          }} className="btn btn-primary align-self-end btn-lg" type="submit">
            Save
          </button>          
        </HStack>
        

        
      </form>
    </>
  );
};

export default ItemAddForm;
