import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Tax from 'views/Settings/Tax';
import About from 'views/Settings/About';
import Payment from 'views/Payment';
import Products from 'views/Product';
import ProductCategory from 'views/Product-Category';
import Admin from 'views/Settings/Admin';
import GeneralSettings from 'views/Settings/GeneralSettings/GeneralSettings';
import ExpenseCategory from 'views/Settings/Expense-Category';
import PaymentMode from 'views/Settings/Payment-Mode';
import Offer from 'views/Offer';
import CreateOffer from 'views/Offer/CreateOffer';
import UpdateOffer from 'views/Offer/UpdateOffer';
import CreateInvoice from 'views/Invoice/CreateInvoice';
import ShowInvoice from 'views/Invoice/ShowInvoice';
import Invoice from 'views/Invoice';
import UpdateInvoice from 'views/Invoice/UpdateInvoice';
import RecordInvoice from 'views/Invoice/RecordInvoice';
import Quote from 'views/Quote';
import CreateQuote from 'views/Quote/CreateQuote';
import ShowQuote from 'views/Quote/ShowQuote';
import UpdateQuote from 'views/Quote/UpdateQuote';
import ShowPayment from 'views/Payment/ShowPayment';
import UpdatePayment from 'views/Payment/UpdatePayment';
import Lead from 'views/Lead';
import Expense from 'views/Expense';
import Currecy from 'views/Settings/Currency';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const LeadManagement = Loadable(lazy(() => import('views/Customer')));
const ContactManagement = Loadable(lazy(() => import('views/People')));
const Call = Loadable(lazy(() => import('views/Company')));


const ShowOffer = Loadable(lazy(() => import('views/Offer/ShowOffer')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'customer',
          element: <LeadManagement />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'people',
          element: <ContactManagement />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'company',
          element: <Call />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'lead',
          element: <Lead />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'offer',
          element: <Offer />,
        },
        {
          path: 'offer/create',
          element: <CreateOffer />
        },
        {
          path: 'offer/read/:id',
          element: <ShowOffer />
        },
        {
          path: 'offer/update/:id',
          element: <UpdateOffer />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'invoice',
          element: <Invoice />
        },
        {
          path: 'invoice/create',
          element: <CreateInvoice />
        },
        {
          path: 'invoice/read/:id',
          element: <ShowInvoice />
        },
        {
          path: "invoice/update/:id",
          element: <UpdateInvoice />
        },
        {
          path: "invoice/pay/:id",
          element: <RecordInvoice />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'quote',
          element: <Quote />
        },
        {
          path: 'quote/create',
          element: <CreateQuote />
        },
        {
          path: 'quote/read/:id',
          element: <ShowQuote />
        },
        {
          path: "quote/update/:id",
          element: <UpdateQuote />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'payment',
          element: <Payment />
        },
        {
          path: "payment/read/:id",
          element: <ShowPayment />
        },
        {
          path: "payment/update/:id",
          element: <UpdatePayment />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'expense',
          element: <Expense />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'product',
          element: <Products />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'product-category',
          element: <ProductCategory />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'settings',
          children: [
            {
              path: 'admin',
              element: <Admin />
            },
            {
              path: 'general-settings',
              element: <GeneralSettings />
            },
            {
              path: 'expenses-category',
              element: <ExpenseCategory />
            },
            {
              path: 'payment-mode',
              element: <PaymentMode />
            },
            {
              path: 'tax',
              element: <Tax />
            },
            {
              path: 'about',
              element: <About />
            },
            {
              path: 'currency',
              element: <Currecy/>
            }
          ]
        }
      ]
    },
  ]
};

export default MainRoutes;
