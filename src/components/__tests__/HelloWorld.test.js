import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Hello Vitest'
      }
    })
    
    expect(wrapper.text()).toContain('Hello Vitest')
  })

  it('displays the correct message', () => {
    const testMessage = 'Test Message'
    const wrapper = mount(HelloWorld, {
      props: {
        msg: testMessage
      }
    })
    
    expect(wrapper.find('h1').text()).toBe(testMessage)
  })

  it('has the correct CSS class', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Test'
      }
    })
    
    expect(wrapper.find('.greetings').exists()).toBe(true)
  })
}) 