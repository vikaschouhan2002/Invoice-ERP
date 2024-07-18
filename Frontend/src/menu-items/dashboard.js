import { AiOutlineDashboard } from "react-icons/ai";
import { AiOutlineCustomerService } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineBank } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineFile } from "react-icons/ai";
import { AiOutlineContainer } from "react-icons/ai";
import { AiOutlineFileSync } from "react-icons/ai";
import { AiOutlineCreditCard } from "react-icons/ai";
import { AiOutlineWallet } from "react-icons/ai";
import { AiOutlineTag } from "react-icons/ai";
import { AiOutlineTags } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  title: 'Dashboard-Menu',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: AiOutlineDashboard,
      breadcrumbs: false
    },
    {
      id: '01',
      title: 'Customer',
      type: 'item',
      url: '/dashboard/customer',
      icon: AiOutlineCustomerService,
      breadcrumbs: false
    },
    {
      id: '02',
      title: 'People',
      type: 'item',
      url: '/dashboard/people',
      icon: AiOutlineUser,
      breadcrumbs: false
    },
    {
      id: '03',
      title: 'Company',
      type: 'item',
      url: '/dashboard/company',
      icon: AiOutlineBank,
      breadcrumbs: false
    },
    {
      id: '04',
      title: 'Lead',
      type: 'item',
      url: '/dashboard/lead',
      icon: AiOutlineFilter,
      breadcrumbs: false
    },
    {
      id: '05',
      title: 'Offer',
      type: 'item',
      url: '/dashboard/offer',
      icon: AiOutlineFile,
      breadcrumbs: false
    },
    {
      id: '06',
      title: 'Invoice',
      type: 'item',
      url: '/dashboard/invoice',
      icon: AiOutlineContainer,
      breadcrumbs: false
    },
    {
      id: '07',
      title: 'Quote',
      type: 'item',
      url: '/dashboard/quote',
      icon: AiOutlineFileSync,
      breadcrumbs: false
    },
    {
      id: '08',
      title: 'Payment',
      type: 'item',
      url: '/dashboard/payment',
      icon: AiOutlineCreditCard,
      breadcrumbs: false
    },
    {
      id: '09',
      title: 'Expense',
      type: 'item',
      url: '/dashboard/expense',
      icon: AiOutlineWallet,
      breadcrumbs: false
    },
    {
      id: '10',
      title: 'Product',
      type: 'item',
      url: '/dashboard/product',
      icon: AiOutlineTag,
      breadcrumbs: false
    },
    {
      id: '11',
      title: 'Product Category',
      type: 'item',
      url: '/dashboard/product-category',
      icon: AiOutlineTags,
      breadcrumbs: false
    },
    {
      id: '12',
      title: 'Settings',
      type: 'collapse',
      url: '/dashboard/settings',
      icon: CiSettings,
      breadcrumbs: false,
      children: [
        {
          id: '01',
          title: 'Admin',
          type: 'item',
          url: '/dashboard/settings/admin',
          breadcrumbs: false
        },
        {
          id: '02',
          title: 'General Settings',
          type: 'item',
          url: '/dashboard/settings/general-settings',
          breadcrumbs: false
        },
        {
          id: '03',
          title: 'Expenses Category',
          type: 'item',
          url: '/dashboard/settings/expenses-category',
          breadcrumbs: false
        },
        {
          id: '04',
          title: 'Currency',
          type: 'item',
          url: '/dashboard/settings/currency',
          breadcrumbs: false
        },
        {
          id: '05',
          title: 'Payment Mode',
          type: 'item',
          url: '/dashboard/settings/payment-mode',
          breadcrumbs: false
        },
        {
          id: '06',
          title: 'Taxes',
          type: 'item',
          url: '/dashboard/settings/tax',
          breadcrumbs: false
        },
        {
          id: '07',
          title: 'About',
          type: 'item',
          url: '/dashboard/settings/about',
          breadcrumbs: false
        }
        
      ]
    }
  ]
};

export default dashboard;
