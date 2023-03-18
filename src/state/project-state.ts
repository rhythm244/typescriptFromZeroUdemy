namespace App {
  //Project State management
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      console.log(this.listeners);
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) return this.instance;
      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, numOfPage: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPage,
        ProjectStatus.Active
      );

      this.projects.push(newProject);
      this.updateListeners();
    }
    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();
}
