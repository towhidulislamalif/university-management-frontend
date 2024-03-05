export const userRole = {
  ADMIN: 'admin',
  TEACHER: 'faculty',
  STUDENT: 'student',
};

// Gender options
const genderValues = ['male', 'female', 'other'];
export const genderOptions = genderValues.map((gender) => ({
  label: gender,
  value: gender,
}));

// Blood group options
const bloodGroupValues = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const bloodGroupOptions = bloodGroupValues.map((bloodGroup) => ({
  label: bloodGroup,
  value: bloodGroup,
}));

const designations = [
  'Professor',
  'Associate Professor',
  'Assistant Professor',
  'Lecturer',
  'Research Professor',
  'Department Head',
  'Dean of Engineering',
  'Lab Coordinator',
  'Adjunct Professor',
  'Visiting Professor',
];

export const designationOptions = designations.map((designation) => ({
  label: designation,
  value: designation,
}));
