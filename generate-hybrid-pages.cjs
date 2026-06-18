const fs = require('fs');
const path = require('path');

const SCAFFOLD_DIR = path.join(__dirname, 'src', 'features', 'scaffold');

const PAGES = {
  // Revenue Section
  'HybridRevenueTodayPage': {
    title: 'Total Revenue Today', eyebrow: 'Revenue > Today', icon: 'Banknote',
    stats: [{ label: 'Total Sales', value: '$12,450', delta: '+14% vs yesterday' }, { label: 'Transactions', value: '342', delta: '' }],
    columns: "['Time', 'Source', 'Amount', 'Payment Method', 'Status', 'Actions']",
    rows: `[['12:45 PM', 'Restaurant (T12)', '$145.00', 'Credit Card', <span className="text-green-500">Completed</span>, <ActionButtons />], ['1:15 PM', 'Hotel (Room 304)', '$450.00', 'UPI', <span className="text-green-500">Completed</span>, <ActionButtons />]]`
  },
  'HybridRevenueHotelPage': {
    title: 'Hotel Revenue', eyebrow: 'Revenue > Hotel', icon: 'Hotel',
    stats: [{ label: 'Room Revenue', value: '$8,200', delta: 'Today' }, { label: 'Avg Room Rate', value: '$215', delta: '' }],
    columns: "['Booking ID', 'Room Type', 'Nights', 'Total Amount', 'Status', 'Actions']",
    rows: `[['BKG-1024', 'Deluxe King', '3', '$645.00', <span className="text-green-500">Paid</span>, <ActionButtons />]]`
  },
  'HybridRevenueRestaurantPage': {
    title: 'Restaurant Revenue', eyebrow: 'Revenue > Restaurant', icon: 'UtensilsCrossed',
    stats: [{ label: 'F&B Sales', value: '$4,250', delta: 'Today' }, { label: 'Avg Order Value', value: '$45.20', delta: '' }],
    columns: "['Order #', 'Type', 'Items', 'Total Amount', 'Status', 'Actions']",
    rows: `[['ORD-402', 'Dine-In', 'Steak, Wine', '$145.00', <span className="text-green-500">Paid</span>, <ActionButtons />]]`
  },
  'HybridRevenueMonthlyPage': {
    title: 'Monthly Revenue', eyebrow: 'Revenue > Monthly', icon: 'BarChart3',
    stats: [{ label: 'MTD Total', value: '$145,000', delta: '+8% vs last month' }, { label: 'Projected', value: '$210,000', delta: '' }],
    columns: "['Date', 'Hotel Rev', 'Restaurant Rev', 'Total Rev', 'Growth', 'Actions']",
    rows: `[['Oct 15', '$8,200', '$4,250', '$12,450', <span className="text-green-500">+4%</span>, <ActionButtons />]]`
  },
  'HybridRevenueProfitPage': {
    title: 'Profit Overview', eyebrow: 'Revenue > Profit', icon: 'LineChart',
    stats: [{ label: 'Gross Profit Margin', value: '42%', delta: '' }, { label: 'Net Profit (MTD)', value: '$60,900', delta: '' }],
    columns: "['Department', 'Revenue', 'COGS / Expenses', 'Gross Profit', 'Margin %', 'Actions']",
    rows: `[['Hotel Rooms', '$102,000', '$24,000', '$78,000', '76%', <ActionButtons />], ['Restaurant F&B', '$43,000', '$14,000', '$29,000', '67%', <ActionButtons />]]`
  },

  // Hotel Section
  'HybridHotelOccupiedPage': {
    title: 'Occupied Rooms', eyebrow: 'Hotel > Occupancy', icon: 'Bed',
    stats: [{ label: 'Occupancy Rate', value: '84%', delta: '' }, { label: 'Total Guests In-House', value: '210', delta: '' }],
    columns: "['Room #', 'Guest Name', 'Check-In', 'Check-Out', 'Balance', 'Actions']",
    rows: `[['304', 'John Smith', 'Oct 12', 'Oct 16', '$0.00', <ActionButtons />]]`
  },
  'HybridHotelAvailablePage': {
    title: 'Available Rooms', eyebrow: 'Hotel > Availability', icon: 'CheckSquare',
    stats: [{ label: 'Available Tonight', value: '32', delta: '' }, { label: 'Ready to Assign', value: '28', delta: '' }],
    columns: "['Room #', 'Type', 'Floor', 'Status', 'Base Rate', 'Actions']",
    rows: `[['102', 'Deluxe King', '1st', <span className="text-green-500">Clean</span>, '$180.00', <ActionButtons />]]`
  },
  'HybridHotelCheckinsPage': {
    title: 'Today\'s Check-Ins', eyebrow: 'Hotel > Arrivals', icon: 'CheckCircle2',
    stats: [{ label: 'Expected Arrivals', value: '18', delta: '' }, { label: 'Checked In', value: '12', delta: '6 remaining' }],
    columns: "['Guest Name', 'ETA', 'Room Type', 'Assigned Room', 'Status', 'Actions']",
    rows: `[['Emily Davis', '3:00 PM', 'Standard', '105', <span className="text-orange-500">Pending Arrival</span>, <ActionButtons />]]`
  },
  'HybridHotelCheckoutsPage': {
    title: 'Today\'s Check-Outs', eyebrow: 'Hotel > Departures', icon: 'ArrowRightLeft',
    stats: [{ label: 'Expected Departures', value: '24', delta: '' }, { label: 'Checked Out', value: '20', delta: '4 remaining' }],
    columns: "['Room #', 'Guest Name', 'Balance', 'Check-Out Time', 'Status', 'Actions']",
    rows: `[['204', 'Mike Johnson', '$45.00', '11:00 AM', <span className="text-orange-500">Pending Checkout</span>, <ActionButtons />]]`
  },
  'HybridHotelPendingPage': {
    title: 'Pending Bookings', eyebrow: 'Hotel > Pipeline', icon: 'Clock',
    stats: [{ label: 'Unconfirmed', value: '8', delta: 'Action Required' }, { label: 'Deposit Pending', value: '$1,200', delta: '' }],
    columns: "['Booking Ref', 'Guest', 'Dates', 'Total Value', 'Status', 'Actions']",
    rows: `[['BKG-990', 'Sarah Lee', 'Nov 12 - Nov 15', '$850.00', <span className="text-orange-500">Awaiting Deposit</span>, <ActionButtons />]]`
  },

  // Restaurant Section
  'HybridRestaurantTablesPage': {
    title: 'Active Tables', eyebrow: 'Restaurant > Dining Area', icon: 'Table2',
    stats: [{ label: 'Seated Guests', value: '45', delta: '' }, { label: 'Table Turn Rate', value: '45m', delta: 'Avg' }],
    columns: "['Table #', 'Party Size', 'Time Seated', 'Current Tab', 'Server', 'Actions']",
    rows: `[['Table 12', '4', '6:30 PM', '$145.00', 'Sarah', <ActionButtons />]]`
  },
  'HybridRestaurantOrdersPage': {
    title: 'Orders In Progress', eyebrow: 'Restaurant > Live Orders', icon: 'Activity',
    stats: [{ label: 'Live Orders', value: '14', delta: '' }, { label: 'Avg Fulfillment', value: '18m', delta: '' }],
    columns: "['Order #', 'Type', 'Items', 'Time Placed', 'Status', 'Actions']",
    rows: `[['ORD-402', 'Dine-In', '2x Burger', '7:15 PM', <span className="text-orange-500">Cooking</span>, <ActionButtons />]]`
  },
  'HybridRestaurantKitchenPage': {
    title: 'Kitchen Pending', eyebrow: 'Restaurant > KDS', icon: 'ChefHat',
    stats: [{ label: 'Tickets Pending', value: '8', delta: '' }, { label: 'Oldest Ticket', value: '12m', delta: '' }],
    columns: "['Ticket #', 'Station', 'Items', 'Timer', 'Priority', 'Actions']",
    rows: `[['TKT-082', 'Grill', '2x Steak', '12:00', 'High', <ActionButtons />]]`
  },
  'HybridRestaurantCustomersPage': {
    title: 'Today\'s Customers', eyebrow: 'Restaurant > Footfall', icon: 'Users',
    stats: [{ label: 'Total Covers', value: '142', delta: 'Today' }, { label: 'Walk-ins', value: '85', delta: '' }],
    columns: "['Customer Name', 'Party Size', 'Time', 'Total Spent', 'Type', 'Actions']",
    rows: `[['Walk-in', '2', '7:00 PM', '$65.00', 'New', <ActionButtons />]]`
  },

  // Inventory Section
  'HybridInventoryAlertsPage': {
    title: 'Low Stock Alerts', eyebrow: 'Inventory > Alerts', icon: 'AlertTriangle',
    stats: [{ label: 'Critical Items', value: '4', delta: 'Order Immediately' }, { label: 'Warnings', value: '12', delta: '' }],
    columns: "['Item', 'Category', 'Current Stock', 'Min Threshold', 'Supplier', 'Actions']",
    rows: `[['Towel (Bath)', 'Hotel Linens', '15', '20', 'Linen Co', <ActionButtons />], ['Olive Oil', 'Kitchen Prep', '2 L', '5 L', 'Gourmet Foods', <ActionButtons />]]`
  },
  'HybridInventoryValuePage': {
    title: 'Inventory Value', eyebrow: 'Inventory > Valuation', icon: 'DollarSign',
    stats: [{ label: 'Total Capital Tied', value: '$45,200', delta: '' }, { label: 'F&B Value', value: '$12,500', delta: '' }],
    columns: "['Category', 'Total Items', 'Units in Stock', 'Total Value', 'Last Audit', 'Actions']",
    rows: `[['Kitchen Prep', '145', '850 lbs', '$8,400', 'Yesterday', <ActionButtons />], ['Hotel Amenities', '45', '2,400 units', '$3,200', 'Last Week', <ActionButtons />]]`
  },
  'HybridInventoryPurchasesPage': {
    title: 'Purchase Requests', eyebrow: 'Inventory > Procurement', icon: 'ClipboardList',
    stats: [{ label: 'Pending Requests', value: '8', delta: 'Awaiting Approval' }, { label: 'Approved Value', value: '$4,500', delta: 'This Week' }],
    columns: "['Request ID', 'Department', 'Requested By', 'Items', 'Est. Cost', 'Actions']",
    rows: `[['PR-102', 'Kitchen', 'Chef Mario', 'Meat & Poultry', '$1,200', <span className="text-orange-500">Pending</span>, <ActionButtons />]]`
  },

  // Staff Section
  'HybridStaffOndutyPage': {
    title: 'Staff On Duty', eyebrow: 'Staff > Roster', icon: 'UserCheck',
    stats: [{ label: 'Currently Clocked In', value: '24', delta: '' }, { label: 'Hotel/Rest Ratio', value: '14/10', delta: '' }],
    columns: "['Name', 'Department', 'Role', 'Clock In', 'Shift Ends', 'Actions']",
    rows: `[['Maria Gomez', 'Hotel', 'Housekeeper', '6:00 AM', '2:00 PM', <ActionButtons />], ['Sarah Lee', 'Restaurant', 'Server', '10:00 AM', '6:00 PM', <ActionButtons />]]`
  },
  'HybridStaffAttendancePage': {
    title: 'Attendance Summary', eyebrow: 'Staff > Records', icon: 'ClipboardList',
    stats: [{ label: 'Attendance Rate', value: '96%', delta: 'This Week' }, { label: 'Absences', value: '2', delta: '' }],
    columns: "['Date', 'Scheduled Staff', 'Present', 'Late', 'Absent', 'Actions']",
    rows: `[['Today', '26', '24', '2', '0', <ActionButtons />]]`
  },
  'HybridStaffShiftsPage': {
    title: 'Shift Status', eyebrow: 'Staff > Scheduling', icon: 'Clock',
    stats: [{ label: 'Upcoming Shifts', value: '45', delta: 'Next 3 Days' }, { label: 'Open Shifts', value: '4', delta: 'Coverage Needed' }],
    columns: "['Shift', 'Time', 'Department', 'Required', 'Filled', 'Actions']",
    rows: `[['Morning', '6AM - 2PM', 'Housekeeping', '8', '8', <span className="text-green-500">Covered</span>, <ActionButtons />]]`
  },

  // Customer Insights
  'HybridCustomersTotalPage': {
    title: 'Total Guests', eyebrow: 'Customers > Overview', icon: 'Users',
    stats: [{ label: 'Unique Guests', value: '18,450', delta: 'Lifetime' }, { label: 'Cross-over', value: '14%', delta: 'Stayed & Dined' }],
    columns: "['Guest Name', 'First Visit', 'Total Hotel Stays', 'Total Dining Visits', 'LTV', 'Actions']",
    rows: `[['John Smith', 'Jan 2022', '4', '12', '$3,450', <ActionButtons />]]`
  },
  'HybridCustomersRepeatPage': {
    title: 'Repeat Customers', eyebrow: 'Customers > Retention', icon: 'UserPlus',
    stats: [{ label: 'Repeat Rate (Hotel)', value: '28%', delta: '' }, { label: 'Repeat Rate (F&B)', value: '42%', delta: '' }],
    columns: "['Guest Name', 'Last Visit', 'Days Since Last', 'Preferred Dept', 'Status', 'Actions']",
    rows: `[['Sarah Lee', '2 Weeks Ago', '14', 'Restaurant', <span className="text-green-500">Active</span>, <ActionButtons />]]`
  },
  'HybridCustomersLoyaltyPage': {
    title: 'Loyalty Members', eyebrow: 'Customers > Loyalty', icon: 'Heart',
    stats: [{ label: 'Total Members', value: '4,200', delta: '' }, { label: 'Points Liability', value: '1.2M', delta: 'Unredeemed' }],
    columns: "['Member Name', 'Tier', 'Points Balance', 'Recent Activity', 'Actions']",
    rows: `[['John Smith', 'Gold', '14,500', 'Earned 450 (Dining)', <ActionButtons />]]`
  },
  'HybridCustomersCsatPage': {
    title: 'Customer Satisfaction Score', eyebrow: 'Customers > Feedback', icon: 'MessageCircle',
    stats: [{ label: 'Hotel CSAT', value: '4.6/5', delta: '' }, { label: 'Restaurant CSAT', value: '4.8/5', delta: '' }],
    columns: "['Source', 'Guest', 'Rating', 'Feedback', 'Date', 'Actions']",
    rows: `[['Hotel (Checkout)', 'Mike Johnson', '⭐⭐⭐⭐', 'Good room, slow WiFi.', 'Today', <ActionButtons />], ['Restaurant (POS)', 'Sarah', '⭐⭐⭐⭐⭐', 'Great food!', 'Yesterday', <ActionButtons />]]`
  },

  // Financial Section
  'HybridFinanceExpensesPage': {
    title: 'Expenses', eyebrow: 'Finance > Outflow', icon: 'Wallet',
    stats: [{ label: 'Total Expenses (MTD)', value: '$42,500', delta: 'On budget' }, { label: 'Largest Category', value: 'Payroll', delta: '65%' }],
    columns: "['Date', 'Category', 'Description', 'Amount', 'Approved By', 'Actions']",
    rows: `[['Oct 14', 'Inventory (F&B)', 'Sysco Delivery', '$1,200', 'Chef Mario', <ActionButtons />]]`
  },
  'HybridFinanceIncomePage': {
    title: 'Income', eyebrow: 'Finance > Inflow', icon: 'HandCoins',
    stats: [{ label: 'Total Income (MTD)', value: '$145,000', delta: '' }, { label: 'Receivables', value: '$8,400', delta: 'Pending Invoices' }],
    columns: "['Date', 'Source', 'Description', 'Amount', 'Status', 'Actions']",
    rows: `[['Today', 'Credit Card Settlement', 'Stripe Batch #42', '$4,200', <span className="text-green-500">Cleared</span>, <ActionButtons />]]`
  },
  'HybridFinanceProfitPage': {
    title: 'Net Profit', eyebrow: 'Finance > Bottom Line', icon: 'TrendingUp',
    stats: [{ label: 'Net Profit (MTD)', value: '$60,900', delta: '42% Margin' }, { label: 'EBITDA', value: '$55,000', delta: '' }],
    columns: "['Month', 'Total Income', 'Total Expenses', 'Net Profit', 'Margin', 'Actions']",
    rows: `[['September 2023', '$240,000', '$140,000', '$100,000', '41.6%', <ActionButtons />]]`
  },
  'HybridFinanceGstPage': {
    title: 'GST Summary', eyebrow: 'Finance > Taxes', icon: 'Receipt',
    stats: [{ label: 'GST Collected', value: '$12,450', delta: 'MTD' }, { label: 'GST Paid (Input)', value: '$4,200', delta: 'MTD' }],
    columns: "['Month', 'Total Collected', 'Total Paid (Input)', 'Net Payable', 'Status', 'Actions']",
    rows: `[['September 2023', '$21,000', '$8,000', '$13,000', <span className="text-green-500">Filed & Paid</span>, <ActionButtons />]]`
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
  console.log(`Successfully generated ${count} hybrid pages!`);
}

main();
