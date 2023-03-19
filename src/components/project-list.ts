import { DragTarget } from "../models/drag-drop.js";
import { autobind } from "../decorator/autobind.js";
import { Project, ProjectStatus } from "../models/project.js";
import { Component } from "./base-component.js";
import { projectState } from "../state/project-state.js";
import { ProjectItem } from "./project-item.js";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignProjects = [];

    //---------------------------------------------------------------------------------------------------------------------------------------

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    console.log(event.dataTransfer!.getData("text/plain"));

    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @autobind
  dragLaeveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLaeveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    // above below of code will be executed, means that anonymous function will go and sit (no-execution will happen) inside listeners[] array.
    // Because, the work of addListener() function is just to add a new function inside listeners[] array every time it get called.
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        } else {
          return prj.status === ProjectStatus.Finished;
        }
      });

      this.assignProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderProjects() {
    const listEl = <HTMLUListElement>(
      document.getElementById(`${this.type}-projects-list`)
    );
    listEl.innerHTML = "";
    for (const prjItem of this.assignProjects) {
      // const listItem = document.createElement("li");
      // listItem.textContent = prjItem.title;
      // listEl?.appendChild(listItem);
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  // private attach() {
  //   this.hostElement.insertAdjacentElement("beforeend", this.element);
  // }
}
