import { onMounted } from "vue";


function dragElement(containerEl: HTMLElement, handleEl: HTMLElement) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  function dragMouseDown(e:any) {
    e = e || window.event;
    e.preventDefault();

    // get the mouse cursor position at startup:
    if (e.clientX && e.clientY) {
      pos3 = e.clientX;
      pos4 = e.clientY;
    } else {
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    }

    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e:any) {
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    if (e.clientX && e.clientY) {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    } else {
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    }

    // set the element's new position:
    containerEl!.style.top = (containerEl!.offsetTop - pos2) + "px";
    containerEl!.style.left = (containerEl!.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }

  handleEl.onmousedown = dragMouseDown;
  handleEl.ontouchstart = dragMouseDown;
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