
import { ModulePage } from "../../components/ui/module-page";



function Page() {
  return (
    <ModulePage
      eyebrow="Workforce"
      title="Staff"
      stats={[
        { label: "Employees", value: "0" },
        { label: "Open roles", value: "0" },
        { label: "Avg tenure", value: "0" },
        { label: "eNPS", value: "0" },
      ]}
      aiTitle="Add 6 housekeepers for weekend forecast"
      aiBody="Predicted 92% occupancy Sat–Sun exceeds current staffing ratio. Draft shift roster generated."
      columns={["Name", "Department", "Role", "Shift", "Status"]}
      rows={[]}
    />
  );
}

export default Page;
