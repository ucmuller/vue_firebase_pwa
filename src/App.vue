<template>
  <div id="app">
    <Drawer class="header"/>
    <transition name="component-fade" mode="out-in">
      <router-view class="main"/>
    </transition>
    <bottom-bar class="footer"/>
  </div>
</template>

<script>
import Drawer from '@/components/common/Drawer'
import BottomBar from '@/components/common/BottomBar'
export default {
  name: 'App',
  components:{
    Drawer,
    BottomBar
  }
}
</script>


<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #442c2e;
  padding-top: 0px;
  overflow: hidden;
  background: #fff;
}

.main{
  /* margin-top: 55px; */
  /* margin-bottom: 50px; */
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .2s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
.md-button.md-theme-default.md-raised:not([disabled]).md-accent {
    color: white;
}
.md-field.md-theme-default:before {
    background-color: #F8F2E3;
    background-color: var(--md-theme-default-accent, #FB6359);
}
.md-field.md-theme-default.md-focused label {
    color: var(--md-theme-default-accent, #FB6359);
}
.md-field.md-theme-default.md-focused > .md-icon {
    color: var(--md-theme-default-accent, #FB6359);
}
.md-steppers.md-horizontal.md-alternative .md-stepper-header {
    height: 50px;
}
a{
  color: #0033cc;
}
</style>
