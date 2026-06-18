
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Marketing"
      title="Website CMS"
      stats={[
        { label: "Pages", value: "0" },
        { label: "Languages", value: "0" },
        { label: "Conversion", value: "0%", accent: "bg-op-purple/20" },
        { label: "Direct bookings", value: "0%" },
      ]}
      aiTitle="Optimize hero copy for monsoon campaign"
      aiBody="A/B test suggests `Stay dry. Live lush.` outperforms current headline by 22% CTR."
      columns={["Page", "Locale", "Status", "Last edit", "Author"]}
      rows={[]}
    />
  );
}

export default Page;
