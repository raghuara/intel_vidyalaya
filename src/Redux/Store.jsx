import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mainMenuReducer from './Slices/MainMenuSlice';  
import submenuReducer from './Slices/SubMenuController';  
import pathsReducer from './Slices/PathSlice';  
import dialogsReducer from './Slices/AttendanceDialogueReducers';  
import websiteSettingsReducer from './Slices/websiteSettingsSlice';  
import gradesReducer from './Slices/DropdownController'; 
import authReducer from './Slices/AuthSlice'; 

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['name', 'rollNumber', 'userType', 'grade', 'section', 'isAuthenticated'],
};

const gradesPersistConfig = {
  key: 'grades',  
  storage,
};

// const persistedGradesReducer = persistReducer(gradesPersistConfig, gradesReducer);


const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedGradesReducer = persistReducer(gradesPersistConfig, gradesReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, 
    menu: mainMenuReducer,   
    submenu: submenuReducer, 
    paths: pathsReducer,
    dialogs: dialogsReducer,
    websiteSettings: websiteSettingsReducer,
    grades: persistedGradesReducer, 
  },
});

export const persistor = persistStore(store);

export default store;
