import { useEffect, useState } from 'react';
import useAlert from '../../hooks/useAlert';
import { useQueryClient } from "react-query";
import SaveButton from '../../components/ui/SaveButton';
import ResetButton from '../../components/ui/ResetButton';
import InputField, { UploadFileField } from '../../components/ui/InpuField';
import { useForm } from "react-hook-form";
import { useUpdateCompany } from '../../services/SettingService';

const SettingForm = ({ company, handleCloseDialog }) => {
  const [id, setId] = useState(null);
  const { mutateAsync: updateCompany } = useUpdateCompany();
  const queryClient = useQueryClient();
  const { setAlert } = useAlert();
  const [existingLogo, setExistingLogo] = useState(null);

  const { 
    handleSubmit, 
    control, 
    reset,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      companyName: '',
      address: '',
      phone: '',
      email: '',
      iceNumber: '',
      logo: null
    }
  });

  useEffect(() => {
    if (company?.id) {
      setId(company.id);
      setExistingLogo(company.logo);
      reset({
        companyName: company.companyName || '',
        address: company.address || '',
        phone: company.phone || '',
        email: company.email || '',
        iceNumber: company.iceNumber || '',
        logo:  null
      });
    }
  }, [company, reset]);

  const onSubmit = async (data) => {
    try {
      const companyData = {
        companyName: data.companyName,
        address: data.address,
        phone: data.phone,
        email: data.email,
        iceNumber: data.iceNumber,
        logo: data.logo || ''
      };

    
      if (id) {
        await updateCompany(
          { id, companyData },
          {
            onSuccess: () => {
              handleCloseDialog();
              queryClient.invalidateQueries(["company"]);
              setAlert({
                active: true,
                type: "success",
                message: 'Modifié avec succès !'
              });
            },
            onError: (error) => {
              setAlert({
                active: true,
                type: "error",
                message: error.response?.data?.message || 'Erreur lors de la mise à jour'
              });
            }
          }
        );
      }
    } catch (error) {
      setAlert({
        active: true,
        type: "error",
        message: error.response?.data?.message || 'Une erreur est survenue'
      });
    }
  };

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 rounded">
      <div className="px-6 py-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">Paramètres de l'entreprise</h3>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <InputField
              name="companyName"
              label="Nom de la société"
              type="text"
              control={control}
              rules={{
                required: 'Le nom est requis',
                minLength: {
                  value: 2,
                  message: 'Minimum 2 caractères'
                }
              }}
            />
            <InputField
              name="address"
              label="Adresse"
              type="text"
              control={control}
            />
            <InputField
              name="phone"
              label="Téléphone"
              type="tel"
              control={control}
              rules={{
                pattern: {
                  value: /^[0-9+\-\s]+$/,
                  message: 'Numéro de téléphone invalide'
                }
              }}
            />
            <InputField
              name="email"
              label="Email"
              type="email"
              control={control}
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalide'
                }
              }}
            />
            <InputField
              name="iceNumber"
              label="Numéro ICE"
              type="number"
              control={control}
            />
            <div>
              {existingLogo && (
                <div className="mb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Logo actuel :</p>
                  <img 
                    src={existingLogo} 
                    alt="Logo actuel" 
                    className="h-20 w-auto object-contain"
                  />
                </div>
              )}
              <UploadFileField
                name="logo"
                label="Nouveau logo (facultatif)"
                control={control}
                accept="image/*"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            {/* <ResetButton 
              onClick={() => reset()}
              disabled={isSubmitting}
            /> */}
            <SaveButton 
              isLoading={isSubmitting}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingForm;