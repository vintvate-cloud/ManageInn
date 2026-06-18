
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Supply"
      title="Procurement"
      stats={[
        { label: "Active POs", value: "0" },
        { label: "Pending approvals", value: "0" },
        { label: "Vendors", value: "0" },
        { label: "Spend (MTD)", value: "₹0" },
      ]}
      aiTitle="Price anomaly on bulk rice from Vendor #214"
      aiBody="Last invoice priced 11% above 90-day average and 7% above the market median. Flagged for review."
      columns={["PO #", "Vendor", "Items", "Amount", "Status"]}
      rows={[]}
    />
  );
}

export default Page;
