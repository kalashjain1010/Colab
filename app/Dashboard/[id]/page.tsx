import getUserProjects from "@/actions/getUserProjects";
import { useContext } from "react";
import { userContext } from "../../hooks/useUser";
import DashboardClient from "./DashboardClient";
import { auth } from "@/utils/firebase";

const Dashboard = async ({ params }: { params: { id: string } }) => {
  const projects = await getUserProjects(params.id);
  return <DashboardClient projects={projects} id={params.id} />;
};

export default Dashboard;
