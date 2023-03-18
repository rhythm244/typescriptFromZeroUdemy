namespace App {
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(event: DragEvent): void; //permit to drop
    dragHandler(event: DragEvent): void; //when actual drop
    dragLeaveHandler(event: DragEvent): void; //feedback to user when drop complete.
  }
}
