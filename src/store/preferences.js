
/**
 * ACTION TYPES
 */
const GET_PREFERENCES = 'GET_PREFERENCES'

/**
 * INITIAL STATE
 */
const initialState = {
  preferences: {}
}

/**
 * ACTION CREATORS
 */
const gotPreferences = preferences => ({ type: GET_PREFERENCES, preferences })

/**
 * THUNK CREATORS
 */
export const getPreferences = () => async dispatch => {
  try {
    //normally we would make an api call here - I would use axios to do this
    dispatch(gotPreferences({ "default-net-terms": 30 }))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PREFERENCES:
      return { ...state, preferences: action.preferences }
    default:
      return state
  }
}
