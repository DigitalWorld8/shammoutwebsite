import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../axios/axioxConfig';
import { CMS_PORT, CustomForm, Email, getSubPath, pagesBaseUrl, POS, posBaseUrl, StaticComponent } from '@/axios/urls';
import { getHeadres } from '@/axios/headres';


const sliceName = `pages`;


interface Page {
  id: number;
  pageUrlName: string;
}
interface Component {
}
interface Segment {
  id: number;
  pageID: number;
  name: string;
  description: string;
  position: number;
  components: Component[];
}
interface PageContent {
  id: number;
  pageUrlName: string;
  language: string;
  pos: string;
  title: string;
  isDeleted: boolean;
  status: string;
  description: string;
  segments: Segment[];
}
export interface PageResponse {
  id: number;
  pageUrlName: string;
  language: string;
  pos: string;
  title: string;
  isDeleted: boolean;
  status: string;
  description: string;
  segments: Segment[];
  staticComponents: StaticComponent[];
}



export interface StaticComponent {
  id: number;
  type: string;
  content: string; // Also stringified JSON
  position: number;
}

export const getPagesService = createAsyncThunk<
  void,
  void,
  { rejectValue: any }
>(
  `${sliceName}/getPagesService`,
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get(`${pagesBaseUrl}/sy/${lang}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
  }
);


export const getPageBySybUrlService = createAsyncThunk<
  PageResponse,
  { lang: string; pageUrlName: string, pos: string },
  { rejectValue: string }
>(
  'pages/getPageBySybUrlService',
  async ({ lang, pageUrlName, pos }, thunkAPI) => {
    try {
      const response = await apiClient.get(`${pagesBaseUrl}/Page/${pos}/${lang}/${pageUrlName}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
  }
);



export const getSubPathService = createAsyncThunk<
  Page[],
  { lang: String },
  { rejectValue: any }
>(
  `${sliceName}/getSubPathService`,
  async ({ lang }, thunkAPI) => {
    try {

      const response = await apiClient.get(`${pagesBaseUrl}/${getSubPath}/sy/${lang}`, {
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0YXJlazNzaGVpa2hhbGFyZCIsImp0aSI6ImQ2NGIwZjRhLWNjN2ItNDllNC05Nzk4LWNhMWRkNTFkNzhmMCIsImVtYWlsIjoidGFyZWszLmRvZUBleGFtcGxlLmNvbSIsInVzZXJDb2RlIjoiQ3VzdG9tZXItNWI5MTA1ODc3ZGRmNDY1YjljMjJiZjZjNmZmOGJjOWMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzQ0ODcyNjY0LCJpc3MiOiJTZWN1cmVBcGkiLCJhdWQiOiJTZWN1cmVBcGlVc2VyIn0.O5w6RT8OipDq8YEJoaSKCygs49zn5aY7wyZvYmDZjwE'}`,
        },
      });

      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
  }
);

// ==================== GET PAGE CONTENT ============================================

export const getPageContentService = createAsyncThunk<
  PageContent,
  { pageUrlName: string, lang: string, pos: string },
  { rejectValue: any }
>(
  `${sliceName}/getPageContentService`,
  async ({ pageUrlName, lang, pos }, thunkAPI) => {
    try {
      const response = await apiClient.get(`${pagesBaseUrl}/Page/${pos}/${lang}/${pageUrlName}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
  }
);


export const postDataService = createAsyncThunk<
  PageContent,
  { email: string; phoneNumber: string; description: string; services: string },
  { rejectValue: any }
>(
  `${sliceName}/postDataService`,
  async ({ email, phoneNumber, description, services }, thunkAPI) => {
    try {
      const response = await apiClient.post(
        `${pagesBaseUrl}/${CustomForm}`,
        { email, phoneNumber, description, services }
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
  }
);
export const postEmailService = createAsyncThunk<
  PageContent,
  { email: string },
  { rejectValue: any }
>(
  `${sliceName}/postEmailService`,
  async ({ email }, thunkAPI) => {
    try {
      const response = await apiClient.post(
        `${pagesBaseUrl}/${Email}`,
        { email }
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
  }
);

export const getStaticComponentsService = createAsyncThunk<
  { rejectValue: any }
>(
  `${sliceName}/getStaticComponentsService`,
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get(
        `${pagesBaseUrl}/${StaticComponent}`,
        {
          headers: getHeadres(),
        }
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
  }
)
