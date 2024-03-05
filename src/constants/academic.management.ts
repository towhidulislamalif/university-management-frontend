const semesters = [
  { label: 'Autumn', value: '01' },
  { label: 'Summer', value: '02' },
  { label: 'Fall', value: '03' },
];

export const semesterOptions = semesters.map((semester) => ({
  label: semester.label,
  value: semester.value,
}));

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthOptions = months.map((month) => ({
  label: month,
  value: month,
}));

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

export const yearOptions = years.map((year) => ({
  label: year,
  value: year,
}));

const departmentNames = [
  'Department of Computer Science and Engineering',
  'Department of Software Systems',
  'Department of Algorithmic Studies',
  'Department of Information Systems',
  'Department of Artificial Intelligence and Machine Learning',
  'Department of Cybersecurity and Network Defense',
  'Department of Data Analytics and Visualization',
  'Department of Human-Computer Interaction',
  'Department of Computational Mathematics',
  'Department of Computer Vision and Image Processing',
];

export const departmentNameOptions = departmentNames.map((department) => ({
  label: department,
  value: department,
}));

const facultyNames = [
  'Faculty of Computational Sciences',
  'Faculty of Software Engineering and Programming',
  'Faculty of Cybernetics and Algorithms',
  'Faculty of Computer Systems Design',
  'Faculty of Information Technology and Computing',
  'Faculty of Artificial Intelligence Studies',
  'Faculty of Data Science and Analytics',
  'Faculty of Network Engineering',
  'Faculty of Computer Graphics and Multimedia',
  'Faculty of Robotics and Automation',
];

export const facultyNameOptions = facultyNames.map((faculty) => ({
  label: faculty,
  value: faculty,
}));
