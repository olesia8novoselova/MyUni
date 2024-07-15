import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Psychologist {
    id: string;
    name: string;
    tg: string;
    image: string;
    language: string;
    description: string;
}

interface PsychologistState {
    psychologists: Psychologist[];
}

const initialState: PsychologistState = {
    psychologists: [],
};

const psychologistSlice = createSlice({
    name: 'psychologists',
    initialState,
    reducers: {
        addPsychologist: (state, action: PayloadAction<Psychologist>) => {
            state.psychologists.push(action.payload);
        },
        removePsychologist: (state, action: PayloadAction<string>) => {
            state.psychologists = state.psychologists.filter(
                psychologist => psychologist.id !== action.payload
            );
        },
    },
});

export const { addPsychologist, removePsychologist } = psychologistSlice.actions;
export default psychologistSlice.reducer;