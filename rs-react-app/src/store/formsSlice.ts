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
    'Armenia',
    'Belarus',
    'Canada',
    'Germany',
    'Kazakhstan',
    'Poland',
    'Russia',
    'Spain',
    'Ukraine',
    'United States',
  ],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<FormSubmission>) => {
      state.submissions.unshift(action.payload);
    },
    markSubmissionAsSeen: (state, action: PayloadAction<string>) => {
      const submission = state.submissions.find(
        (item) => item.id === action.payload
      );

      if (submission) {
        submission.isNew = false;
      }
    },
  },
});

export const { addSubmission, markSubmissionAsSeen } = formsSlice.actions;

export default formsSlice.reducer;
