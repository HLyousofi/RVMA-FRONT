import { Route, Routes } from 'react-router-dom';
import './App.css';
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
import { QueryClientProvider, QueryClient } from 'react-query';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route element={<ResquireAuth />}>
                <Route element={<Layout />} >
                    <Route path="/customers" element={<Customers />}></Route>
                    <Route path="/customers/customerform" element={<CustomerForm />}></Route>
                    <Route path="/vehicles" element={<Vehicles />}></Route>
                    <Route path="/vehicles/vehicleform" element={<VehicleForm />}></Route>
                    <Route path="/orders" element={<Orders />}></Route>
                    <Route path="/invoices" element={<Invoices />}></Route>
                    <Route path="/logout" element={<LogOut />}></Route>
                </Route>
            </Route>
        </Routes>
    </QueryClientProvider>

    
  );
}

export default App;
