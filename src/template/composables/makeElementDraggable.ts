import { onMounted } from "vue";


function dragElement(containerEl: HTMLElement, handleEl: HTMLElement) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  function dragMouseDown(e:any) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e:any) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    containerEl!.style.top = (containerEl!.offsetTop - pos2) + "px";
    containerEl!.style.left = (containerEl!.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  handleEl.onmousedown = dragMouseDown;
}



export function makeElementDraggable(containerId: string, handleId: string) {

  onMounted(() => {
    const containerEl = document.getElementById(containerId);
    const handleEl = document.getElementById(handleId);
    if (containerEl && handleEl) {
      dragElement(containerEl, handleEl);
    } else {
      console.warn("Wrong Element ID");
      return
    }
  });
}