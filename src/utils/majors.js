export function gpaSummary(major) {
  const rates = major.admission.flatMap((entry) => [entry.minGpa, entry.competitiveGpa]);
  const min = Math.min(...rates);
  const max = Math.max(...rates);
  return { min, max };
}

export function getMajorById(majors, id) {
  return majors.find((major) => major.id === id);
}

export function getRelatedMajors(majors, major) {
  return major.relatedMajors
    .map((id) => getMajorById(majors, id))
    .filter(Boolean);
}

export function getTracks(majors) {
  return [...new Set(majors.flatMap((major) => major.track))];
}

export function filterMajors(majors, { search = '', track = '' } = {}) {
  const query = search.trim().toLowerCase();
  return majors.filter((major) => {
    const matchesSearch =
      !query ||
      major.name.toLowerCase().includes(query) ||
      major.faculty.toLowerCase().includes(query);
    const matchesTrack = !track || major.track.includes(track);
    return matchesSearch && matchesTrack;
  });
}

const DURATION_YEARS_PATTERN = /\d+(\.\d+)?/;

export function durationYears(major) {
  const match = major.duration.match(DURATION_YEARS_PATTERN);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

export function getFeeRange(major) {
  const fees = major.admission.map((entry) => entry.feePerCreditHour).filter((fee) => fee != null);
  if (fees.length === 0) return null;
  return { min: Math.min(...fees), max: Math.max(...fees) };
}

export function getMajorUniversities(major) {
  return [...new Set(major.admission.map((entry) => entry.university))];
}

export function sortMajors(majors, sortKey = 'gpa-desc') {
  const sorted = [...majors];
  switch (sortKey) {
    case 'gpa-desc':
      return sorted.sort((a, b) => gpaSummary(b).min - gpaSummary(a).min);
    case 'gpa-asc':
      return sorted.sort((a, b) => gpaSummary(a).min - gpaSummary(b).min);
    case 'alpha':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    case 'duration':
      return sorted.sort((a, b) => durationYears(a) - durationYears(b));
    default:
      return sorted;
  }
}
