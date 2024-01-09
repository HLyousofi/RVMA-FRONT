import CarRepairIcon from '@mui/icons-material/CarRepair';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

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
        title : "Orders",
        icon : <CarRepairIcon />,
        link :  "orders"
    },
    {
        title : "Factures",
        icon : <ReceiptIcon />,
        link :  "invoices"
    },
    {
        title : "Devis",
        icon : <RequestQuoteIcon />,
        link :  "quotes"
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