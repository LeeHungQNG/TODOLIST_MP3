import actionTypes from '../actions/actionTypes';

const initState = {
  banner: [],
  friday: {},
  chill: {},
  top100: {},
  remix: {},
  albumHot: {},
  isLoading: false,
  newRelease: {},
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner: action.homeData?.find((item) => item.sectionId === 'hSlider')?.items || null,
        friday: action.homeData?.find((item) => item.sectionId === 'hSeasonTheme') || {},
        chill: action.homeData?.find((item) => item.sectionId === 'hEditorTheme') || {},
        top100: action.homeData?.find((item) => item.sectionId === 'h100') || {},
        remix: action.homeData?.find((item) => item.sectionId === 'hEditorTheme3') || {},
        albumHot: action.homeData?.find((item) => item.sectionId === 'hAlbum') || {},
        newRelease: action.homeData?.find((item) => item.sectionType === 'new-release') || {},
      };
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };

    default:
      return state;
  }
};

export default appReducer;
