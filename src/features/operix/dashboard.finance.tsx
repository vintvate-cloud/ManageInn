
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Books"
      title="Finance & Accounting"
      stats={[
        { label: "Revenue (MTD)", value: "₹0" },
        { label: "Expenses (MTD)", value: "₹0" },
        { label: "Net margin", value: "0%", accent: "bg-op-purple/20" },
        { label: "Cash on hand", value: "₹0" },
      ]}
      aiTitle="Cash flow positive through Q3"
      aiBody="Forecast based on confirmed bookings, vendor terms, and seasonal pattern. Suggested CAPEX window opens Sep 15."
      columns={["Account", "Type", "Debit", "Credit", "Balance"]}
      rows={[]}
    />
  );
}

export default Page;
