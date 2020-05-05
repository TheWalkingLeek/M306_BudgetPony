<template>
  <div class="box-wrapper">
    <div class="title"><slot name="title"></slot></div>
    <div class="box-wrapper-inner">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "BoxWrapperComponent"
};
</script>

<style lang="scss" scoped>
.box-wrapper {
  border: 2px var(--secondary) solid;
  border-radius: 20px;
  margin: 2.25vh 0;
  padding: 3vh 2vw;
  position: relative;

  .title {
    position: absolute;
    top: -2.25vh;
    background-color: var(--white);
    padding: 3px 10px;
    text-align: center;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 1.4rem;

    background-color: var(--primary);
    color: var(--white);
    border-radius: 10px;

    box-shadow: 2px 2px 5px 0px var(--gray);
    text-shadow: 2px 2px 2px rgb(146, 146, 146);
  }
}
</style>
