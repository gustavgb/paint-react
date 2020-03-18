const enhance = (...enhancers) => (Component) => enhancers.reduce((NextComponent, enhancer) => enhancer(NextComponent), Component)

export default enhance
