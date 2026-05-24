function handlePending(state, pending) {
  if (!pending) return state
  if (state.loading !== undefined) return { ...state, loading: true }
  return state
}

export function routerReducer(state, action) {
  if (action.type === 'ROUTER_INITIALIZED') {
    return { ...state, initialized: true }
  }
  if (action.type === 'ROUTER_NAVIGATION_START') {
    return handlePending(state, true)
  }
  if (action.type === 'ROUTER_NAVIGATION_END') {
    return { ...state, loading: false }
  }
  if (action.type === 'ROUTER_NAVIGATION_FAILED') {
    if (typeof state.loading === 'undefined') return state
    return { ...state, loading: false }
  }
  return state
}
