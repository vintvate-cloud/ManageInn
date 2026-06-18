
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Distribution"
      title="Channel Manager"
      stats={[
        { label: "Connected OTAs", value: "0", delta: "0" },
        { label: "Inventory synced", value: "0%", accent: "bg-op-purple/20" },
        { label: "Parity score", value: "0" },
        { label: "Bookings (24h)", value: "0", delta: "0%" },
      ]}
      aiTitle="Rate parity drift detected on Booking.com"
      aiBody="3 room types are priced 4–6% below Expedia. Auto-sync corrected pricing to restore parity."
      columns={["Channel", "Status", "ADR", "Bookings", "Last sync"]}
      rows={[]}
    />
  );
}

export default Page;
