const fs = require('fs');
const path = require('path');

const SCAFFOLD_DIR = path.join(__dirname, 'src', 'features', 'scaffold');

const PAGES = {
  // Room Management
  'HotelRoomsPage': {
    title: 'Room Status',
    eyebrow: 'Room Management > Status Tracker',
    icon: 'Bed',
    stats: [
      { label: 'Total Rooms', value: '120', delta: '+2' },
      { label: 'Occupied', value: '84', delta: '70%' },
      { label: 'Available', value: '32', delta: '26%' },
      { label: 'Maintenance', value: '4', delta: '4%' }
    ],
    columns: "['Room #', 'Type', 'Status', 'Floor', 'Housekeeping', 'Actions']",
    rows: `[
      ['101', 'Deluxe King', <span className="text-blue-500 bg-blue-500/10 px-2 py-1 rounded">Occupied</span>, '1st Floor', 'Clean', <ActionButtons />],
      ['102', 'Double Queen', <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded">Available</span>, '1st Floor', 'Clean', <ActionButtons />],
      ['205', 'Executive Suite', <span className="text-orange-500 bg-orange-500/10 px-2 py-1 rounded">Maintenance</span>, '2nd Floor', 'Dirty', <ActionButtons />],
      ['310', 'Presidential', <span className="text-blue-500 bg-blue-500/10 px-2 py-1 rounded">Occupied</span>, '3rd Floor', 'In Progress', <ActionButtons />],
    ]`
  },
  'HotelCategoriesPage': {
    title: 'Room Categories',
    eyebrow: 'Room Management > Categories',
    icon: 'Layers',
    stats: [
      { label: 'Categories', value: '6', delta: '' },
      { label: 'Most Popular', value: 'Deluxe King', delta: '' }
    ],
    columns: "['Category', 'Base Price', 'Max Occ.', 'Total Rooms', 'Actions']",
    rows: `[
      ['Standard Room', '$120/night', '2 Guests', '45 Rooms', <ActionButtons />],
      ['Deluxe King', '$180/night', '2 Guests', '40 Rooms', <ActionButtons />],
      ['Executive Suite', '$350/night', '4 Guests', '10 Rooms', <ActionButtons />],
    ]`
  },
  'HotelPricingPage': {
    title: 'Pricing Management',
    eyebrow: 'Room Management > Pricing',
    icon: 'DollarSign',
    stats: [
      { label: 'Avg Base Rate', value: '$210', delta: '+5%' },
      { label: 'Active Promos', value: '3', delta: '' }
    ],
    columns: "['Room Category', 'Base Rate', 'Weekend Rate', 'Holiday Rate', 'Actions']",
    rows: `[
      ['Standard Room', '$120', '$150', '$180', <ActionButtons />],
      ['Deluxe King', '$180', '$220', '$250', <ActionButtons />],
    ]`
  },
  'HotelDynamicPricingPage': {
    title: 'Dynamic Pricing Settings',
    eyebrow: 'Room Management > Dynamic Rates',
    icon: 'Sparkles',
    stats: [
      { label: 'Auto Pricing', value: 'Enabled', delta: '' },
      { label: 'Current Multiplier', value: '1.2x', delta: 'High Demand' }
    ],
    columns: "['Rule Name', 'Condition', 'Price Adjustment', 'Status', 'Actions']",
    rows: `[
      ['Weekend Surge', 'Friday - Sunday', '+20%', <span className="text-green-500">Active</span>, <ActionButtons />],
      ['Last Minute Drop', 'Same Day Unbooked', '-15%', <span className="text-green-500">Active</span>, <ActionButtons />],
    ]`
  },
  'HotelUpgradesPage': {
    title: 'Room Upgrades',
    eyebrow: 'Room Management > Upgrades',
    icon: 'ArrowUpCircle',
    stats: [
      { label: 'Upgrades Today', value: '5', delta: '' },
      { label: 'Upsell Revenue', value: '$850', delta: '+12%' }
    ],
    columns: "['Guest', 'Original Room', 'Upgraded To', 'Fee Collected', 'Status', 'Actions']",
    rows: `[
      ['John Smith', 'Standard (101)', 'Deluxe (204)', '$60', <span className="text-green-500">Completed</span>, <ActionButtons />],
      ['Sarah Lee', 'Deluxe (302)', 'Suite (405)', '$120', <span className="text-green-500">Completed</span>, <ActionButtons />],
    ]`
  },

  // Housekeeping
  'HotelHousekeepingPage': {
    title: 'Cleaning Schedule',
    eyebrow: 'Housekeeping > Schedule',
    icon: 'Clock',
    stats: [
      { label: 'Dirty Rooms', value: '24', delta: 'Requires Cleaning' },
      { label: 'In Progress', value: '8', delta: '' },
      { label: 'Cleaned Today', value: '45', delta: '' }
    ],
    columns: "['Room #', 'Status', 'Assigned To', 'Priority', 'Actions']",
    rows: `[
      ['102', <span className="text-orange-500">Dirty - Checkout</span>, 'Maria Gomez', 'High', <ActionButtons />],
      ['204', <span className="text-blue-500">In Progress</span>, 'Carlos Ruiz', 'Normal', <ActionButtons />],
      ['305', <span className="text-red-500">Dirty - Make Up</span>, 'Unassigned', 'High', <ActionButtons />],
    ]`
  },
  'HotelHousekeepingStaffPage': {
    title: 'Housekeeping Staff',
    eyebrow: 'Housekeeping > Staff Assignment',
    icon: 'Users',
    stats: [
      { label: 'On Duty', value: '12', delta: '' },
      { label: 'Rooms/Staff Avg', value: '8.5', delta: '' }
    ],
    columns: "['Staff Name', 'Shift', 'Rooms Assigned', 'Completed', 'Actions']",
    rows: `[
      ['Maria Gomez', 'Morning (6am-2pm)', '10', '8', <ActionButtons />],
      ['Carlos Ruiz', 'Morning (6am-2pm)', '12', '12', <ActionButtons />],
    ]`
  },
  'HotelInspectionsPage': {
    title: 'Room Inspections',
    eyebrow: 'Housekeeping > Quality Control',
    icon: 'CheckSquare',
    stats: [
      { label: 'Pending Inspection', value: '14', delta: '' },
      { label: 'Passed', value: '42', delta: '' }
    ],
    columns: "['Room #', 'Cleaned By', 'Inspector', 'Result', 'Time', 'Actions']",
    rows: `[
      ['401', 'Maria Gomez', 'Sarah (Manager)', <span className="text-green-500">Pass</span>, '10:30 AM', <ActionButtons />],
      ['402', 'Carlos Ruiz', 'Sarah (Manager)', <span className="text-red-500">Fail (Dust)</span>, '10:45 AM', <ActionButtons />],
    ]`
  },
  'HotelLaundryPage': {
    title: 'Laundry Management',
    eyebrow: 'Housekeeping > Laundry',
    icon: 'Shirt',
    stats: [
      { label: 'Loads Today', value: '18', delta: '' },
      { label: 'Guest Requests', value: '4', delta: '2 Pending' }
    ],
    columns: "['Type', 'Batch ID', 'Weight', 'Status', 'Expected', 'Actions']",
    rows: `[
      ['Bedding', 'B-1024', '45 lbs', <span className="text-orange-500">Washing</span>, '1:00 PM', <ActionButtons />],
      ['Guest (Room 304)', 'G-082', '5 lbs', <span className="text-blue-500">Drying</span>, '2:30 PM', <ActionButtons />],
    ]`
  },

  // Billing
  'HotelInvoicesPage': {
    title: 'Invoices',
    eyebrow: 'Billing & Payments > Invoices',
    icon: 'FileText',
    stats: [
      { label: 'Generated Today', value: '28', delta: '' },
      { label: 'Pending Payment', value: '5', delta: '$1,240' }
    ],
    columns: "['Invoice #', 'Guest', 'Amount', 'Date', 'Status', 'Actions']",
    rows: `[
      ['INV-9901', 'John Smith', '$450.00', 'Today', <span className="text-green-500">Paid</span>, <ActionButtons />],
      ['INV-9902', 'Corporate Corp', '$1250.00', 'Yesterday', <span className="text-orange-500">Pending</span>, <ActionButtons />],
    ]`
  },
  'HotelGstPage': {
    title: 'GST & Taxes',
    eyebrow: 'Billing & Payments > Taxes',
    icon: 'Receipt',
    stats: [
      { label: 'GST Collected (MTD)', value: '$8,450', delta: '' },
      { label: 'Pending Filing', value: 'Q3 2024', delta: '' }
    ],
    columns: "['Invoice #', 'Base Amount', 'GST (18%)', 'Total', 'Date', 'Actions']",
    rows: `[
      ['INV-9901', '$381.35', '$68.65', '$450.00', 'Today', <ActionButtons />],
      ['INV-9902', '$1059.32', '$190.68', '$1250.00', 'Yesterday', <ActionButtons />],
    ]`
  },
  'HotelPaymentsPage': {
    title: 'Payment Tracking',
    eyebrow: 'Billing & Payments > Payments',
    icon: 'CreditCard',
    stats: [
      { label: 'Card Payments', value: '$4,200', delta: 'Today' },
      { label: 'Cash/UPI', value: '$850', delta: 'Today' }
    ],
    columns: "['Transaction ID', 'Guest', 'Amount', 'Method', 'Time', 'Actions']",
    rows: `[
      ['TXN-4482', 'John Smith', '$450.00', 'Credit Card (Visa)', '10:45 AM', <ActionButtons />],
      ['TXN-4483', 'Sarah Lee', '$120.00', 'UPI', '11:15 AM', <ActionButtons />],
    ]`
  },
  'HotelRefundsPage': {
    title: 'Refunds',
    eyebrow: 'Billing & Payments > Refunds',
    icon: 'Wallet',
    stats: [
      { label: 'Pending Refunds', value: '2', delta: '$350' },
      { label: 'Processed', value: '14', delta: 'This Week' }
    ],
    columns: "['Refund ID', 'Guest', 'Amount', 'Reason', 'Status', 'Actions']",
    rows: `[
      ['REF-012', 'Mike Johnson', '$150.00', 'Cancellation', <span className="text-orange-500">Processing</span>, <ActionButtons />],
    ]`
  },
  'HotelDuesPage': {
    title: 'Outstanding Dues',
    eyebrow: 'Billing & Payments > Dues',
    icon: 'AlertTriangle',
    stats: [
      { label: 'Total Outstanding', value: '$4,850', delta: '' },
      { label: 'Overdue > 30 Days', value: '$1,200', delta: '' }
    ],
    columns: "['Guest / Company', 'Amount Due', 'Days Overdue', 'Last Contacted', 'Actions']",
    rows: `[
      ['Corporate Travels LLC', '$1,200.00', '34 Days', '2 Days Ago', <ActionButtons />],
      ['Emma Davis', '$450.00', '5 Days', 'Today', <ActionButtons />],
    ]`
  },

  // Guests
  'HotelGuestsPage': {
    title: 'Guest Database',
    eyebrow: 'Guest Management > CRM',
    icon: 'Users',
    stats: [
      { label: 'Total Profiles', value: '14,205', delta: '' },
      { label: 'New This Month', value: '342', delta: '' }
    ],
    columns: "['Name', 'Email', 'Total Stays', 'Lifetime Value', 'Loyalty Tier', 'Actions']",
    rows: `[
      ['John Smith', 'john@example.com', '12', '$4,500', <span className="text-purple-500">Gold</span>, <ActionButtons />],
      ['Sarah Lee', 'sarah@example.com', '3', '$850', <span className="text-slate-500">Silver</span>, <ActionButtons />],
    ]`
  },
  'HotelLoyaltyPage': {
    title: 'Loyalty Program',
    eyebrow: 'Guest Management > Loyalty',
    icon: 'Heart',
    stats: [
      { label: 'Active Members', value: '4,800', delta: '33% of base' },
      { label: 'Points Redeemed', value: '450K', delta: 'YTD' }
    ],
    columns: "['Tier', 'Members', 'Benefits', 'Avg Lifetime Value', 'Actions']",
    rows: `[
      ['Platinum', '450', 'Late Checkout, Upgrades', '$8,500', <ActionButtons />],
      ['Gold', '1,200', 'Late Checkout', '$4,200', <ActionButtons />],
      ['Silver', '3,150', 'Welcome Drink', '$1,100', <ActionButtons />],
    ]`
  },
  'HotelFeedbackPage': {
    title: 'Guest Feedback',
    eyebrow: 'Guest Management > Reviews',
    icon: 'MessageCircle',
    stats: [
      { label: 'Avg Rating', value: '4.6/5', delta: '+0.2' },
      { label: 'NPS Score', value: '68', delta: 'Excellent' }
    ],
    columns: "['Guest', 'Rating', 'Review', 'Date', 'Status', 'Actions']",
    rows: `[
      ['John Smith', '⭐⭐⭐⭐⭐', 'Great stay, loved the pool.', 'Today', <span className="text-green-500">Responded</span>, <ActionButtons />],
      ['Mike Johnson', '⭐⭐⭐', 'AC was a bit noisy.', 'Yesterday', <span className="text-orange-500">Requires Follow-up</span>, <ActionButtons />],
    ]`
  },
  'HotelRequestsPage': {
    title: 'Special Requests',
    eyebrow: 'Guest Management > Requests',
    icon: 'BellRing',
    stats: [
      { label: 'Open Requests', value: '8', delta: '' },
      { label: 'Avg Resolution', value: '14 mins', delta: '' }
    ],
    columns: "['Room', 'Guest', 'Request Type', 'Time', 'Status', 'Actions']",
    rows: `[
      ['304', 'Sarah Lee', 'Extra Towels', '10:45 AM', <span className="text-orange-500">Pending</span>, <ActionButtons />],
      ['412', 'David Kim', 'Late Checkout (2 PM)', '9:00 AM', <span className="text-green-500">Approved</span>, <ActionButtons />],
    ]`
  },

  // Reports
  'HotelReportsOccupancyPage': {
    title: 'Occupancy Reports',
    eyebrow: 'Reports & Analytics > Occupancy',
    icon: 'PieChart',
    stats: [
      { label: 'MTD Occupancy', value: '78%', delta: '+4%' },
      { label: 'YTD Occupancy', value: '74%', delta: '' }
    ],
    columns: "['Date', 'Total Rooms', 'Occupied', 'Available', 'Occupancy %', 'Actions']",
    rows: `[
      ['Today', '120', '98', '22', '81.6%', <ActionButtons />],
      ['Yesterday', '120', '95', '25', '79.1%', <ActionButtons />],
    ]`
  },
  'HotelReportsRevenuePage': {
    title: 'Revenue Reports',
    eyebrow: 'Reports & Analytics > Revenue',
    icon: 'BarChart3',
    stats: [
      { label: 'MTD Revenue', value: '$84,500', delta: '+12%' },
      { label: 'Room Revenue', value: '$62,000', delta: '73% of total' }
    ],
    columns: "['Date', 'Room Rev', 'F&B Rev', 'Other Rev', 'Total Rev', 'Actions']",
    rows: `[
      ['Today', '$4,200', '$1,100', '$300', '$5,600', <ActionButtons />],
      ['Yesterday', '$3,800', '$950', '$200', '$4,950', <ActionButtons />],
    ]`
  },
  'HotelReportsArrPage': {
    title: 'Average Room Rate (ARR)',
    eyebrow: 'Reports & Analytics > ARR',
    icon: 'DollarSign',
    stats: [
      { label: 'MTD ARR', value: '$215', delta: '+5%' },
      { label: 'Target ARR', value: '$200', delta: '' }
    ],
    columns: "['Date', 'Rooms Sold', 'Room Revenue', 'ARR', 'Variance', 'Actions']",
    rows: `[
      ['Today', '98', '$21,070', '$215.00', '+7.5%', <ActionButtons />],
      ['Yesterday', '95', '$19,475', '$205.00', '+2.5%', <ActionButtons />],
    ]`
  },
  'HotelReportsRevparPage': {
    title: 'RevPAR',
    eyebrow: 'Reports & Analytics > RevPAR',
    icon: 'TrendingUp',
    stats: [
      { label: 'MTD RevPAR', value: '$167.70', delta: '+8%' },
      { label: 'CompSet Index', value: '112', delta: 'Leading' }
    ],
    columns: "['Date', 'Total Rooms', 'Occupancy', 'ARR', 'RevPAR', 'Actions']",
    rows: `[
      ['Today', '120', '81.6%', '$215.00', '$175.44', <ActionButtons />],
      ['Yesterday', '120', '79.1%', '$205.00', '$162.15', <ActionButtons />],
    ]`
  },
  'HotelReportsProfitPage': {
    title: 'Profit & Loss',
    eyebrow: 'Reports & Analytics > Profit',
    icon: 'LineChart',
    stats: [
      { label: 'Gross Operating Profit', value: '42%', delta: '' },
      { label: 'Net Profit', value: '28%', delta: '' }
    ],
    columns: "['Month', 'Total Revenue', 'Total Expenses', 'GOP', 'Net Profit', 'Actions']",
    rows: `[
      ['September 2023', '$245,000', '$142,100', '$102,900', '$68,600', <ActionButtons />],
      ['August 2023', '$260,000', '$148,000', '$112,000', '$72,800', <ActionButtons />],
    ]`
  },

  // Staff
  'HotelStaffAttendancePage': {
    title: 'Staff Attendance',
    eyebrow: 'Staff Management > Attendance',
    icon: 'ClipboardList',
    stats: [
      { label: 'Present Today', value: '42/45', delta: '93%' },
      { label: 'Late', value: '2', delta: '' }
    ],
    columns: "['Employee', 'Department', 'Clock In', 'Clock Out', 'Status', 'Actions']",
    rows: `[
      ['Maria Gomez', 'Housekeeping', '05:55 AM', '--', <span className="text-green-500">Present</span>, <ActionButtons />],
      ['David Kim', 'Front Desk', '07:15 AM', '--', <span className="text-orange-500">Late</span>, <ActionButtons />],
    ]`
  },
  'HotelStaffPayrollPage': {
    title: 'Payroll',
    eyebrow: 'Staff Management > Payroll',
    icon: 'Banknote',
    stats: [
      { label: 'Total Payroll (MTD)', value: '$34,500', delta: '' },
      { label: 'Next Processing', value: 'Oct 31', delta: '' }
    ],
    columns: "['Employee', 'Role', 'Hours Worked', 'Rate', 'Gross Pay', 'Actions']",
    rows: `[
      ['Maria Gomez', 'Housekeeper', '120', '$18/hr', '$2,160', <ActionButtons />],
      ['David Kim', 'Front Desk', '135', '$22/hr', '$2,970', <ActionButtons />],
    ]`
  },
  'HotelStaffShiftsPage': {
    title: 'Shift Scheduling',
    eyebrow: 'Staff Management > Shifts',
    icon: 'Clock',
    stats: [
      { label: 'Open Shifts', value: '3', delta: 'Next 7 Days' },
      { label: 'Overtime Alerts', value: '1', delta: 'Review Required' }
    ],
    columns: "['Date', 'Shift', 'Department', 'Assigned To', 'Status', 'Actions']",
    rows: `[
      ['Tomorrow', 'Morning (6A-2P)', 'Housekeeping', 'Maria Gomez', <span className="text-green-500">Confirmed</span>, <ActionButtons />],
      ['Tomorrow', 'Night (10P-6A)', 'Front Desk', 'Unassigned', <span className="text-red-500">Open</span>, <ActionButtons />],
    ]`
  },
  'HotelStaffTasksPage': {
    title: 'Task Management',
    eyebrow: 'Staff Management > Tasks',
    icon: 'CheckSquare',
    stats: [
      { label: 'Open Tasks', value: '14', delta: '' },
      { label: 'Completed Today', value: '28', delta: '' }
    ],
    columns: "['Task', 'Assigned To', 'Priority', 'Deadline', 'Status', 'Actions']",
    rows: `[
      ['Fix AC in 304', 'Maintenance', 'High', 'Today 2:00 PM', <span className="text-orange-500">In Progress</span>, <ActionButtons />],
      ['Setup Conf Room A', 'Housekeeping', 'Normal', 'Tomorrow 8:00 AM', <span className="text-blue-500">Pending</span>, <ActionButtons />],
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        
        <div className="p-4 border-t border-border flex justify-between items-center text-sm text-muted-foreground bg-muted/10">
          <div>Showing 1 to ${config.rows.split('],').length - 1} of 48 results</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-border bg-op-purple text-foreground rounded">1</button>
            <button className="px-3 py-1 border border-border rounded hover:bg-muted">2</button>
            <button className="px-3 py-1 border border-border rounded hover:bg-muted">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <button className="p-1.5 hover:bg-muted rounded-md hover:text-foreground transition-colors" title="Edit"><Edit className="h-4 w-4" /></button>
      <button className="p-1.5 hover:bg-red-500/10 rounded-md hover:text-red-500 transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
      <button className="p-1.5 hover:bg-muted rounded-md hover:text-foreground transition-colors"><MoreHorizontal className="h-4 w-4" /></button>
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
  
  // Create redirects for Front Office pages to the Dashboard Tab
  const FRONT_OFFICE_PAGES = [
    'HotelBookingPage', 'HotelCheckinPage', 'HotelCalendarPage', 
    'HotelWalkinPage', 'HotelGroupBookingPage', 'HotelAvailabilityPage', 'HotelHistoryPage'
  ];
  
  for (const name of FRONT_OFFICE_PAGES) {
    const filePath = path.join(SCAFFOLD_DIR, `${name}.tsx`);
    const content = `import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ${name}() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/dashboard/hotel/frontoffice', { replace: true });
  }, [navigate]);
  return null;
}
`;
    fs.writeFileSync(filePath, content);
    count++;
  }
  
  console.log(`Successfully generated ${count} pages!`);
}

main();
