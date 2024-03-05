const status = ['UPCOMING', 'ONGOING', 'ENDED'];

export const statusOptions = status.map((s) => ({
  label: s,
  value: s,
}));

const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const dayOptions = days.map((day) => ({
  label: day,
  value: day,
}));
