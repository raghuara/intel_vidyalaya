import { createSlice } from '@reduxjs/toolkit';
import LogoImage from '../../Images/Login/MSMSLogo.png';

const initialState = {
  logo: LogoImage,
  title: "Edu Connect",
  darkColor: "#be361b",
  mainColor: "#ee4422",
  lightColor: "#f9c6bc",
  textColor: "#ffffff",
  backgroundColor: "#fdece8",
};

const websiteSettingsSlice = createSlice({
  name: 'websiteSettings',
  initialState,
  reducers: {
    setWebsiteSettings: (state, action) => {
      state.logo = action.payload.logo;
      state.title = action.payload.title;
      state.darkColor = action.payload.darkColor;
      state.mainColor = action.payload.mainColor;
      state.lightColor = action.payload.lightColor;
      state.textColor = action.payload.textColor;
      state.backgroundColor = action.payload.backgroundColor;
    },
  },
});

export const { setWebsiteSettings } = websiteSettingsSlice.actions;
export const selectWebsiteSettings = (state) => state.websiteSettings;

export default websiteSettingsSlice.reducer;
