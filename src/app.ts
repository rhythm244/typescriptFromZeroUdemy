
/// <reference path="./components/project-input.ts" />
/// <reference path="./components/project-list.ts" />

namespace App {
  const projectInput = new ProjectInput();
  const activeProjectList = new ProjectList("active");
  const finishedProjectList = new ProjectList("finished");
}
