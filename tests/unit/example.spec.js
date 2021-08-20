
describe("example Component", () => {

  test("Must be higer that 10 ",()=>{
    
    let value = 9
    
     
    value = value + 2
    expect(value).toBeGreaterThan(10)

  })
})