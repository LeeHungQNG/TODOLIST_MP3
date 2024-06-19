import actionTypes from '../actions/actionTypes';

const initState = {
  banner: null,
  friday: null,
  chill: null,
  top100: null,
  remix: null,
  albumHot: null,
  isLoading: false,
  newRelease: null,
  weekChart: null,
  chart: null,
  rank: null,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner: action.homeData?.find((item) => item.sectionId === 'hSlider')?.items || null,
        friday: action.homeData?.find((item) => item.sectionId === 'hSeasonTheme') || null,
        chill: action.homeData?.find((item) => item.sectionId === 'hEditorTheme') || null,
        top100: action.homeData?.find((item) => item.sectionId === 'h100') || null,
        remix: action.homeData?.find((item) => item.sectionId === 'hEditorTheme3') || null,
        albumHot: action.homeData?.find((item) => item.sectionId === 'hAlbum') || null,
        newRelease: action.homeData?.find((item) => item.sectionType === 'new-release') || null,
        weekChart: action.homeData?.find((item) => item.sectionType === 'weekChart')?.items || null,
        chart: action.homeData?.find((item) => item.sectionId === 'hZC')?.chart || null,
        rank: action.homeData?.find((item) => item.sectionId === 'hZC')?.items || null,
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
