
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="HR & Finance"
      title="Payroll"
      stats={[
        { label: "Monthly run", value: "₹0" },
        { label: "Headcount", value: "0" },
        { label: "PF / ESI / TDS", value: "Compliant" },
        { label: "Anomalies", value: "0", accent: "bg-op-orange/20" },
      ]}
      aiTitle="3 payroll anomalies flagged for review"
      aiBody="Two duplicate OT submissions and one mismatched bank account detected before this month's run."
      columns={["Employee", "Gross", "Deductions", "Net", "Status"]}
      rows={[]}
    />
  );
}

export default Page;
