
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Banquets & Conferences"
      title="Events"
      stats={[
        { label: "Upcoming", value: "0" },
        { label: "Revenue forecast", value: "₹0" },
        { label: "Halls available", value: "0 / 0" },
        { label: "Avg deal size", value: "₹0" },
      ]}
      aiTitle="Optimal layout for Sharma wedding on Aug 12"
      aiBody="Recommended capacity 320 in Grand Ballroom with 14% margin uplift via plated dinner vs buffet."
      columns={["Event", "Client", "Date", "Hall", "Status"]}
      rows={[]}
    />
  );
}

export default Page;
