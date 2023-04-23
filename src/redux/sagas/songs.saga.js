import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// will be fired on "FETCH_SONGS" actions
  // sends the GET request to the server to fetch all songs for a registered user
  // then sends that list to be stored in the Redux Store
function* fetchSongs() {
  try {
      // axios GET to server to grab songs from the DB
      const songsList = yield axios.get('/songs')
      console.log('songsList:', songsList);

      // Sends the songs list to the reducer
          // to be stored in the REDUX Store, ready for referencing
      yield put({
          type: 'SET_SONGS',
          payload: songsList
      });
  } catch (error) {
      console.log('User get request failed', error);
  }
}

function* deleteSong(action) {
  try {
    console.log('this is deleteSong action.payload', action.payload);
    yield axios.delete(`/songs/delete/${action.payload}`);
    yield put({
      type: 'FETCH_SONGS'
    })
  } catch (error) {
    console.log('User delete request failed', error);
  }
}

function* updateLyrics(action) {
  try {
    console.log('this is updateLyrics action.payload', action.payload);
    console.log('this is updateLyrics action.id', action.id);
    yield axios.put(`/songs/${action.id}`, {newLyrics: action.payload});
  } catch(error) {
    console.log('User PUT request to update lyrics failed', error);
  }
}
  
//FOR ROOT SAGA
function* songsSaga() {
  yield takeLatest('FETCH_SONGS', fetchSongs);
  yield takeLatest('DELETE_SONG', deleteSong);
  yield takeLatest('UPDATE_LYRICS', updateLyrics);
}

export default songsSaga;