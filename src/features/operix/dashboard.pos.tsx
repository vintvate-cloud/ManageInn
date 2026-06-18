
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Food & Beverage"
      title="Restaurant POS"
      stats={[
        { label: "Open tables", value: "0 / 0" },
        { label: "Avg ticket", value: "₹0" },
        { label: "Sales today", value: "₹0", accent: "bg-op-purple/20" },
        { label: "Top dish", value: "Tikka" },
      ]}
      aiTitle="Cut 18% food waste this week with menu rebalancing"
      aiBody="Demand forecast suggests reducing prep of low-velocity items by 22% and adding a chef's special tied to forecast occupancy."
      columns={["Table", "Order", "Items", "Total", "Status"]}
      rows={[]}
    />
  );
}

export default Page;
