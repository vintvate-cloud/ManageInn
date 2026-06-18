
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Vault"
      title="Documents"
      stats={[
        { label: "Files", value: "0" },
        { label: "OCR processed", value: "0%" },
        { label: "Expiring (30d)", value: "0", accent: "bg-op-orange/20" },
        { label: "Storage", value: "0" },
      ]}
      aiTitle="2 licenses expire in the next 14 days"
      aiBody="Liquor license and elevator certification auto-flagged. Renewal drafts prepared."
      columns={["Document", "Type", "Owner", "Expires", "Status"]}
      rows={[]}
    />
  );
}

export default Page;
