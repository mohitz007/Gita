import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// bookmarks is and array of objects of chapterValue and slokValue
const initialState = {
    bookmarks: [
        {field_chapter_value: 1, field_nsutra_value:2},
        {field_chapter_value: 2, field_nsutra_value:4},
        {field_chapter_value: 2, field_nsutra_value:5},


    ],


};

const gita_additional_data = createSlice({
    name: 'gita_additional_data',
    initialState,
    reducers: {
        add_bookmark(state,action) {
            const {field_chapter_value,field_nsutra_value} = action.payload;
            console.log(field_chapter_value,field_nsutra_value);
            state.bookmarks.push({field_chapter_value,field_nsutra_value});
        },
        remove_bookmark(state,action) {
            const {field_chapter_value,field_nsutra_value} = action.payload;
            console.log(field_chapter_value,field_nsutra_value);
            state.bookmarks = state.bookmarks.filter((item) => !(item.field_chapter_value === field_chapter_value && item.field_nsutra_value === field_nsutra_value));
        },
    },
});


export const {add_bookmark, remove_bookmark} = gita_additional_data.actions;
export default gita_additional_data.reducer;