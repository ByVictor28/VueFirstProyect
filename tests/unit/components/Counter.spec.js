import { shallowMount, mount } from "@vue/test-utils"

import Counter from "@/components/Counter"
describe("Counter component",()=> {
  let wrapper
  let pCounter
  beforeEach(()=>{
    wrapper = shallowMount(Counter)
    pCounter = wrapper.find('[data-testid="counter"]')
  })

  // test("Must match with the snapshot", ()=> {
  //   expect(wrapper.html()).toMatchSnapshot()
  // })

  test("h2 must have default value",()=>{


    const h2 = wrapper.find("h2")

    expect(h2.text()).toBe("Counter")
  })

  test("p value must be 100",()=>{

    expect(pCounter.text()).toBe("1")

    // expect(h2.text()).toBe("Counter")
  })

  test("increase or decrease counter by 1",async ()=>{

    const buttonIncreace =  wrapper.findAll("button")[0]
    await buttonIncreace.trigger("click")
    expect(pCounter.text()).toBe("2")

    const buttonDecreace =  wrapper.findAll("button")[1]
    await buttonDecreace.trigger("click")
    await buttonDecreace.trigger("click")
    expect(pCounter.text()).toBe("0"); 
  })

  test("Must asign the default value",()=>{
    const {start} =  wrapper.props()

    expect(pCounter.text()).toBe(start.toString())
  })

  test("Must show prop title",()=>{
    const customTitle = "Hola mundo"
    const wrapper = shallowMount(Counter,{props:{title:customTitle}})

    expect( wrapper.find("h2").text() ).toBe(customTitle)    
  })
})