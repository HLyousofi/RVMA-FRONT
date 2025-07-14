import { Button } from "@mui/material";
import { useState } from "react";
import InputField from "./ui/InpuField";
import { useFieldArray } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';

const ContactsTable = ({control}) => {
  const { fields, append, remove } = useFieldArray({control,name: "contacts"});

  
  const addRow = () => {
    append({ lastName: "", firstName: "", jobTitle: "", phoneNumber: "", email: "", address: "" });
  };


  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-28 px-2 py-2 rounded-s-lg">
              Nom
            </th>
            <th scope="col" className="w-28 px-2 py-2">
              Prenom
            </th>
            <th scope="col" className="w-28 px-2 py-2">
                Fonction   
            </th>
            <th scope="col" className="w-36 px-2 py-2">
            Téléphone  
            </th>
            <th scope="col" className="w-64 px-2 py-2">
              Email  
            </th>
            <th scope="col" className="w-2/14 px-2 py-2">
                Adresse   
            </th>
            <th scope="col" className="w-[50px] px-2 py-2 rounded-e-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => {
           
            
            return (
              <tr className="bg-white dark:bg-gray-800" key={field.id}>
                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <InputField 
                    label="Nom"
                    name={`contacts.${index}.lastName`}
                    type="text"
                    variant="standard"
                    control={control}
                    rules={{
                      required: 'lastName is required',
                    }}
                  />
                </th>
                <td className="px-2 py-4 text-right">
                  <InputField 
                    label="Prenom"
                    name={`contacts.${index}.firstName`}
                    type="text"
                    variant="standard"
                    control={control}
                    rules={{
                      required: 'firstName is required',
                      min: {
                        value: 0.1,
                        message: "Quantity must be positive",
                      },
                    }}
                  />
                </td>
                <td className="px-2 py-4">
                  <InputField 
                    name={`contacts.${index}.jobTitle`}
                    label="Fonction"
                    type="text"
                    variant="standard"
                    control={control}
                    rules={{
                      required: 'price is required',
                    }}
                  />
                </td>
                <td className="px-2 py-4">
                  <InputField 
                    name={`contacts.${index}.phoneNumber`}
                    label="téléphone"
                    type="text"
                    variant="standard"
                    control={control}
                    rules={{
                      required: 'price is required',
                    }}
                  />
                </td>
                <td className="px-2 py-4">
                  <InputField 
                    name={`contacts.${index}.email`}
                    label="Email"
                    type="text"
                    variant="standard"
                    control={control}
                  />
                </td>
                <td className="px-2 py-4 font-semibold text-gray-900 dark:text-white">
                  <InputField 
                    name={`contacts.${index}.address`}
                    label="Adresse"
                    type="text"
                    // value={rowTotal}
                    variant="standard"
                    control={control}
                  />
                </td>
                <td className="px-8 pt-4">
                  <button className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200" onClick={() => remove(index)}><DeleteIcon /></button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td className="col-2" colSpan={4}>
              <Button className="mt-4" onClick={addRow}>Ajouter un Contact</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ContactsTable;