import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://anik3001.sakibahmad.com/api/v1',
  prepareHeaders: async (headers, { getState }) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('content-type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    // Token expired, logout user
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user_data');
    // Navigate to login screen here if needed
  }
  
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Customer', 'Employee', 'Admin', 'Chat', 'Problem'],
  endpoints: () => ({}),
});