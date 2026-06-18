
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Engineering"
      title="Maintenance"
      stats={[
        { label: "Open work orders", value: "0" },
        { label: "Predictive alerts", value: "0", accent: "bg-op-orange/20" },
        { label: "MTTR", value: "0" },
        { label: "Asset uptime", value: "0%" },
      ]}
      aiTitle="AC Unit 202 — 83% chance of failure in 15 days"
      aiBody="Vibration & temperature anomalies detected across last 7 days. Schedule preventive service before peak weekend."
      columns={["Asset", "Issue", "Priority", "Assignee", "ETA"]}
      rows={[]}
    />
  );
}

export default Page;
