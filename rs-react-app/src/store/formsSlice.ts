import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { FormSubmission } from '../types/form.types';

type FormState = {
  submissions: FormSubmission[];
  countries: string[];
};
const initialState: FormState = {
  submissions: [],
  countries: [
    'Belarus',
    'Canada',
    'Kazakhstan',
    'Germany',
    'United States',
    'Spain',
  ],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<FormSubmission>) => {
      state.submissions.unshift(action.payload);
    },
  },
});

export const { addSubmission } = formsSlice.actions;

export default formsSlice.reducer;
