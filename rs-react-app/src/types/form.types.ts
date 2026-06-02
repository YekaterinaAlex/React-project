export type Gender = 'male' | 'female';

export type FormSubmission = {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: Gender;
  termsAccepted: boolean;
  country: string;
};
