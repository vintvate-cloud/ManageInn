
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Guest AI"
      title="AI Concierge"
      stats={[
        { label: "Conversations (24h)", value: "0" },
        { label: "Resolution rate", value: "0%", accent: "bg-op-purple/20" },
        { label: "Channels", value: "Web · WA · App" },
        { label: "Avg response", value: "0" },
      ]}
      aiTitle="42 guests requested late checkout — auto-approved 31"
      aiBody="Concierge identified low-impact requests against today's occupancy and auto-approved without staff queue."
      columns={["Guest", "Channel", "Intent", "Outcome", "Time"]}
      rows={[]}
    />
  );
}

export default Page;
