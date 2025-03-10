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
import Quotes from './pages/quote/Quotes';
import Products from './pages/product/Products';
import ProductForm from './pages/product/ProductForm';
import QuoteForm from './pages/quote/QuoteForm';
import AdminLayout from './layout/AdminLayout';
import Users from './pages/admin/users/Users';
import ManageRoles from './pages/admin/roles/MangeRoles';
import Settings from './pages/admin/setings/Settings';
import { Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import RoleForm from './pages/admin/roles/RoleForm';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/errorPage" element={<ErrorPage />}></Route>
            <Route element={<ResquireAuth />}>
                <Route element={<Layout />} >

                  {/* Admin section  */}
                  <Route  path="admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/users" replace />} />
                    <Route path="users" element={<Users />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="mangeRoles" element={<ManageRoles />} />
                    <Route path="/admin/mangeRoles/roleForm" element={<RoleForm />} />

                    {/* <Route path="settings" element={<Admin />} /> */}
                  </Route>
                  {/* Customer Section */}
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/customers/customerform"  element={<CustomerForm />} />
                    <Route path="/vehicles" element={<Vehicles />} />
                    <Route path="/vehicles/vehicleform" element={<VehicleForm />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/orderform" element={<OrderForm />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/quotes" element={<Quotes />} />
                    <Route path="/quotes/quoteform" element={<QuoteForm />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/productForm" element={<ProductForm />} />
                    <Route path="/logout" element={<LogOut />} />
                </Route>
            </Route>
        </Routes>
    </QueryClientProvider>

    
  );
}

export default App;
