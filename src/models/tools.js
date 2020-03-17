const tools = []

class Tool {
  constructor (name, action, state) {
    this.name = name
    this.action = action
    this.state = state
  }
}

tools.push(
  new Tool(
    'brush',
    function () {},
    {}
  )
)
