import * as components from './components';

const ModularComponents = {
  install(Vue) {
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name]);
    });
  },
};

export default ModularComponents;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ModularComponents);
}
