import 'jsdom-global/register';

import { mount } from '@vue/test-utils';
import Rooms from '@/components/Logo.vue';
import mutations from "@/store/user/mutations.js"

describe('Component', () => {
  test('is a Vue instance ready', () => {
    const wrapper = mount(Rooms);
    expect(wrapper.vm).toBeTruthy();
  })
})

describe("Set rooms list", () => {
  test("Adds a rooms list to the state", () => {
    const item = { number: "106", cost: 2500, type: 0, status: 0 }
    const state = {
      rooms: {}
    }
    mutations.setRoomsList(state, { item })
    expect(state).toEqual({
      rooms: { item }
    })
  })
})

describe("Check internet connection", () => {
  test('Open link', () => {
    window.open = jest.fn();
    window.open('https://google.com');
    expect(window.open).toHaveBeenCalledWith('https://google.com');
  })
})

