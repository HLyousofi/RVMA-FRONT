import { useState } from 'react';
import { usePostQuote, useUpdateQuote, useGetQuote, downloadQuotePDF } from '../../services/QuoteService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CircularIndeterminate from '../../components/ui/CircularIndeterminate';
import DynamicDataTable from '../../components/ui/DynamicDataTable';
import StatusWorkflow from '../../components/ui/StatusWorkflow';
import useAlert from '../../hooks/useAlert';
import { useQuery, useQueryClient  } from "react-query";
import QuoteStatusButton from "../../components/ui/QuoteStatusButton"





const ShowQuote = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();
  const {mutateAsync : updateQuote} = useUpdateQuote();
  const {id} = useParams();
  const queryClient = useQueryClient();
  const {setAlert} = useAlert();
  const { data : quoteData,isLoading : isLoadingWorkorder, isError : isErrorWorkorder } = useGetQuote({id});
  // const [status, setStatus] = useState(quoteData.data.status);




  // Fonction pour télécharger le PDF depuis le backend
  const downloadQuote = async () => {
    try{
      downloadQuotePDF(id);
    }catch(error){
      console.error(error.message);

  }
  };

  const quoteColumns = [
    { key: 'name', label: 'Nom du produit' },
    { key: 'quantity', label: 'Quantité' },
    { key: 'unitPrice', label: 'Prix unitaire', render: (value) => `${value} MAD` },
    { key: 'total', label: 'Total', render: (value) => `${value} MAD` }
  ];

  // Gestion du workflow avec appel API
  const handleStatusChange = async (newStatus) => {
    const qouteData = {status : newStatus};
    try{
                await updateQuote({id, qouteData},{
                                                    onSuccess : async (res) => {
                                                          newStatus === 'converted' ? navigate(`/orders/${res?.data?.id}/show`) : queryClient.invalidateQueries(['quotes', id ]); 
                                                        setAlert({
                                                                    active  : true, 
                                                                    type    : "success", 
                                                                    message : 'Devis Modifier avec Succes !'
                                                                });
                                                    },onError : async (error) => {
                                                        setAlert({
                                                                    active  : true, 
                                                                    type    : "error", 
                                                                    message : error.response?.data?.message
                                                                });
                        }
                    }
        );
                }catch(error){
                setAlert({
                            active : true, 
                            type : "error", 
                            message : error.response?.data?.message
                        });
                }
    
  };
  if(isLoadingWorkorder){
    return <CircularIndeterminate />
}
else if(isErrorWorkorder)  {
    return <p>Error fetching data</p>;
}
 // Render the main content with the DataGrid
else return (

  <section>
  <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 w-full mb-6 rounded-xl shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.21)]">
    {/* En-tête avec numéro de devis et informations client */}
    <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="relative flex justify-between w-full px-4 max-w-full flex-grow flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-2xl text-blueGray-700 dark:text-white px-2 py-2">
              {quoteData?.data?.workorderNumber}
            </h3>
            {/* Bouton Télécharger PDF */}
            <button
               onClick={downloadQuote}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
            <QuoteStatusButton status={quoteData?.data?.status} handleStatusChange={handleStatusChange} />
          </div>
          {/* Workflow */}
          <div className="px-2 py-2">
            <StatusWorkflow currentStatus={quoteData?.data?.status} type={quoteData?.data?.type} />
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          <p className="pt-2 font-medium">Client: {quoteData?.data?.customer?.name}</p>
          <p className="pt-2 font-medium">Email: {quoteData?.data?.customer?.email}</p>
          <p className="pt-2 font-medium">Téléphone: {quoteData?.data?.customer?.phoneNumber}</p>
        </div>
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p className="pt-2 font-medium">Date d'expiration: {quoteData?.data?.expirationDate}</p>
          </div>
        </div>
    </div>

    {/* Section informations véhicule */}
    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
      <h4 className="font-bold text-sm text-blueGray-700 dark:text-white mb-2">
        Informations Véhicule
      </h4>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
        <p className="pt-2 font-medium">Marque: {quoteData?.data?.vehicle?.brand?.label}</p>
        <p className="pt-2 font-medium">Modèle: {quoteData?.data?.vehicle?.model}</p>
        <p className="pt-2 font-medium">Immatriculation: {quoteData?.data?.vehicle?.plateNumber}</p>
        <p className="pt-2 font-medium">Carburant: {quoteData?.data?.vehicle?.fuelType?.label}</p>
      </div>
    </div>

    {/* Tableau des produits */}
    <div className="block w-full overflow-x-auto px-4 py-3">
      <DynamicDataTable columns={quoteColumns} data={quoteData.data.products} />
    </div>

  
    <div className="px-44 py-3 border-t text-right border-gray-200 dark:border-gray-700">
      <div className="flex justify-end">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p className="pt-2 font-medium">
            Total HT : {parseFloat(quoteData?.data?.total || 0).toFixed(2)} MAD
          </p>
          <p className="pt-2 font-medium">
            TVA (20%) : {(parseFloat(quoteData?.data?.total || 0) * 0.2).toFixed(2)} MAD
          </p>
          <p className="pt-2 font-bold">
            Total TTC : {(parseFloat(quoteData?.data?.total || 0).toFixed(2) * 1.2)} MAD
          </p>
        </div>
      </div>
    </div>


    {/* Commentaire si existant */}
    {quoteData?.data?.comment && (
      <div className="px-4 py-3 items-center border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-bold text-sm text-blueGray-700 dark:text-white mb-2">
          Commentaire
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {quoteData?.data?.comment}
        </p>
      </div>
    )}
  </div>
</section>
  );
};

export default ShowQuote;