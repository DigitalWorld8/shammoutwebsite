import { createSlice } from '@reduxjs/toolkit';
import { getPageBySybUrlService, getPageContentService, getStaticComponentsService, getSubPathService, postDataService, postEmailService } from '../services/pagesService';

interface Page {
    id: number;
    pageUrlName: string;
}
interface posState {
    isLoading: boolean;
    pages: Page[];
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
interface staticComp {
    id: number;
    position: number;
    type: string;
    content: string;
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
    segments: Segment[]; staticComp: staticComp[];

}

interface posState {
    isLoading: boolean;
    isLoadingPost: boolean;
    pages: Page[];
    pageContent: PageContent | null;
    pos: string;
    language: string
}
const initialState: posState = {
    isLoading: false,
    isLoadingPost: false,
    pages: [],
    pos: 'sy',
    language: 'english',
    pageContent: {
        id: 0,
        pageUrlName: '',
        language: '',
        pos: '',
        title: '',
        isDeleted: false,
        status: '',
        description: '',
        segments: []
    },
    staticComp: [],

};

const posSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        SetPos(state, action) {
            state.pos = action.payload;
        },
        SetLang(state, action) {
            state.language = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // ==================== GET PAGES ============================================
            .addCase(getSubPathService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSubPathService.fulfilled, (state, action) => {
                const data = action.payload;

                state.pages = data
                state.isLoading = false;


            })
            .addCase(getSubPathService.rejected, (state) => {
                state.isLoading = false;
            })
            // ==================== GET PAGE CONTENT ============================================
            .addCase(getPageContentService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPageContentService.fulfilled, (state, action) => {
                const data = action.payload;
                state.pageContent = data
                state.isLoading = false;


            })
            .addCase(getPageContentService.rejected, (state) => {
                state.isLoading = false;
            })
            // ==================== GET PAGE CONTENT ============================================
            .addCase(postDataService.pending, (state) => {
                state.isLoadingPost = true;
            })
            .addCase(postDataService.fulfilled, (state, action) => {
                state.isLoadingPost = false;


            })
            .addCase(postDataService.rejected, (state) => {
                state.isLoadingPost = false;
            })
            // ==================== GET PAGE CONTENT ============================================
            .addCase(postEmailService.pending, (state) => {
                state.isLoadingPost = true;
            })
            .addCase(postEmailService.fulfilled, (state, action) => {
                state.isLoadingPost = false;


            })
            .addCase(postEmailService.rejected, (state) => {
                state.isLoadingPost = false;
            })


            .addCase(getStaticComponentsService.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(getStaticComponentsService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.staticComp = action.payload.items
            })
            .addCase(getStaticComponentsService.rejected, (state) => {
                state.isLoading = false;
            })



    },
});
export const { SetLang, SetPos } = posSlice.actions;

export default posSlice.reducer;
