import { useEffect } from "react";
import { XmodelIcon, ExclamationIcon } from "../assets/icons";
import usePopup from "../hooks/usePopup";

const PopUp = () => {
  const { isOpen, closePopup, yesAction, noAction, message } = usePopup();

  const handleYesClick = () => {
    yesAction();
    closePopup();
  };

  const handleNoClick = () => {
    closePopup();
    noAction();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex justify-center items-center overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                onClick={handleNoClick}
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <XmodelIcon className="w-3 h-3 text-gray-400" />
                <span className="sr-only">Close modal</span>
              </button>
              {/* Content of the modal */}
              <div className="p-4 md:p-5 text-center">
                <ExclamationIcon className="mx-auto mb-4 text-gray-400 w-10 h-10 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {message}
                </h3>
                <button
                  onClick={handleYesClick}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2 dark:focus:ring-red-800"
                >
                  OUI
                </button>
                <button
                  onClick={handleNoClick}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Non
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;