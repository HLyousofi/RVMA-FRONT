import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/LogIn';
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
import InvoiceForm from './pages/invoice/InvoiceForm';
import ShowInvoice from './pages/invoice/ShowInvoice'
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
import Setting from './pages/settings/Settings';
import ShowQuote from './pages/quote/ShowQuote';
import ShowOrder from './pages/order/ShowOrder';
import ProtectLogin from "./layout/ProtectLogin";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Routes>
            <Route element={<ProtectLogin />}>
              <Route path="/" element={<Login />} />
            </Route>
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
                    <Route path="/orders/create" element={<OrderForm />} />
                    <Route path="/orders/:id/edit" element={<OrderForm />} />
                    <Route path="/orders/:id/show" element={<ShowOrder />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/invoices/:id/edit" element={<InvoiceForm />} />
                    <Route path="/invoices/:id/show" element={<ShowInvoice />} />
                    <Route path="/quotes" element={<Quotes />} />
                    <Route path="/quotes/create" element={<QuoteForm />} />
                    <Route path="/quotes/:id/edit" element={<QuoteForm />} />
                    <Route path="/quotes/:id/show" element={<ShowQuote />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/productForm" element={<ProductForm />} />
                    <Route path="/setting" element={<Setting />} />
                </Route>
            </Route>
        </Routes>
    </QueryClientProvider>

    
  );
}

export default App;
