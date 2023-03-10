// //Project Type
// enum ProjectStatus {
//   Active,
//   Finished,
// }
// class Project {
//   constructor(
//     public id: string,
//     public title: string,
//     public description: string,
//     public people: number,
//     public status: ProjectStatus
//   ) {}
// }

// //Project State management

// type Listener = (items: Project[]) => void;

// class ProjectState {
//   private listeners: Listener[] = [];

//   private projects: Project[] = [];
//   private static instance: ProjectState;

//   private constructor() {}

//   static getInstance() {
//     if (this.instance) return this.instance;
//     this.instance = new ProjectState();
//     return this.instance;
//   }

//   addListener(listenerFn: Listener) {
//     console.log(this.listeners);
//     this.listeners.push(listenerFn);
//   }

//   addProject(title: string, description: string, numOfPage: number) {
//     const newProject = new Project(
//       Math.random().toString(),
//       title,
//       description,
//       numOfPage,
//       ProjectStatus.Active
//     );

//     this.projects.push(newProject);

//     for (const listenerFn of this.listeners) {
//       //ส่ง listener ไปในทุกๆ project
//       console.log(this.projects.slice());
//       listenerFn(this.projects.slice());
//     }
//   }
// }

// const projectState = ProjectState.getInstance();

// //Validate
// interface Validatable {
//   value: string | number;
//   required?: boolean;
//   minLength?: number;
//   maxLength?: number;
//   min?: number;
//   max?: number;
// }

// function validate(validatableInput: Validatable) {
//   let isValid = true;
//   if (validatableInput.required) {
//     isValid = isValid && validatableInput.value.toString().trim().length !== 0;
//   }
//   if (
//     validatableInput.minLength != null &&
//     typeof validatableInput.value === "string"
//   ) {
//     isValid =
//       isValid && validatableInput.value.length >= validatableInput.minLength;
//   }
//   if (
//     validatableInput.maxLength != null &&
//     typeof validatableInput.value === "string"
//   ) {
//     isValid =
//       isValid && validatableInput.value.length <= validatableInput.maxLength;
//   }

//   if (
//     validatableInput.min != null &&
//     typeof validatableInput.value === "number"
//   ) {
//     isValid = isValid && validatableInput.value >= validatableInput.min;
//   }

//   if (
//     validatableInput.max != null &&
//     typeof validatableInput.value === "number"
//   ) {
//     isValid = isValid && validatableInput.value <= validatableInput.max;
//   }

//   return isValid;
// }

// //auto bind decorator
// function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
//   console.log(descriptor);
//   const originMethod = descriptor.value;
//   const adjdDescriptor: PropertyDescriptor = {
//     configurable: true,
//     get() {
//       const boundFn = originMethod.bind(this);
//       return boundFn;
//     },
//   };

//   return adjdDescriptor;
// }

// abstract class Component<T extends HTMLElement, U extends HTMLElement> {
//   templateElement: HTMLTemplateElement;
//   hostElement: T;
//   element: U;

//   constructor(
//     templateId: string,
//     hostElementId: string,
//     insertAtStart: boolean,
//     newElementId?: string
//   ) {
//     this.templateElement = <HTMLTemplateElement>(
//       document.getElementById(templateId)
//     );

//     this.hostElement = <T>document.getElementById(hostElementId)!;

//     const importNode = document.importNode(this.templateElement.content, true);
//     this.element = importNode.firstElementChild as U;
//     if (newElementId) {
//       this.element.id = newElementId;
//     }

//     this.attach(insertAtStart);
//   }

//   private attach(insertAtBeginning: boolean) {
//     this.hostElement.insertAdjacentElement(
//       insertAtBeginning ? "afterbegin" : "beforeend",
//       this.element
//     );
//   }

//   abstract configure(): void;
//   abstract renderContent(): void;
// }

// class ProjectList extends Component<> {
//   templateElement: HTMLTemplateElement;
//   hostElement: HTMLDivElement;
//   element: HTMLElement;
//   assignProjects: Project[];

//   constructor(private type: "active" | "finished") {
//     this.templateElement = <HTMLTemplateElement>(
//       document.getElementById("project-list")
//     );

//     this.hostElement = <HTMLDivElement>document.getElementById("app")!;
//     this.assignProjects = [];
//     const importNode = document.importNode(this.templateElement.content, true);
//     this.element = importNode.firstElementChild as HTMLElement;
//     this.element.id = `${this.type}-projects`;

//     //---------------------------------------------------------------------------------------------------------------------------------------
//     projectState.addListener((projects: Project[]) => {
//       const relevantProjects = projects.filter((prj) => {
//         if (this.type === "active") {
//           return prj.status === ProjectStatus.Active;
//         } else {
//           return prj.status === ProjectStatus.Finished;
//         }
//       });

//       this.assignProjects = relevantProjects;
//       this.renderProjects();
//     });
//     // above block of code will be executed, means that anonymous function will go and sit (no-execution will happen) inside listeners[] array.
//     // Because, the work of addListener() function is just to add a new function inside listeners[] array every time it get called.

//     this.attach();
//     this.renderContent();
//   }

//   renderProjects() {
//     const listEl = <HTMLUListElement>(
//       document.getElementById(`${this.type}-projects-list`)
//     );
//     listEl.innerHTML = "";
//     for (const prjItem of this.assignProjects) {
//       const listItem = document.createElement("li");
//       listItem.textContent = prjItem.title;
//       listEl?.appendChild(listItem);
//     }
//   }

//   private renderContent() {
//     const listId = `${this.type}-projects-list`;
//     this.element.querySelector("ul")!.id = listId;
//     this.element.querySelector("h2")!.textContent =
//       this.type.toUpperCase() + " PROJECTS";
//   }

//   private attach() {
//     this.hostElement.insertAdjacentElement("beforeend", this.element);
//   }
// }

// class ProjectInput {
//   templateElement: HTMLTemplateElement;
//   hostElement: HTMLDivElement;
//   element: HTMLFormElement;
//   titleInputElement: HTMLInputElement;
//   descriptionInputElement: HTMLInputElement;
//   peopleInputElement: HTMLInputElement;

//   constructor() {
//     this.templateElement = <HTMLTemplateElement>(
//       document.getElementById("project-input")
//     );

//     this.hostElement = <HTMLDivElement>document.getElementById("app")!;

//     const importNode = document.importNode(this.templateElement.content, true);
//     this.element = importNode.firstElementChild as HTMLFormElement;
//     this.element.id = "user-input";

//     this.titleInputElement = this.element.querySelector(
//       "#title"
//     ) as HTMLInputElement;
//     this.descriptionInputElement = this.element.querySelector(
//       "#description"
//     ) as HTMLInputElement;
//     this.peopleInputElement = this.element.querySelector(
//       "#people"
//     ) as HTMLInputElement;

//     this.configure();
//     this.attach();
//   }

//   private getherUserInput(): [string, string, number] | void {
//     const enteredTitle = this.titleInputElement.value;
//     const enteredDescription = this.descriptionInputElement.value;
//     const enteredPeople = this.peopleInputElement.value;

//     const titleValidatable: Validatable = {
//       value: enteredTitle,
//       required: true,
//     };
//     const descriptionValidatable: Validatable = {
//       value: enteredDescription,
//       required: true,
//       minLength: 5,
//     };
//     const peopleValidatable: Validatable = {
//       value: +enteredPeople,
//       required: true,
//       min: 1,
//     };

//     if (
//       !validate(titleValidatable) ||
//       !validate(descriptionValidatable) ||
//       !validate(peopleValidatable)
//     ) {
//       alert("Invalid input, please try again!");
//       return;
//     } else {
//       return [enteredTitle, enteredDescription, +enteredPeople];
//     }
//   }

//   @autobind
//   private submitHandler(event: Event) {
//     event.preventDefault();
//     const userInput = this.getherUserInput();
//     if (Array.isArray(userInput)) {
//       const [title, desc, people] = userInput;
//       projectState.addProject(title, desc, people);
//       console.log(title, desc, people);
//     }

//     // this.clearInput();
//   }

//   private clearInput() {
//     this.titleInputElement.value = "";
//     this.descriptionInputElement.value = "";
//     this.peopleInputElement.value = "";
//   }

//   private configure() {
//     // this.element.addEventListener("submit", this.submitHandler.bind(this));
//     this.element.addEventListener("submit", this.submitHandler);
//   }

//   private attach() {
//     this.hostElement.insertAdjacentElement("afterbegin", this.element);
//   }
// }

// const projectInput = new ProjectInput();
// const activeProjectList = new ProjectList("active");
// const finishedProjectList = new ProjectList("finished");
