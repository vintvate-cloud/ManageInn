
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Trust"
      title="Security Center"
      stats={[
        { label: "Active sessions", value: "0" },
        { label: "Failed logins (24h)", value: "0" },
        { label: "Alerts", value: "0", accent: "bg-op-orange/20" },
        { label: "Compliance", value: "0" },
      ]}
      aiTitle="Insider threat signal on accounts user-2241"
      aiBody="Bulk export of guest profiles outside normal pattern. Account paused pending review."
      columns={["Event", "Actor", "IP", "Risk", "When"]}
      rows={[]}
    />
  );
}

export default Page;
