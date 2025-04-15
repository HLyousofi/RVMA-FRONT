import { Button } from "@mui/material";
import { useState } from "react";
import useGetProducts from "../services/ProductService";
import AutocompleteField from "./ui/AutocompleteField";
import InputField from "./ui/InpuField";
import { useFieldArray } from "react-hook-form";
import formatPrice, {calculateTTC} from "../utils/utility";
import DeleteIcon from '@mui/icons-material/Delete';

const QuoteOrderComponent = ({control, watch}) => {
  const [page, setPage] = useState({page : 1, pageSize : 'all'});
  const { data : products, isLoading : isLoadingProducts, isError : fetchProductsError } = useGetProducts(page);
  const { fields, append, remove } = useFieldArray({control,name: "rows"});
  
  const addRow = () => {
    append({ product: null, quantity: "", unitPrice: "", totalPrice: "" });
  };

  const watchedRows = watch("rows") || [];

  const getSubtotal = () => {
    return watchedRows.reduce((sum, row) => {
      const price = parseFloat(row?.unitPrice || 0);
      const quantity = parseInt(row?.quantity || 0);
      return sum + (price * quantity);
    }, 0).toFixed(2);
  };

  const getTaxAmount = (subtotal) => {
    const TAX_RATE = 0.20;
    return (subtotal * TAX_RATE).toFixed(2);
  };

  const subtotal = getSubtotal();
  const taxAmount = getTaxAmount(subtotal);
  const totalWithTax = formatPrice(calculateTTC(+subtotal));

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-2/5 px-6 py-3 rounded-s-lg">
              produit
            </th>
            <th scope="col" className="w-1/5 px-6 py-3">
              Quantite
            </th>
            <th scope="col" className="w-1/5 px-6 py-3">
              Prix Unitaire
            </th>
            <th scope="col" className="w-1/5 px-6 py-3">
              Total  
            </th>
            <th scope="col" className="w-[50px] px-6 py-3 rounded-e-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => {
            const unitPrice = watch(`rows.${index}.unitPrice`) || 0;
            const quantity = watch(`rows.${index}.quantity`) || 0;
            const rowTotal = (parseFloat(unitPrice) * parseInt(quantity)).toFixed(2);
            
            return (
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
                    rules={{
                      required: 'Quantity is required',
                      min: {
                        value: 0.1,
                        message: "Quantity must be positive",
                      },
                    }}
                  />
                </td>
                <td className="px-6 py-4">
                  <InputField 
                    name={`rows.${index}.unitPrice`}
                    label="Prix UT"
                    type="number"
                    defaultValue="0.00"
                    variant="standard"
                    control={control}
                    rules={{
                      required: 'price is required',
                      min: {
                        value: 0.1,
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
                  />
                </td>
                <td className="px-8 pt-4">
                  <button className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200" onClick={() => remove(index)}><DeleteIcon /></button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td className="col-2">
              <Button className="mt-4" onClick={addRow}>Ajouter un Product</Button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="font-semibold text-gray-900 dark:text-white">
            <td className="px-6 py-3" colSpan="2"></td>
            <td className="px-6 py-3 text-base text-right">Montant hors taxes:</td>
            <td className="px-6 py-3 text-base text-right">{formatPrice(subtotal)}</td>
          </tr>
          <tr className="font-semibold text-gray-900 dark:text-white">
            <td className="px-6 py-3" colSpan="2"></td>
            <td className="px-6 py-3 text-base text-right">TVA 20%:</td>
            <td className="px-6 py-3 text-base text-right border-b">{formatPrice(taxAmount)}</td>
          </tr>
          <tr className="font-semibold text-gray-900 dark:text-white">
            <td className="px-6 py-3" colSpan="2"></td>
            <td className="px-6 py-3 text-base text-right">Total :</td>
            <td className="px-6 py-3 text-base text-right">{totalWithTax}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default QuoteOrderComponent;