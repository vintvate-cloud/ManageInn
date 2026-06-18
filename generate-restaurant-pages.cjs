const fs = require('fs');
const path = require('path');

const SCAFFOLD_DIR = path.join(__dirname, 'src', 'features', 'scaffold');

const PAGES = {
  // Order Management
  'RestaurantOnlinePage': {
    title: 'Online Orders', eyebrow: 'Orders > Online Delivery', icon: 'Smartphone',
    stats: [
      { label: 'Active Orders', value: '18', delta: '' },
      { label: 'Avg Prep Time', value: '14m', delta: '-2m' }
    ],
    columns: "['Order #', 'Platform', 'Items', 'Status', 'Driver', 'Actions']",
    rows: `[
      ['#501', 'UberEats', '2x Burger, 1x Fries', <span className="text-orange-500">Preparing</span>, 'Waiting', <ActionButtons />],
      ['#502', 'Direct Web', '1x Pizza, 2x Coke', <span className="text-blue-500">Ready</span>, 'Arrived', <ActionButtons />],
    ]`
  },
  'RestaurantQrPage': {
    title: 'QR Menu Orders', eyebrow: 'Orders > Self Service', icon: 'QrCode',
    stats: [
      { label: 'Active QR Orders', value: '8', delta: '' },
      { label: 'Revenue (QR)', value: '$450', delta: 'Today' }
    ],
    columns: "['Table #', 'Order ID', 'Items', 'Amount', 'Status', 'Actions']",
    rows: `[
      ['Table 12', 'QR-001', 'Nachos, 2x Beer', '$35.00', <span className="text-orange-500">Preparing</span>, <ActionButtons />],
      ['Table 04', 'QR-002', 'Steak, Wine', '$120.00', <span className="text-green-500">Delivered</span>, <ActionButtons />],
    ]`
  },
  'RestaurantTableOrdersPage': {
    title: 'Table-wise Orders', eyebrow: 'Orders > Tables', icon: 'Table2',
    stats: [
      { label: 'Occupied Tables', value: '14/20', delta: '' },
      { label: 'Open Tabs', value: '$840', delta: '' }
    ],
    columns: "['Table #', 'Server', 'Guests', 'Current Bill', 'Time Seated', 'Actions']",
    rows: `[
      ['Table 12', 'Sarah', '4', '$145.00', '45 mins', <ActionButtons />],
      ['Table 08', 'Mike', '2', '$65.00', '15 mins', <ActionButtons />],
    ]`
  },

  // Table Management
  'RestaurantTablesPage': {
    title: 'Table Availability', eyebrow: 'Tables > Status', icon: 'Table2',
    stats: [
      { label: 'Available', value: '6', delta: '' },
      { label: 'Occupied', value: '14', delta: '' }
    ],
    columns: "['Table #', 'Capacity', 'Status', 'Current Order', 'Server', 'Actions']",
    rows: `[
      ['Table 01', '2 Seats', <span className="text-green-500">Available</span>, '--', '--', <ActionButtons />],
      ['Table 02', '4 Seats', <span className="text-orange-500">Occupied</span>, '#402', 'Sarah', <ActionButtons />],
    ]`
  },
  'RestaurantReservationsPage': {
    title: 'Reservations', eyebrow: 'Tables > Booking', icon: 'Calendar',
    stats: [
      { label: 'Today', value: '12', delta: '' },
      { label: 'Upcoming (Week)', value: '45', delta: '' }
    ],
    columns: "['Guest Name', 'Time', 'Guests', 'Table Assigned', 'Status', 'Actions']",
    rows: `[
      ['John Smith', '7:00 PM', '4', 'Table 12', <span className="text-green-500">Confirmed</span>, <ActionButtons />],
      ['Emily Davis', '8:30 PM', '2', 'Unassigned', <span className="text-orange-500">Pending</span>, <ActionButtons />],
    ]`
  },
  'RestaurantWaitingPage': {
    title: 'Waiting List', eyebrow: 'Tables > Waitlist', icon: 'Clock',
    stats: [
      { label: 'Parties Waiting', value: '5', delta: '' },
      { label: 'Est. Wait Time', value: '25m', delta: '' }
    ],
    columns: "['Guest Name', 'Party Size', 'Time Arrived', 'Wait Time', 'Status', 'Actions']",
    rows: `[
      ['Mike Ross', '3', '6:45 PM', '15m', <span className="text-orange-500">Waiting</span>, <ActionButtons />],
      ['Harvey S.', '2', '6:55 PM', '5m', <span className="text-orange-500">Waiting</span>, <ActionButtons />],
    ]`
  },
  'RestaurantAssignmentPage': {
    title: 'Table Assignment', eyebrow: 'Tables > Staffing', icon: 'CheckCircle2',
    stats: [
      { label: 'Active Servers', value: '6', delta: '' },
      { label: 'Tables/Server', value: '3.3', delta: '' }
    ],
    columns: "['Server Name', 'Section', 'Assigned Tables', 'Active Orders', 'Actions']",
    rows: `[
      ['Sarah Lee', 'Patio', 'P1, P2, P3, P4', '3', <ActionButtons />],
      ['Mike Ross', 'Main Dining', 'T1, T2, T3', '2', <ActionButtons />],
    ]`
  },

  // Kitchen Management
  'RestaurantQueuePage': {
    title: 'Order Queue', eyebrow: 'Kitchen > Queue', icon: 'ListOrdered',
    stats: [
      { label: 'Tickets Pending', value: '14', delta: '' },
      { label: 'Longest Wait', value: '18m', delta: 'Requires Attention' }
    ],
    columns: "['Ticket #', 'Type', 'Items', 'Time Received', 'Timer', 'Actions']",
    rows: `[
      ['#402', 'Dine-In (T12)', '2x Steak, 1x Salad', '7:02 PM', <span className="text-red-500">18m</span>, <ActionButtons />],
      ['#403', 'UberEats', '3x Burger', '7:15 PM', <span className="text-orange-500">5m</span>, <ActionButtons />],
    ]`
  },
  'RestaurantPrepPage': {
    title: 'Prep Tracking', eyebrow: 'Kitchen > Prep', icon: 'Clock',
    stats: [
      { label: 'Items Prepped', value: '85%', delta: 'Target: 100%' },
      { label: 'Low Stock Alerts', value: '2', delta: '' }
    ],
    columns: "['Ingredient/Station', 'Required Amount', 'Prepped Amount', 'Status', 'Assigned To', 'Actions']",
    rows: `[
      ['Chopped Onions', '10 lbs', '10 lbs', <span className="text-green-500">Ready</span>, 'Chef Dave', <ActionButtons />],
      ['Pizza Dough', '50 portions', '20 portions', <span className="text-orange-500">In Progress</span>, 'Chef Mario', <ActionButtons />],
    ]`
  },
  'RestaurantChefPage': {
    title: 'Chef Tasks', eyebrow: 'Kitchen > Staff Tasks', icon: 'ChefHat',
    stats: [
      { label: 'Active Chefs', value: '4', delta: '' },
      { label: 'Pending Tasks', value: '6', delta: '' }
    ],
    columns: "['Task', 'Station', 'Assigned To', 'Priority', 'Status', 'Actions']",
    rows: `[
      ['Prep Chicken Station', 'Grill', 'Chef Dave', 'High', <span className="text-orange-500">In Progress</span>, <ActionButtons />],
      ['Clean Deep Fryer', 'Fryer', 'Chef Mario', 'Normal', <span className="text-red-500">Not Started</span>, <ActionButtons />],
    ]`
  },

  // Menu Management
  'RestaurantMenuPage': {
    title: 'Menu Categories', eyebrow: 'Menu > Categories', icon: 'BookOpen',
    stats: [
      { label: 'Total Categories', value: '8', delta: '' },
      { label: 'Active Items', value: '64', delta: '' }
    ],
    columns: "['Category', 'Total Items', 'Status', 'Visibility', 'Actions']",
    rows: `[
      ['Appetizers', '12', <span className="text-green-500">Active</span>, 'All Menus', <ActionButtons />],
      ['Main Course', '24', <span className="text-green-500">Active</span>, 'All Menus', <ActionButtons />],
      ['Breakfast', '8', <span className="text-orange-500">Inactive</span>, 'Hidden (Time Restr.)', <ActionButtons />],
    ]`
  },
  'RestaurantItemStatusPage': {
    title: 'Item Availability', eyebrow: 'Menu > 86 List', icon: 'CheckSquare',
    stats: [
      { label: 'Items 86\'d', value: '3', delta: 'Out of stock' },
      { label: 'Low Warning', value: '5', delta: '' }
    ],
    columns: "['Item Name', 'Category', 'Current Status', 'Action Required', 'Actions']",
    rows: `[
      ['Truffle Fries', 'Sides', <span className="text-red-500">Sold Out (86)</span>, 'Order Truffle Oil', <ActionButtons />],
      ['Salmon Filet', 'Mains', <span className="text-orange-500">Low Stock (3 left)</span>, 'Restock from freezer', <ActionButtons />],
    ]`
  },
  'RestaurantCombosPage': {
    title: 'Combo Deals', eyebrow: 'Menu > Combos', icon: 'Layers',
    stats: [
      { label: 'Active Combos', value: '4', delta: '' },
      { label: 'Combo Sales', value: '28%', delta: 'of total orders' }
    ],
    columns: "['Combo Name', 'Included Items', 'Price', 'Discount', 'Status', 'Actions']",
    rows: `[
      ['Lunch Special', 'Burger + Fries + Soda', '$15.00', '15%', <span className="text-green-500">Active (11a-2p)</span>, <ActionButtons />],
      ['Family Pack', '2x Pizza + Wings + 4x Soda', '$45.00', '20%', <span className="text-green-500">Active</span>, <ActionButtons />],
    ]`
  },
  'RestaurantPricesPage': {
    title: 'Price Management', eyebrow: 'Menu > Pricing', icon: 'DollarSign',
    stats: [
      { label: 'Items Updated', value: '12', delta: 'This Month' },
      { label: 'Avg Margin', value: '68%', delta: '' }
    ],
    columns: "['Item Name', 'Cost Price', 'Selling Price', 'Margin', 'Platform Pricing', 'Actions']",
    rows: `[
      ['Cheeseburger', '$3.50', '$12.00', '71%', '+15% on UberEats', <ActionButtons />],
      ['Margherita Pizza', '$2.80', '$14.00', '80%', '+15% on UberEats', <ActionButtons />],
    ]`
  },

  // Inventory
  'RestaurantRawMaterialsPage': {
    title: 'Raw Materials', eyebrow: 'Inventory > Stock', icon: 'Boxes',
    stats: [
      { label: 'Total Value', value: '$8,450', delta: '' },
      { label: 'Items Tracked', value: '142', delta: '' }
    ],
    columns: "['Ingredient', 'Category', 'Current Stock', 'Unit', 'Value', 'Actions']",
    rows: `[
      ['Chicken Breast', 'Meat', '45', 'lbs', '$135.00', <ActionButtons />],
      ['Cheddar Cheese', 'Dairy', '12', 'lbs', '$48.00', <ActionButtons />],
    ]`
  },
  'RestaurantStockAlertsPage': {
    title: 'Stock Alerts', eyebrow: 'Inventory > Alerts', icon: 'AlertTriangle',
    stats: [
      { label: 'Critical (Out)', value: '2', delta: '' },
      { label: 'Low Stock Warning', value: '8', delta: '' }
    ],
    columns: "['Ingredient', 'Current Stock', 'Minimum Required', 'Supplier', 'Status', 'Actions']",
    rows: `[
      ['Truffle Oil', '0', '2 bottles', 'Gourmet Foods Inc', <span className="text-red-500">Out of Stock</span>, <ActionButtons />],
      ['Napkins', '2 boxes', '5 boxes', 'Restaurant Supply Co', <span className="text-orange-500">Low Stock</span>, <ActionButtons />],
    ]`
  },
  'RestaurantPoPage': {
    title: 'Purchase Orders', eyebrow: 'Inventory > POs', icon: 'ClipboardList',
    stats: [
      { label: 'Pending POs', value: '3', delta: '$1,240' },
      { label: 'Received Today', value: '1', delta: '' }
    ],
    columns: "['PO Number', 'Supplier', 'Amount', 'Date Ordered', 'Status', 'Actions']",
    rows: `[
      ['PO-2023-45', 'Gourmet Foods Inc', '$450.00', 'Yesterday', <span className="text-orange-500">In Transit</span>, <ActionButtons />],
      ['PO-2023-46', 'Local Farm Produce', '$120.00', 'Today', <span className="text-orange-500">Processing</span>, <ActionButtons />],
    ]`
  },
  'RestaurantVendorsPage': {
    title: 'Vendor Management', eyebrow: 'Inventory > Vendors', icon: 'Truck',
    stats: [
      { label: 'Active Vendors', value: '12', delta: '' },
      { label: 'Outstanding Payables', value: '$2,450', delta: '' }
    ],
    columns: "['Vendor Name', 'Category', 'Contact', 'Avg Delivery Time', 'Balance', 'Actions']",
    rows: `[
      ['Gourmet Foods Inc', 'Dry Goods & Oils', 'mark@gourmet.com', '2 Days', '$450.00', <ActionButtons />],
      ['Local Farm Produce', 'Fresh Veggies', '555-0192', 'Same Day', '$0.00', <ActionButtons />],
    ]`
  },
  'RestaurantWastePage': {
    title: 'Waste Tracking', eyebrow: 'Inventory > Waste', icon: 'Trash2',
    stats: [
      { label: 'Waste Cost (MTD)', value: '$345', delta: '-12%' },
      { label: 'Most Wasted', value: 'Lettuce', delta: '' }
    ],
    columns: "['Item', 'Quantity', 'Reason', 'Cost Value', 'Recorded By', 'Actions']",
    rows: `[
      ['Lettuce', '2 lbs', 'Spoiled/Expired', '$4.50', 'Chef Dave', <ActionButtons />],
      ['Burger Bun', '5 units', 'Dropped', '$1.25', 'Chef Mario', <ActionButtons />],
    ]`
  },

  // Billing & POS
  'RestaurantInvoicesPage': {
    title: 'GST Invoices', eyebrow: 'Billing > Taxes', icon: 'Receipt',
    stats: [
      { label: 'GST Collected', value: '$450', delta: 'Today' },
      { label: 'Total Invoices', value: '142', delta: 'Today' }
    ],
    columns: "['Invoice #', 'Order Ref', 'Subtotal', 'Tax (GST)', 'Total', 'Actions']",
    rows: `[
      ['INV-1024', '#402 (Dine-In)', '$145.00', '$7.25', '$152.25', <ActionButtons />],
      ['INV-1025', '#403 (UberEats)', '$45.00', '$2.25', '$47.25', <ActionButtons />],
    ]`
  },
  'RestaurantSplitPage': {
    title: 'Split Payments', eyebrow: 'Billing > Splitting', icon: 'SplitSquareHorizontal',
    stats: [
      { label: 'Split Orders', value: '12', delta: 'Today' },
      { label: 'Avg Split Size', value: '2.5', delta: 'Cards per order' }
    ],
    columns: "['Table/Order', 'Total Amount', 'Split Type', 'Payments Received', 'Status', 'Actions']",
    rows: `[
      ['Table 12', '$145.00', 'By Item', '2 of 3 paid', <span className="text-orange-500">Pending ($45 left)</span>, <ActionButtons />],
      ['Table 08', '$65.00', 'Equal (50/50)', '2 of 2 paid', <span className="text-green-500">Completed</span>, <ActionButtons />],
    ]`
  },
  'RestaurantPaymentModesPage': {
    title: 'Payment Modes', eyebrow: 'Billing > Gateways', icon: 'CreditCard',
    stats: [
      { label: 'Card / Digital', value: '78%', delta: 'Usage' },
      { label: 'Cash', value: '22%', delta: 'Usage' }
    ],
    columns: "['Method', 'Transactions', 'Total Volume', 'Fees Incurred', 'Status', 'Actions']",
    rows: `[
      ['Credit Card (Stripe)', '85', '$3,400', '$98.50', <span className="text-green-500">Active</span>, <ActionButtons />],
      ['Cash', '24', '$850', '$0.00', <span className="text-green-500">Active</span>, <ActionButtons />],
      ['UberEats Payout', '15', '$450', '$135.00', <span className="text-green-500">Active</span>, <ActionButtons />],
    ]`
  },
  'RestaurantDiscountsPage': {
    title: 'Discounts & Coupons', eyebrow: 'Billing > Promotions', icon: 'BadgePercent',
    stats: [
      { label: 'Active Codes', value: '5', delta: '' },
      { label: 'Discount Given', value: '$120', delta: 'Today' }
    ],
    columns: "['Code Name', 'Type', 'Value', 'Usage Count', 'Status', 'Actions']",
    rows: `[
      ['SUMMER20', 'Percentage', '20% Off', '45', <span className="text-green-500">Active</span>, <ActionButtons />],
      ['FREESODA', 'Item Comp', '100% (Soda)', '12', <span className="text-green-500">Active</span>, <ActionButtons />],
    ]`
  },

  // Customer Management
  'RestaurantCustomersPage': {
    title: 'Customer Database', eyebrow: 'Customers > CRM', icon: 'Users',
    stats: [
      { label: 'Total Profiles', value: '4,205', delta: '' },
      { label: 'New Today', value: '12', delta: '' }
    ],
    columns: "['Name', 'Phone', 'Total Visits', 'Total Spent', 'Last Visit', 'Actions']",
    rows: `[
      ['Alex Johnson', '555-0123', '14', '$850.00', 'Today', <ActionButtons />],
      ['Samantha Ray', '555-0456', '3', '$125.00', '2 Weeks Ago', <ActionButtons />],
    ]`
  },
  'RestaurantLoyaltyPage': {
    title: 'Loyalty Points', eyebrow: 'Customers > Loyalty', icon: 'Heart',
    stats: [
      { label: 'Points Issued', value: '14,500', delta: 'MTD' },
      { label: 'Points Redeemed', value: '8,200', delta: 'MTD' }
    ],
    columns: "['Customer', 'Current Balance', 'Tier', 'Points Earned (Lifetime)', 'Actions']",
    rows: `[
      ['Alex Johnson', '450 pts', 'Gold', '2,450 pts', <ActionButtons />],
      ['Samantha Ray', '120 pts', 'Silver', '120 pts', <ActionButtons />],
    ]`
  },
  'RestaurantFeedbackPage': {
    title: 'Feedback & Ratings', eyebrow: 'Customers > Feedback', icon: 'MessageCircle',
    stats: [
      { label: 'Avg Rating', value: '4.8', delta: 'out of 5' },
      { label: 'Reviews', value: '24', delta: 'This Week' }
    ],
    columns: "['Customer', 'Order Ref', 'Rating', 'Comment', 'Status', 'Actions']",
    rows: `[
      ['Alex Johnson', 'Dine-In (T12)', '⭐⭐⭐⭐⭐', 'Great steak as always!', <span className="text-green-500">Responded</span>, <ActionButtons />],
      ['Anonymous', 'UberEats', '⭐⭐', 'Fries were cold.', <span className="text-orange-500">Requires Review</span>, <ActionButtons />],
    ]`
  },
  'RestaurantRepeatPage': {
    title: 'Repeat Tracking', eyebrow: 'Customers > Retention', icon: 'UserPlus',
    stats: [
      { label: 'Repeat Rate', value: '42%', delta: '+2% from last month' },
      { label: 'Churn Risk', value: '14', delta: 'Guests' }
    ],
    columns: "['Customer', 'Visits', 'Avg Days Between', 'Trend', 'Action Plan', 'Actions']",
    rows: `[
      ['Alex Johnson', '14', '7 Days', <span className="text-green-500">Stable</span>, 'Send Thank You Offer', <ActionButtons />],
      ['Mike T.', '4', '30 Days', <span className="text-red-500">Slipping (45 Days ago)</span>, 'Send We Miss You 20% Off', <ActionButtons />],
    ]`
  },

  // Reports
  'RestaurantReportsBestSellingPage': {
    title: 'Best Selling Items', eyebrow: 'Analytics > Sales', icon: 'TrendingUp',
    stats: [
      { label: 'Top Category', value: 'Mains', delta: '45% of sales' },
      { label: 'Top Item', value: 'Cheeseburger', delta: '142 sold' }
    ],
    columns: "['Item Name', 'Category', 'Quantity Sold', 'Revenue', 'Trend', 'Actions']",
    rows: `[
      ['Classic Cheeseburger', 'Mains', '142', '$1,704.00', <span className="text-green-500">+12%</span>, <ActionButtons />],
      ['Truffle Fries', 'Sides', '98', '$686.00', <span className="text-green-500">+5%</span>, <ActionButtons />],
    ]`
  },
  'RestaurantReportsDailyPage': {
    title: 'Daily Sales Report', eyebrow: 'Analytics > Revenue', icon: 'BarChart3',
    stats: [
      { label: 'Sales Today', value: '$4,250', delta: '+8%' },
      { label: 'Avg Ticket Size', value: '$45.20', delta: '' }
    ],
    columns: "['Date', 'Total Orders', 'Gross Sales', 'Discounts', 'Net Sales', 'Actions']",
    rows: `[
      ['Today', '94', '$4,400.00', '$150.00', '$4,250.00', <ActionButtons />],
      ['Yesterday', '88', '$4,100.00', '$120.00', '$3,980.00', <ActionButtons />],
    ]`
  },
  'RestaurantReportsMarginPage': {
    title: 'Profit Margin', eyebrow: 'Analytics > Profitability', icon: 'Percent',
    stats: [
      { label: 'Gross Margin', value: '68%', delta: 'Target: 70%' },
      { label: 'Highest Margin Item', value: 'Soda', delta: '92%' }
    ],
    columns: "['Category/Item', 'Avg Cost', 'Avg Price', 'Margin %', 'Status', 'Actions']",
    rows: `[
      ['Beverages', '$0.50', '$3.50', '85%', <span className="text-green-500">Healthy</span>, <ActionButtons />],
      ['Steak', '$12.00', '$28.00', '57%', <span className="text-orange-500">Below Target</span>, <ActionButtons />],
    ]`
  },
  'RestaurantReportsPeakPage': {
    title: 'Peak Hours Analysis', eyebrow: 'Analytics > Footfall', icon: 'Clock',
    stats: [
      { label: 'Busiest Hour', value: '7:00 PM', delta: 'Avg 45 orders' },
      { label: 'Slowest Hour', value: '3:00 PM', delta: 'Avg 5 orders' }
    ],
    columns: "['Time Block', 'Avg Orders', 'Avg Revenue', 'Recommended Staffing', 'Actions']",
    rows: `[
      ['11:00 AM - 2:00 PM (Lunch)', '65', '$1,200', '4 Servers, 3 Chefs', <ActionButtons />],
      ['6:00 PM - 9:00 PM (Dinner)', '110', '$3,500', '6 Servers, 4 Chefs', <ActionButtons />],
    ]`
  },
  'RestaurantReportsFoodCostPage': {
    title: 'Food Cost Report', eyebrow: 'Analytics > Costs', icon: 'DollarSign',
    stats: [
      { label: 'Overall Food Cost', value: '32%', delta: 'Target: 30%' },
      { label: 'Waste Impact', value: '2.5%', delta: 'of total cost' }
    ],
    columns: "['Week', 'Total Food Purchases', 'Total Food Sales', 'Food Cost %', 'Variance', 'Actions']",
    rows: `[
      ['Week 42 (Current)', '$4,500', '$14,062', '32%', <span className="text-orange-500">+2%</span>, <ActionButtons />],
      ['Week 41', '$4,200', '$14,000', '30%', <span className="text-green-500">On Target</span>, <ActionButtons />],
    ]`
  }
};

function generateFileContent(name, config) {
  return `import React from 'react';
import { PageHeader, Card, SimpleTable, StatCard } from '../../components/ui/dashboard-shell';
import { Plus, Download, Filter, Search, MoreHorizontal, Edit, Trash2, ${config.icon} } from 'lucide-react';

export default function ${name}() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="${config.title}" 
        eyebrow="${config.eyebrow}"
        action={
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-background border border-border rounded-xl text-sm font-semibold hover:bg-muted flex items-center gap-2">
              <Download className="h-4 w-4" /> Export
            </button>
            <button className="px-4 py-2 bg-op-purple text-foreground rounded-xl text-sm font-semibold hover:bg-op-purple/90 flex items-center gap-2 shadow-lg shadow-op-purple/20">
              <Plus className="h-4 w-4" /> Add New
            </button>
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${config.stats.map(s => `<StatCard label="${s.label}" value="${s.value}" delta="${s.delta}" />`).join('\n        ')}
      </div>
      
      <Card className="p-0 overflow-hidden border-border">
        <div className="p-4 border-b border-border flex flex-wrap gap-4 justify-between items-center bg-muted/20">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search records..." className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-op-purple transition-colors" />
          </div>
          <button className="px-3 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
        
        <SimpleTable 
          columns={${config.columns}}
          rows={${config.rows}}
        />
      </Card>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <button className="p-1.5 hover:bg-muted rounded-md hover:text-foreground transition-colors" title="Edit"><Edit className="h-4 w-4" /></button>
      <button className="p-1.5 hover:bg-red-500/10 rounded-md hover:text-red-500 transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
    </div>
  );
}
`;
}

function main() {
  let count = 0;
  for (const [name, config] of Object.entries(PAGES)) {
    const filePath = path.join(SCAFFOLD_DIR, `${name}.tsx`);
    fs.writeFileSync(filePath, generateFileContent(name, config));
    count++;
  }
  console.log(`Successfully generated ${count} restaurant pages!`);
}

main();
