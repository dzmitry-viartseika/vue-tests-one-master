import { shallowMount } from '@vue/test-utils';
import CounterInput from '../../src/components/CounterInput';

describe('Counter Input component', () => {
  it('emits input event when input have value changes', () => {
    const NEW_VALUE = '34';
    const wrapper = shallowMount(CounterInput);
    wrapper.find('input').setValue('34');
    expect(wrapper.emitted()[CounterInput.model?.event ?? 'input']).toStrictEqual([[NEW_VALUE]]);
  })
})
