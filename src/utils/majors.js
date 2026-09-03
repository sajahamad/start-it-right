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
