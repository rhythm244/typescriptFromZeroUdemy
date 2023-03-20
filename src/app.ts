import { ProjectList } from "./components/project-list";
import { ProjectInput } from "./components/project-input";

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
