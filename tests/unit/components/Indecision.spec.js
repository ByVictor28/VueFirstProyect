import { shallowMount } from "@vue/test-utils"

import Indecision from "@/components/Indecision"
describe("Indecision component", () => {
  let wrapper
  let clgSpy

  global.fetch = jest.fn(()=> Promise.resolve( {
    json: ()=>Promise.resolve({
      "answer":"yes",
      "forsed":false,
      "image":"https://yesno.wtf/assets/yes/2.gift"
    })
  } ) )

  beforeEach(()=> {
    wrapper = shallowMount(Indecision);
    clgSpy =jest.spyOn(console,"log")
  })

  afterEach(()=>{
    jest.clearAllMocks()
  })

  test("snapshot match", () => {
    expect(wrapper.html()).toMatchSnapshot();
  })

  test("type shoud not make a request",async ()=>{

    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer")
    
    const input = wrapper.find("input")
    await input.setValue("Hola munod")
    
    expect(clgSpy).toHaveBeenCalledTimes(1)
    expect(getAnswerSpy).toHaveBeenCalledTimes(0)
  })
  
  test("type '?' should make a request",async ()=>{
    const getAnswerSpy = jest.spyOn(wrapper.vm,"getAnswer")
    const input = wrapper.find("input")
    await input.setValue("Hola?")
    expect(clgSpy).toHaveBeenCalledTimes(1)
    expect(getAnswerSpy).toHaveBeenCalledTimes(1)
  })
  
  test("test getAnswer - Correct API result",async()=>{
    console.log(wrapper.vm)
    await wrapper.vm.getAnswer()
      // expect(wrapper.vm.image).toBe("https://yesno.wtf/assets/yes/2.gift")
    expect(wrapper.vm.answer).toBe("yes")

  })

  test("test getAnswer - Fail API result",async ()=>{
    
    fetch.mockImplementationOnce(()=>Promise.reject("Error"))
    await wrapper.vm.getAnswer()
    expect(wrapper.vm.answer).toBe("Error")
  })


})