import actionTypes from '../actions/actionTypes';

const initState = {
  banner: [],
  friday: {},
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner: action.homeData?.find((item) => item.sectionId === 'hSlider')?.items || null,
        friday: action.homeData?.find((item) => item.sectionId === 'hSeasonTheme') || {},
      };

    default:
      return state;
  }
};

export default appReducer;
