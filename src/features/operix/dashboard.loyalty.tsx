
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Guest retention"
      title="Loyalty"
      stats={[
        { label: "Members", value: "0" },
        { label: "Tier upgrades (mo)", value: "0" },
        { label: "Churn risk", value: "0", accent: "bg-op-orange/20" },
        { label: "Points issued", value: "0" },
      ]}
      aiTitle="Retain 138 high-value guests with targeted campaign"
      aiBody="Send weekend stay credit to Platinum members inactive >90 days. Expected revenue lift ₹18.2L."
      columns={["Member", "Tier", "Lifetime spend", "Last stay", "Risk"]}
      rows={[]}
    />
  );
}

export default Page;
