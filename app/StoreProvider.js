'use client'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reloader from './reducers/reloader';
import file from './reducers/file';
import modal from './reducers/modal';
import entity from './reducers/entity';
import editmode from './reducers/editmode'
import Navbar from "./components/Navbar"

export default function StoreProvider({ children }) {

    const store = configureStore({
        reducer: { reloader,file,modal,entity,editmode },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore these action types
            ignoredActions: ['addFile'],
            // Ignore these field paths in all actions
            // ignoredActionPaths: ['payload.0'],
            // Ignore these paths in the state
            ignoredPaths: ['file'],
          },
        }),
    });

  return (
    <Provider store={store}>
     
        {children}
    </Provider>
  );
}