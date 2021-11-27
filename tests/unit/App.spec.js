import App from '../../src/App.vue';
import { shallowMount } from "@vue/test-utils";
import CounterInput from "../../src/components/CounterInput";
import { stubComponent } from './helpers/stubComponent';


// stubs применимы и с mount. Заглушаем компонент или управление.

// Если mount - надо чтобы компонент не рендерился CounterInput: true
// Если shallowMOunt - надо чтобы компонент рендарился, то CounterInput: false
const CounterInputStub = stubComponent(CounterInput, {
  template: '<div><slot></slot><slot name="warning"></slot></div>',
});

// CounterInputStub - не имеет пропсов, и попытка взять у него ошибка, решается $_vueTestUtils_original

describe('Counter', () => {

  let wrapper;
  // искать по тексту кнопки!


  // const findPlusButton = () => {
  //   wrapper.findAll('button').wrappers.find((w) => w.text() === '+');
  // };

  // attachTo - когда компонент реагирует на клики за своими пределами
  const createComponent = (props) => {
    wrapper = shallowMount(App, {
      attachTo: document.body,
      propsData: props,
      stubs: {
        CounterInput: CounterInputStub,
      }
      // attachToDocument: true старые версии
    });
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
    // Arrange
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(document, 'removeEventListener');
    createComponent();
    // Act
    const [, keyUpListiner] = document.addEventListener.mock.calls.find(([key]) => key === 'keyup');

    expect(document.removeEventListener).not.toHaveBeenCalledWith('keyup', keyUpListiner)

    wrapper.destroy();
    // Assert
    expect(document.removeEventListener).toHaveBeenCalledWith('keyup', keyUpListiner)
  });

  it('correctly initializes when initialValue is passed', () => {
    const INITIAL_VALUE = 5;
    createComponent({initialValue: INITIAL_VALUE});

    expect(wrapper.text()).toContain(INITIAL_VALUE);
  });

  it('correctly reset when initialValue is charged', async () => {
    const INITIAL_VALUE = 5;
    const NEW_INITIAL_VALUE = 10;
    createComponent({initialValue: INITIAL_VALUE});
    wrapper.find('.button_minus').trigger('click');
    await wrapper.vm.$nextTick();
    // перезаписываем пропс
    await wrapper.setProps({initialValue: NEW_INITIAL_VALUE});
    expect(wrapper.text()).toContain(NEW_INITIAL_VALUE);
   });

  it('passes current value to CounterInput component', () => {
    const INITIAL_VALUE = 5;
    createComponent({initialValue: INITIAL_VALUE});
    expect(wrapper.findComponent(CounterInput).props().value).toBe(INITIAL_VALUE);
  });

  it('updates current value when CounterInput provides new one', async () => {
    const INITIAL_VALUE = 5;
    const NEW_INITIAL_VALUE = 40;
    createComponent({initialValue: INITIAL_VALUE});

    wrapper.findComponent(CounterInputStub).vm.$emit(CounterInputStub.model?.event ?? 'input', NEW_INITIAL_VALUE);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain(NEW_INITIAL_VALUE);
  });

  it('passes second value to CounterInput', async() => {
    createComponent();
    wrapper.find('.button_plus2').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(CounterInputStub).text()).toContain('1');
  });

  it('passed BETA to CounterComponent warning slot', () => {
    createComponent();
    expect(wrapper.findComponent(CounterInputStub).text()).toContain('BETA')
  })
})
