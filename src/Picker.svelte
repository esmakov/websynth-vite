<script>
  export let optionList = [];
  export let store;
  export let label;
  export let id;
</script>

<label for={id}>{label}</label>
<select {id} bind:value={$store}>
  {#each optionList as option}
    <option value={option}>{option}</option>
  {/each}
</select>
