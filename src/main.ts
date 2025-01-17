import randomcolor from "randomcolor";
import { setStyles } from "./util";

const app = document.querySelector<HTMLDivElement>("#app")!;
app.insertAdjacentHTML(
  "afterbegin",
  `<section id="inputzone">
    <ul>
      <li>
        <label>Rijen</label>
        <input type="number" min="1" id="rows" value="50"/>
      </li>
      <li>
        <label>Kolommen</label>
        <input type="number" min="1" id="columns" value="50" />
      </li>
      <li>
        <label>Kleuren</label>
        <input type="number" min="1" id="colors" value="10" />
      </li>
    </ul>
    <button>GO!</button>
  </section>
  <section id="overview">
    <ul></ul>
  </section>
  <section id="drawzone"></section>`
);
const inputZone = app.querySelector<HTMLElement>("#inputzone")!;
const overview = app.querySelector<HTMLUListElement>("#overview")!;
const drawzone = app.querySelector<HTMLElement>("#drawzone")!;
const inputZoneUl = inputZone.querySelector<HTMLUListElement>("& > ul")!;
const overviewUl = overview.querySelector<HTMLUListElement>("& > ul")!;
const rowInput = inputZoneUl.querySelector<HTMLInputElement>("#rows")!;
const columnInput = inputZoneUl.querySelector<HTMLInputElement>("#columns")!;
const colorInput = inputZoneUl.querySelector<HTMLInputElement>("#colors")!;
const goButton = inputZone.querySelector<HTMLButtonElement>("& > button")!;

setStyles(document.querySelectorAll<HTMLElement>("*"), {
  boxSizing: "border-box",
  margin: "0",
});

setStyles(app, {
  backgroundColor: "#1a1b26",
  minHeight: "100vh",
  maxWidth: "100vw",
  display: "grid",
  gridTemplate: "auto 1fr / 1fr  180px",
  gridTemplateAreas: `
    "inputzone overview"
    "drawzone  overview"`,
  fontSize: "2rem",
});

setStyles(inputZone, {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  padding: "40px",
  borderBottom: "solid 5px #24283b",
  color: "#9aa5ce",
});

setStyles(drawzone, {
  margin: "40px",
  borderRadius: "20px",
  overflow: "hidden",
});

setStyles(inputZoneUl, {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "20px",
  padding: "0",
});

setStyles(inputZoneUl.querySelectorAll<HTMLElement>("& > li"), {
  display: "grid",
  gridTemplateColumns: "subgrid",
  gridColumn: "1/-1",
  alignItems: "center",
});

setStyles([rowInput, columnInput, colorInput, goButton], {
  padding: "10px",
  backgroundColor: "#414868",
  borderRadius: "10px",
  fontSize: "2rem",
  minWidth: "300px",
  color: "#9ece6a",
  border: "none",
  outline: "none",
});

setStyles(goButton, {
  color: "#9ece6a",
  backgroundColor: "#414868",
  fontSize: "7rem",
  fontWeight: "900",
});

setStyles(overview, {
  gridArea: "overview",
  borderLeft: "solid 5px #24283b",
  overflow: "auto",
});

setStyles(overviewUl, {
  display: "flex",
  flexDirection: "column",
  maxHeight: "100vh",
  padding: "20px",
});

goButton.addEventListener("click", () => {
  const columns = +columnInput.value;
  const rows = +rowInput.value;
  const colors = [...Array(+colorInput.value)].map((_) => ({
    color: randomcolor() as string,
    count: 0,
  }));

  setStyles(drawzone, {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
  });

  drawzone.innerHTML = "";
  for (const _ of Array(columns * rows)) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    color.count++;

    const div = document.createElement("div");
    div.style.backgroundColor = color.color;
    drawzone.insertAdjacentElement("beforeend", div);
  }

  overviewUl.innerHTML = "";
  colors.sort((a, b) => b.count - a.count);
  for (const color of colors) {
    // if (color.count < 1) continue;
    const li = document.createElement("li");
    const square = document.createElement("span");
    const label = document.createElement("label");
    label.innerText = color.count.toString();
    li.insertAdjacentElement("afterbegin", square);
    square.insertAdjacentElement("beforeend", label);
    overviewUl.insertAdjacentElement("beforeend", li);

    setStyles(li, {
      display: "flex",
      alignItems: "center",
      padding: "20px",
      gap: "20px",
      color: "#9aa5ce",
    });

    setStyles(square, {
      display: "inline-block",
      minWidth: "80px",
      aspectRatio: "1/1",
      backgroundColor: color.color,
      border: "1px solid black",
      borderRadius: "10px",
      placeItems: "center",
      placeContent: "center",
      cursor: "pointer",
    });

    setStyles(label, {
      display: "block",
      color: "#1a1b26",
      padding: "5px",
      fontWeight: "600",
      fontSize: "2rem",
      pointerEvents: "none",
    });

    const colorLabel = label.cloneNode(true) as HTMLLabelElement;

    colorLabel.innerText = color.color;
    colorLabel.style.fontSize = "1rem";
    square.insertAdjacentElement("beforeend", colorLabel);
  }
});

goButton.addEventListener("mouseenter", () => {
  setStyles(goButton, {
    backgroundColor: "#7aa2f7",
    color: "#24283b",
  });
});

goButton.addEventListener("mouseleave", () => {
  setStyles(goButton, {
    color: "#9ece6a",
    backgroundColor: "#414868",
  });
});

goButton.addEventListener("mousedown", () => {
  setStyles(goButton, {
    translate: "0 2px",
    boxShadow: "inset 2px 4px 10px #24283b",
  });
});

goButton.addEventListener("mouseup", () => {
  setStyles(goButton, {
    translate: "0 0",
    boxShadow: "none",
  });
});

for (const input of [rowInput, columnInput, colorInput]) {
  const tooltip = document.createElement("span");
  tooltip.innerText = "scroll to adjust";
  setStyles(tooltip, {
    position: "absolute",
    right: "20px",
    top: "0",
    height: "100%",
    alignContent: "center",
    color: "#24283b",
    visibility: "hidden",
    pointerEvents: "none",
  });
  const li = input.parentElement!;
  li.style.position = "relative";
  li.insertAdjacentElement("beforeend", tooltip);

  input.addEventListener("wheel", () => {});
  input.addEventListener("mouseover", () => {
    input.focus();
  });

  input.addEventListener("mouseenter", () => {
    tooltip.style.visibility = "visible";
  });
  input.addEventListener("mouseleave", () => {
    tooltip.style.visibility = "hidden";
  });
}

const style = document.createElement("style");
style.innerText = `
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #24283b;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #414868;
  }`;
document.head.insertAdjacentElement("beforeend", style);
