import { Button } from "@mui/material";
import { useState } from "react";
import useGetProducts from "../services/ProductService";
import AutocompleteField from "./ui/AutocompleteField";
import InputField from "./ui/InpuField";
import { useFieldArray } from "react-hook-form";

 const QuoteOrderComponent = ({control, watch}) => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState({page : 1, pageSize : 'all'});


  const { data : products, isLoading : isLoadingProducts, isError : fetchProductsError } = useGetProducts(page);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });


  const addRow = () => {
    append({ product: null, quantity: "", unitPrice: "", totalPrice: "" });
  };

 

// Watch all rows from the form
const watchedRows = watch("rows") || [];

// Calculate totals using watched form values
const getSubtotal = () => {
  return watchedRows.reduce((sum, row) => {
    const price = parseFloat(row?.unitPrice || 0);
    const quantity = parseInt(row?.quantity || 0);
    return sum + (price * quantity);
  }, 0).toFixed(2);
};

  const getTaxAmount = (subtotal) => {
    const TAX_RATE = 0.20; // 20% tax rate
    return (subtotal * TAX_RATE).toFixed(2);
  };

  const getTotalWithTax = (subtotal, tax) => {
    return (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
  };

  const subtotal = getSubtotal();
  const taxAmount = getTaxAmount(subtotal);
  const totalWithTax = getTotalWithTax(subtotal, taxAmount);

  return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className=" w-2/5 px-6 py-3 rounded-s-lg">
                            produit
                        </th>
                        <th scope="col" className="w-1/5 px-6 py-3">
                            Qty
                        </th>
                        <th scope="col" className="w-1/5 px-6 py-3 ">
                            Price Unit
                        </th>
                        <th scope="col" className="w-1/5 px-6 py-3 rounded-e-lg">
                            Total Price 
                        </th>
                    </tr>
                </thead>
                <tbody>
                {fields.map((field, index) => {
                  // Watch individual row values
                    const unitPrice = watch(`rows.${index}.unitPrice`) || 0;
                    const quantity = watch(`rows.${index}.quantity`) || 0;
                    const rowTotal = (parseFloat(unitPrice) * parseInt(quantity)).toFixed(2);
                  return(
                    <tr className="bg-white dark:bg-gray-800" key={field.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <AutocompleteField 
                              name={`rows.${index}.product`}
                              options={products?.data}
                              control={control}
                              isLoading={isLoadingProducts.toString()} 
                              label="Produit"
                              variant="standard"
                              rules={{required: 'Product is required'}}
                             />
                        </th>
                        <td className="px-6 py-4 text-right">
                        <InputField 
                                  label="Quantite"
                                  name={`rows.${index}.quantity`}
                                  type="number"
                                  variant="standard"
                                  control={control}
                                  rules={{required: 'Quantity is required',
                                            min: {
                                              value: 0.1, // Ensures price is greater than 0
                                              message: "Price must be positive",
                                            },
                                  }}
                          />
                        </td>
                        <td className="px-6 py-4">
                        <InputField 
                                name={`rows.${index}.unitPrice`}
                                label="Prix UT"
                                type="number"
                                variant="standard"
                                control={control}
                                rules={{ required: 'price is required',
                                              min: {
                                                value: 0.1, // Ensures price is greater than 0
                                                message: "Price must be positive",
                                              },
                                }}
                        />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <InputField 
                                name={`rows.${index}.totalPrice`}
                                label="Total Price"
                                type="number"
                                value={rowTotal}
                                disabled
                                variant="standard"
                                control={control}
                                // rules={{ required: 'price is required',
                                //               min: {
                                //                 value: 0.1, // Ensures price is greater than 0
                                //                 message: "Price must be positive",
                                //               },
                                // }}
                        />
                        </td>
                    </tr>
                  )})}
                  <tr>
                    <td className="col-2">
                      <Button className="mt-4" onClick={addRow}>Add Product</Button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="font-semibold  text-gray-900 dark:text-white">
                    <td className="px-6 py-3" colSpan="2"></td>
                    <td className="px-6 py-3 text-base text-right">Montant hors taxes:</td>
                    <td className="px-6 py-3 text-base text-right">{subtotal}</td>
                  </tr>
                  <tr className="font-semibold text-gray-900 dark:text-white">
                  <td className="px-6 py-3" colSpan="2"></td>
                  <td className="px-6 py-3 text-base text-right">TVA 20%:</td>
                  <td className="px-6 py-3 text-base text-right border-b">{taxAmount}</td>
                  </tr>
                  <tr className="font-semibold text-gray-900 dark:text-white">
                    <td className="px-6 py-3" colSpan="2"></td>
                    <td className="px-6 py-3 text-base text-right">Total :</td>
                    <td className="px-6 py-3 text-base text-right ">{totalWithTax}</td>
                  </tr>
                </tfoot>
            </table>
        </div>
  );
}
export default QuoteOrderComponent;
