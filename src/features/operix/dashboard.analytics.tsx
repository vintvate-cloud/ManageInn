
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Business Intelligence"
      title="Analytics"
      stats={[
        { label: "Occupancy", value: "0%" },
        { label: "ADR", value: "₹0" },
        { label: "RevPAR", value: "₹0", accent: "bg-op-purple/20" },
        { label: "GOPPAR", value: "₹0" },
      ]}
      aiTitle="Why did revenue drop last week?"
      aiBody="Drop driven by 6.2% ADR decline on Wed–Thu, caused by competitor flash sale. F&B revenue offset 41% of the gap."
      columns={["KPI", "This week", "Last week", "Δ", "Trend"]}
      rows={[]}
    />
  );
}

export default Page;
