
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Stock"
      title="Inventory"
      stats={[
        { label: "SKUs tracked", value: "0" },
        { label: "Low stock", value: "0", accent: "bg-op-orange/20" },
        { label: "Wastage (mo)", value: "0%" },
        { label: "Stock value", value: "₹0" },
      ]}
      aiTitle="Reorder linen for 96-room property in 4 days"
      aiBody="Consumption forecast based on next week's occupancy and laundry cycle. Auto-PO drafted to vendor Sterling Textiles."
      columns={["Item", "Category", "On hand", "Reorder", "Vendor"]}
      rows={[]}
    />
  );
}

export default Page;
