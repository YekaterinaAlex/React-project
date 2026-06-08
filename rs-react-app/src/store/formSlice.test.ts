import { describe, expect, it } from 'vitest';

import formsReducer, {
  addSubmission,
  markSubmissionAsSeen,
} from './formsSlice';

describe('formsSlice', () => {
  const mockSubmission = {
    id: '1',
    name: 'Anna',
    age: 25,
    email: 'anna@test.com',
    gender: 'female' as const,
    termsAccepted: true,
    country: 'Canada',
    password: 'Password1!',
    imageBase64: 'base64-image',
    createdAt: 123456789,
    isNew: true,
  };

  it('adds a submission', () => {
    const state = formsReducer(undefined, addSubmission(mockSubmission));

    expect(state.submissions).toHaveLength(1);
    expect(state.submissions[0]).toEqual(mockSubmission);
  });

  it('adds newest submission to the beginning', () => {
    const firstState = formsReducer(undefined, addSubmission(mockSubmission));

    const secondSubmission = {
      ...mockSubmission,
      id: '2',
      name: 'John',
    };

    const secondState = formsReducer(
      firstState,
      addSubmission(secondSubmission)
    );

    expect(secondState.submissions[0].id).toBe('2');
    expect(secondState.submissions[1].id).toBe('1');
  });

  it('marks submission as seen', () => {
    const stateWithSubmission = formsReducer(
      undefined,
      addSubmission(mockSubmission)
    );

    const updatedState = formsReducer(
      stateWithSubmission,
      markSubmissionAsSeen('1')
    );

    expect(updatedState.submissions[0].isNew).toBe(false);
  });
});
