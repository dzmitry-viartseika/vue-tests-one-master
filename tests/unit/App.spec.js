import App from '../../src/App.vue';
import { mount } from '@vue/test-utils';
// import CounterInput from "@/components/CounterInput.vue";
// import { stubComponent } from "./helpers/stubComponent.js";
import { nextTick } from 'vue';

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
    // old version vue-unit-utils
    wrapper = null;
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

  it('shows reset button when counter is below zero', async () => {
    createComponent();
    wrapper.vm.counter = -1;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test-id=reset]').exists()).toBe(true);
  });

  it('does not show reset button when counter is not below zero', async () => {
    createComponent();
    // стараться тестить без состояния!
    wrapper.vm.counter = 1;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test-id]').exists()).toBe(false);
  });

  it('increases by one when plus key is pressed', async () => {
    createComponent();
    const event = new KeyboardEvent('keyup', {
      key: '+'
    })

    document.dispatchEvent(event);

    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('+');
  });

  it('removes attached event listener when destroyed' ,async () => {
    const originalAddEventListener = document.addEventListener;
    document.addEventListener = jest
      .fn()
      .mockImplementation((...args) => {
        return originalAddEventListener.call(document, ...args);
      })
    // 1.45
    document.addEventListener('foo', () => {})
    createComponent();
    await wrapper.vm.$nextTick();
    console.log('listenerMock', document.addEventListener.mock.calls);
  })
})
