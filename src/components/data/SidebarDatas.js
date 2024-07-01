import CarRepairIcon from '@mui/icons-material/CarRepair';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StoreIcon from '@mui/icons-material/Store';

 const SidebarData = [
    {
        title : "Clients",
        icon : < PeopleIcon />,
        link : "customers"
    },
    {
        title : "Vehicules",
        icon : < TimeToLeaveIcon />,
        link :  "vehicles"
    },
    {
        title : "Devis",
        icon : <RequestQuoteIcon />,
        link :  "quotes"
    },
    {
        title : "Orders de Reparation",
        icon : <CarRepairIcon />,
        link :  "orders"
    },
    {
        title : "Factures",
        icon : <ReceiptIcon />,
        link :  "invoices"
    },
    {
        title : "Produit",
        icon : <StoreIcon />,
        link : "product"
    },
    {
        title : "Fournisseur",
        icon : <FactoryOutlinedIcon />,
        link : "supplier"
    },
    {
        title : "Transaction",
        icon : <LocalShippingOutlinedIcon />,
        link : "transaction"
    },

    {
        title : "Admin",
        icon : <AdminPanelSettingsIcon />,
        link :  "admin"
    },
    {
        title : "Deconnexion",
        icon : <LogoutIcon />,
        link :  "logout"
    },

    





];

export default SidebarData;