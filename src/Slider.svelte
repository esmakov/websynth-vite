<script lang="ts">
  export let label: string;
  export let id: string;
  export let min: number;
  export let max: number;
  export let step: number;
  export let value: number;

  let isMouseDown = false;

  function onMouseDown() {
    isMouseDown = true;
  }

  function onMouseUp() {
    isMouseDown = false;
  }

  function onMouseMove(e: MouseEvent) {
    if (isMouseDown) {
      const tooltipElem = this.nextElementSibling;
      const tooltipWidth = tooltipElem.offsetWidth;
      const containerWidth = this.parentElement.offsetWidth;
      const xPos = e.offsetX;
      const tooltipXPos = Math.max(
        0,
        Math.min(containerWidth - tooltipWidth, xPos - tooltipWidth / 2)
      );

      tooltipElem.style.left = `${tooltipXPos}px`;
    }
  }
</script>

<div>
  <label for={id}>{label}</label>
  <input
    type="range"
    on:mousedown={onMouseDown}
    on:mouseup={onMouseUp}
    on:mousemove={onMouseMove}
    bind:value
    {id}
    {min}
    {max}
    {step}
  />
  <span>{value}</span>
</div>

<style>
  div {
    position: relative;
  }

  span {
    visibility: hidden;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 4px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 70%;
    left: 50%;
    transform: translateX(-35%);
  }
  div:hover span {
    visibility: visible;
  }
  input[type="range"] {
    appearance: none;
    width: 100%;
    height: 1rem;
    background: hsl(160, 30%, 60%);
    outline: none;
    border-radius: 1rem;
    cursor: pointer;
  }
</style>
