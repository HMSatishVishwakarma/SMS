import { createSlice } from '@reduxjs/toolkit';

export interface student {
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  class: string;
}

export interface StudentState {
  studenList: student[];
}

const initialState: StudentState = {
  studenList: [],
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (statstate, action: any) => {
      statstate.studenList.push(action.payload);
    },
    listStudent: (state) => {
      state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addStudent, listStudent } = studentSlice.actions;

export default studentSlice.reducer;
