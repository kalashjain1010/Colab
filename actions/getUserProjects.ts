import { Project } from "@/types";
import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const getUserProjects = async (user_id: string) => {
  if (!user_id) {
    return null;
  }
  const data: Project[] = [];
  const ref = query(
    collection(db, "projects"),
    where("user_id", "==", user_id)
  );
  const documents = await getDocs(ref);

  documents.forEach((doc) => {
    const project: Project = doc.data() as Project;
    delete project.created_at
    project["id"] = doc.id;
    data.push(project as Project);
  });

  return (data as Project[]) || null;
};
export default getUserProjects;
