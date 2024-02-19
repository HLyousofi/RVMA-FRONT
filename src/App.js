import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/LogIn';
import LogOut from './pages/login/LogOut'
import Customers from './pages/customer/Customers';
import ResquireAuth from './components/RequireAuth';
import Layout from './layout/Layout';
import Vehicles from './pages/vehicle/Vehicles';
import Orders from './pages/order/Orders';
import Invoices from './pages/invoice/Invoices';
import CustomerForm from './pages/customer/CustomerForm';
import VehicleForm from './pages/vehicle/VehicleForm';
import ErrorPage from './pages/page-error/page-error';
import OrderForm from './pages/order/OrderForm';

import { QueryClientProvider, QueryClient } from 'react-query';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/errorPage" element={<ErrorPage />}></Route>
            <Route element={<ResquireAuth />}>
                <Route element={<Layout />} >
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/customers/customerform" element={<CustomerForm />} />
                    <Route path="/vehicles" element={<Vehicles />} />
                    <Route path="/vehicles/vehicleform" element={<VehicleForm />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/orderform" element={<OrderForm />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/logout" element={<LogOut />} />
                </Route>
            </Route>
        </Routes>
    </QueryClientProvider>

    
  );
}

export default App;
