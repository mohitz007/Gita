import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cheerio from "cheerio";
import { instance } from "../configs/axiosConfig";

const initialState = {

    status: 'idle',
    error: null,
    data: {
        language: 'dv',
        field_chapter_value: 1,
        field_nsutra_value: 1,
        slok: "",
        htrskd: { value: 0, text: "", title: "Hindi Translation By Swami Ramsukhdas" },
        httyn: { value: 0, text: "", title: "Hindi Translation By Swami Tejomayananda" },
        htshg: { value: 0, text: "", title: "Hindi Translation Of Sri Shankaracharya's Sanskrit Commentary By Sri Harikrishnadas Goenka" },
        scsh: { value: 0, text: "", title: "Sanskrit Commentary By Sri Shankaracharya" },
        hcchi: { value: 0, text: "", title: "Hindi Commentary By Swami Chinmayananda" },
        hcrskd: { value: 0, text: "", title: "Hindi Commentary By Swami Ramsukhdas" },
        scang: { value: 0, text: "", title: "Sanskrit Commentary By Sri Abhinavgupta" },
        scram: { value: 0, text: "", title: "Sanskrit Commentary By Sri Ramanuja" },
        scanand: { value: 0, text: "", title: "Sanskrit Commentary By Sri Anandgiri" },
        scjaya: { value: 0, text: "", title: "Sanskrit Commentary By Sri Jayatritha" },
        scmad: { value: 0, text: "", title: "Sanskrit Commentary By Sri Madhavacharya" },
        scval: { value: 0, text: "", title: "Sanskrit Commentary By Sri Vallabhacharya" },
        scms: { value: 0, text: "", title: "Sanskrit Commentary By Sri Madhusudan Saraswati" },
        scsri: { value: 0, text: "", title: "Sanskrit Commentary By Sri Sridhara Swami" },
        scvv: { value: 0, text: "", title: "Sanskrit Commentary By Sri Vedantadeshikacharya Venkatanatha" },
        scpur: { value: 0, text: "", title: "Sanskrit Commentary By Sri Purushottamji" },
        scneel: { value: 0, text: "", title: "Sanskrit Commentary By Sri Neelkanth" },
        scdhan: { value: 0, text: "", title: "Sanskrit Commentary By Sri Dhanpati" },
        ecsiva: { value: 0, text: "", title: "English Commentary By Swami Sivananda" },
        etsiva: { value: 0, text: "", title: "English Translation By Swami Sivananda" },
        etpurohit: { value: 0, text: "", title: "English Translation by Shri Purohit Swami" },
        etgb: { value: 0, text: "", title: "English Translation By Swami Gambirananda" },
        setgb: { value: 0, text: "", title: "English Translation Of Sri Shankaracharya's Sanskrit Commentary By Swami Gambirananda" },
        etssa: { value: 1, text: "", title: "English Translation By By Dr. S. Sankaranarayan" },
        etassa: { value: 0, text: "", title: "English Translation of Abhinavgupta's Sanskrit Commentary By Dr. S. Sankaranarayan" },
        etradi: { value: 0, text: "", title: "English Translation of Ramanuja's Sanskrit Commentary By Swami Adidevananda" },
        etadi: { value: 1, text: "", title: "English Translation By Swami Adidevananda" },
    }
};


const fetch_slokAndTranslation = async (state) => {
    // console.log("fetch");
    // console.log("state", state.etgb);
    parameters = {};
    Object.entries(state).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            parameters[key] = value.value;
        }
    });
    parameters["language"] = state.language;
    parameters["field_chapter_value"] = state.field_chapter_value;
    parameters["field_nsutra_value"] = state.field_nsutra_value;


    const response = await instance.get('/srimad', {
        params: parameters,
    });
    // console.log("response",response.data);
    return response.data;

}


export const setSlokChapterLanguage = createAsyncThunk(
    "setSlok",
    async (payload, thunkAPI) => {


        // payload
        // [chapterValue,slokValue,language]
        // OR
        // Array of objects containing Translation and Language

        if (payload.length == 3) {
            [chapterValue, slokValue, language] = payload;
            // console.log("setSlokChapterLanguage", chapterValue, slokValue, language);
            try {
                const newState = thunkAPI.getState().gita_action_reducer.data;
                const state = { ...newState };
                state.field_nsutra_value = slokValue;
                state.field_chapter_value = chapterValue;
                state.language = language;
                // console.log("state after setting", state.field_nsutra_value);
                const data = await fetch_slokAndTranslation(state);
                return [data, state];
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
        else {
            checkedItems = payload;
            // console.log(checkedItems);

            try {
                const oldState = thunkAPI.getState().gita_action_reducer.data;
                const state = { ...oldState };
                checkedItems.forEach((item) => {

                    if (typeof item === "string") {
                        state.language = item;
                    }
                    else {

                        let { name, value } = item
                        value = +value
                        state[name] = { text: state[name].text, value: value, title: state[name].title }
                        // console.log("name",name,"value", value,"state.name",state[name]);
                    }
                })

                // console.log("state setTranslation",state);
                const data = await fetch_slokAndTranslation(state);
                return [data, state];
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }

    }
);




const gitaSlice = createSlice({
    name: 'gitaSlice',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(setSlokChapterLanguage.pending, (state) => {
                state.status = 'loading';
                console.log("setSlokChapterLanguage pending")
            })
            
            .addCase(setSlokChapterLanguage.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
                console.log("setSlokChapterLanguage rejected", action);
            })
            .addCase(setSlokChapterLanguage.fulfilled, (state, action) => {
                console.log("setSlokChapterLanguage fulfilled");
                state.status = 'success';
                // console.log("action",action.payload);
                const [html, newState] = action.payload;
                // console.log("state", newState);
                state.data = newState;
                const $ = cheerio.load(html);
                let element_slok = $('.views-field.views-field-body');

                element_slok.each((index, element) => {
                    // Find all font tags within the current element
                    const fontTags = $(element).find('font');

                    // Check if there is at least one font tag
                    if (fontTags.length > 0) {
                        // Remove the text from the first font tag
                        fontTags.first().remove();
                    }
                    // Remove all br tags
                    $(element).find('br').remove();

                    // Get the modified HTML content of the current element
                    // const modifiedHtml = $(element).html();
                    let modifiedHtml = $(element).text();

                    // Remove leading and trailing spaces
                    modifiedHtml = modifiedHtml.trim();

                    // Remove leading and trailing line breaks (enters)
                    modifiedHtml = modifiedHtml.replace(/^\s+|\s+$/g, '');
                    // Save the modified HTML content to your state or wherever needed
                    state.data.slok = modifiedHtml;
                });

                // working perfect
                // element_slok = $('.views-field.views-field-field-hcchi');
                // element_slok.each((index, element) => {
                //     const text = $(element).text();
                //     state.data.hcchi = { text: text, value: state.data.hcchi.value };
                // });

                // const excludedKeys = ['language', 'field_chapter_value', 'field_nsutra_value', 'slok'];
                // const iterableKeys = Object.keys(state.data);
                // iterableKeys
                //     .filter((key) => !excludedKeys.includes(key))
                //     .forEach((key) => {
                //         const element_slok = $(`.views-field.views-field-field-${key}`);
                //         const text = element_slok.text();
                //         state.data[key] = { text, value: state.data[key]?.value, title: state.data[key]?.title };
                //     });


                const excludedKeys = ['language', 'field_chapter_value', 'field_nsutra_value', 'slok'];
                const iterableKeys = Object.keys(state.data);
                iterableKeys
                    .filter((key) => !excludedKeys.includes(key))
                    .forEach((key) => {
                        const element_slok = $(`.views-field.views-field-field-${key}`);
                        element_slok.each((index, element) => {
                            // Find all font tags within the current element
                            const fontTags = $(element).find('font');

                            // Check if there is at least one font tag
                            if (fontTags.length > 0) {
                                // Remove the text from the first font tag
                                fontTags.first().remove();
                            }


                            let modifiedHtml = $(element).text();

                            // Remove leading and trailing spaces
                            modifiedHtml = modifiedHtml.trim();

                            // Remove leading and trailing line breaks (enters)
                            const text = modifiedHtml.replace(/^\s+|\s+$/g, '');
                            state.data[key] = { text, value: state.data[key]?.value, title: state.data[key]?.title };
                        });
                    });


                // console.log("final state", state);

            })
    },
})


export default gitaSlice.reducer