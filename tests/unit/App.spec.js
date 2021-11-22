import App from '../../src/App.vue';
import { mount } from '@vue/test-utils';
import nextTick  from 'vue';
// import CounterInput from "@/components/CounterInput.vue";
// import { stubComponent } from "./helpers/stubComponent.js";
// import { nextTick } from "vue";

describe('Counter', () => {
  let wrapper;
  // искать по тексту кнопки!

  // const findPlusButton = () => {
  //   wrapper.findAll('button').wrappers.find((w) => w.text() === '+');
  // };

  const createComponent = () => {
    wrapper = mount(App);
  }

  afterEach(() => {
    // не только удаляет но и помечает враппер как удаленный
    wrapper.destroy();
  });

  it('renders 0 when initialized', () => {
    // Arrange(Подготовка)
    createComponent();

    // Assets (действие)

    // меня не волнует где на wrapper выводится 0 т.к. разметка нас не интересует
  expect(wrapper.text()).toContain('0');
  });

  it('increments by one when + button clicked', async () => {
    createComponent();
    // trigger вызывается асинхронно!
    // await findPlusButton().trigger('click')
    wrapper.find('.button_plus').trigger('click');
    // await nextTick();
    // или
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('1');
  });

  it('decrements by one when - button clicked', async () => {
    createComponent();
    wrapper.find('.button_minus').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('-1');
  });
})
