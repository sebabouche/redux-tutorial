const actionCreator = () => {
    return {
        type: 'AN_ACTION',
        data: 'Action data'
    }
}

console.log(actionCreator())

import { createStore } from 'redux'

// const store_0 = createStore() would have thrown an error
// it needs a reducer function
const store_0 = createStore(() => {})


const reducer = (...args) => {
  console.log('Reducer was called with args', args)
}

const store_1 = createStore(reducer)

const reducer_0 = (state = {}, action) => {
  console.log("Reducer_0 was called with state ", state, " and action ", action)
  return state
}

const store_2 = createStore(reducer_0)
console.log('store_2 state after initialization:', store_2.getState())

const reducer_1 = (state = {}, action) => {
  console.log("Reducer_0 was called with state ", state, " and action ", action)
  switch(action.type) {
    case 'SAY_SOMETHING':
      return {
        ...state,
        message: action.value
      }
    case 'DO_SOMETHING':
        // ...
    case 'LEARN_SOMETHING':
        // ...
    case 'HEAR_SOMETHING':
        // ...
    case 'GO_SOMEWHERE':
        // ...
    default:
      return state
  }
}
console.log(reducer_1({state: "previous"}, {type: "SAY_SOMETHING", value: "HEY!"}))
const store_3 = createStore(reducer_1)
console.log('store_3 state after init: ', store_3.getState())

const userReducer = (state = {}, action) => {
  console.log('userReducer was called with state', state, 'and action', action)
  switch(action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.name
      }
    default:
      return state
  }
}

const itemsReducer = (state = [], action) => {
  console.log('itemsReducer was called with state', state, 'and action', action)
  switch(action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        action.item
      ]
    default:
      return state
  }
}

const speakerReducer = (state= {}, action) => {
  console.log("speaker was called with state ", state, " and action ", action)

  switch(action.type) {
    case 'SAY':
      return {
        ...state,
        message: action.message
      }
    default:
      return state
  }
}

import { combineReducers } from 'redux'

const reducer_2 = combineReducers({
  user: userReducer,
  items: itemsReducer,
  speaker: speakerReducer
})

const store_4 = createStore(reducer_2)
console.log(store_4.getState())

store_4.dispatch({type: "AN_ACTION", data: "something"})
console.log("store_4 after dispatch of an unrelated action: ", store_4.getState())

const setNameActionCreator = (name) => {
  return {
    type: "SET_NAME",
    name: name
  }
}

store_4.dispatch(setNameActionCreator("Sébastien"))

console.log("store_4 after dispatch of SET_NAME action: ", store_4.getState())

const sayActionCreator = (message) => {
  return {
    type: 'SAY',
    message: message
  }
}

// Synchronous production of an action
console.log(new Date())
store_4.dispatch(sayActionCreator("Hi"))

console.log(new Date())
console.log(store_4.getState())

const asyncSayActionCreator = (message) => {
  setTimeout(() => {
    return {
      type: 'SAY',
      message
    }
  }, 2000)
}

// store_4.dispatch(asyncSayActionCreator)
// Actions must be plain objects. Use custom middleware for async actions.

// Equivalent of currying
const sayHelloToSomeone = (intro) => {
  return (name) => {
    return (console.log(intro + " " + name + "!"))
  }
}
const sayHelloPat = sayHelloToSomeone("Hello")
sayHelloPat("Pat")
const sayHelloSeb = sayHelloToSomeone("Hello")("Seb")

const thunkMiddleware = ({ dispatch, getState }) => {
    // console.log('Enter thunkMiddleware')
    return (next) => {
        // console.log('Function "next" provided:', next)
        return (action) => {
            // console.log('Handling action:', action)
            return typeof action === 'function' ?
                action(dispatch, getState) :
                next(action)
        }
    }
}

const logMiddleware = ({ dispatch, getState }) => {
  return (next) => {
    return (action) => {
      console.log('logMiddleware action received:', action)
      return next(action)
    }
  }
}

const discardMiddleware = ({dispatch, getState}) => {
  return (next) => {
    return (action) => {
      console.log('discardMiddleware action received:', action)
    }
  }
}

import { applyMiddleware } from 'redux'

const createStoreWithMiddleware = applyMiddleware(logMiddleware, thunkMiddleware)(createStore)

const store_5 = createStoreWithMiddleware(reducer_2)

const asyncSayActionCreator_0 = (message) => {
  return (
    (dispatch) => {
      setTimeout(
        () => {
          console.log(new Date(), 'Dispatch async action now')
          dispatch(sayActionCreator(message))
        }
        , 1000
      )
    }
  )
}

console.log("\n", new Date(), 'Running our async action creator:', "\n")

store_5.dispatch(asyncSayActionCreator_0("Bonjour tout le monde!"))

const store_6 = createStore(reducer_2)

console.log("store_6 initial state: ", store_6.getState())
// will trigger before the previous action

store_6.subscribe(
  () => {
    console.log("store_6 has been updated. Latest store state: ", store_6.getState())
  }
)

const addItemActionCreator = (item) => {
  return {
    type: 'ADD_ITEM',
    item
  }
}

store_6.dispatch(addItemActionCreator({id: 1234, title: "miel", description: "Very healthy sweet product"}))
