
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Workforce"
      title="Attendance"
      stats={[
        { label: "Present today", value: "0 / 0" },
        { label: "Late arrivals", value: "0" },
        { label: "Absence rate", value: "0%", accent: "bg-op-orange/20" },
        { label: "OT hours (wk)", value: "0" },
      ]}
      aiTitle="Absenteeism likely to spike Friday"
      aiBody="Based on last 8 weeks, F&B absenteeism rises 18% on long weekends. Pre-approve standby shifts."
      columns={["Employee", "Dept", "In", "Out", "Status"]}
      rows={[]}
    />
  );
}

export default Page;
