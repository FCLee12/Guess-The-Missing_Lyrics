// Interacts with the REDUX Store
const searchResultsReducer = (state = [], action) => {
    console.log('this is action.payload in searchResultsReducer', action.payload);
    switch (action.type) {
        // listens for SET_SEARCH_RESULTS, should return
            // the array of song objects on call/reference/useSelector
        case "SET_SEARCH_RESULTS":
            // console.log(action.payload);
            return action.payload.data;
        default:
            return state;
    }
}

export default searchResultsReducer;