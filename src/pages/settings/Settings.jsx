import useGetCompany from "../../services/SettingService";
import Dialog from '../../components/Dialog';
import SettingForm from "./SettingForm";
import useDialog from "../../hooks/useDialog";
import CircularIndeterminate from "../../components/ui/CircularIndeterminate";



const Setting = () => {

   
    const { data : company, isLoading, isError } = useGetCompany();
    const { isOpen, openDialog, closeDialog } = useDialog();

    if(isLoading){
        return <CircularIndeterminate />
    }
    return (
        <>  
        <Dialog isOpen={isOpen} onClose={closeDialog} >
             <SettingForm  company={company?.data} handleCloseDialog={closeDialog}/>
        </Dialog>
            <div className="h-full py-6 bg-gray-100 dark:bg-gray-900  text-gray-900 dark:text-white rounded">
                <div className="w-full px-4  sm:px-6 lg:px-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6">Paramètres</h1>

                    {/* Section Informations de la Société */}
                    <div className="rounded-lg shadow-md p-4 sm:p-6 bg-white dark:bg-gray-800">
                        <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4">
                            Informations de la Société
                        </h2>
                        <button
                            onClick={openDialog}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                            title="Modifier les paramètres"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        </button>
                        </div>
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                    {company?.data?.logoPath ? (
                                        <img
                                            src={company.data?.logoPath}
                                            alt="Logo Société"
                                            className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">Aucun logo</span>
                                        </div>
                                    )}
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-base sm:text-lg font-medium">
                                            {company.data.companyName || 'Nom non défini'}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                            Propriétaire du garage
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <p className="text-sm font-medium flex items-center text-gray-600 dark:text-gray-300">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="break-words">{company.data.address || 'Adresse non définie'}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium flex items-center text-gray-600 dark:text-gray-300">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {company.data.phone || 'Téléphone non défini'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium flex items-center text-gray-600 dark:text-gray-300">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="break-words">{company.data.email || 'Email non défini'}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium flex items-center text-gray-600 dark:text-gray-300">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            {company.data.iceNumber || 'Ice non défini'}
                                        </p>
                                    </div>
                                </div>

                                {company.data.updatedAt && (
                                    <p className="text-xs mt-4 text-gray-400 dark:text-gray-500">
                                        Dernière mise à jour : {new Date(company.data.updatedAt).toLocaleDateString('fr-FR')}
                                    </p>
                                )}
                            </div>
                    </div>

                    {/* Autres sections de paramètres */}
                    {/* <div className="rounded-lg shadow-md p-4 sm:p-6 mt-6 bg-white dark:bg-gray-800">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4">Autres Paramètres</h2>
                        <p className="text-gray-600 dark:text-gray-300">Ajoutez d'autres options ici...</p>
                    </div> */}
                </div>
            </div>
        </>
    )
}
export default Setting;