const UNIVERSITY_SLUGS = {
  'الجامعة الإسلامية بغزة': 'iug',
  'جامعة الأزهر': 'azhar',
  'جامعة فلسطين': 'palestine',
  'جامعة الأقصى': 'aqsa',
};

function slugFor(name) {
  return UNIVERSITY_SLUGS[name] ?? name;
}

export function getUniversities(majors) {
  const byName = new Map();

  for (const major of majors) {
    for (const entry of major.admission) {
      if (!byName.has(entry.university)) {
        byName.set(entry.university, { name: entry.university, majorIds: new Set(), rates: [] });
      }
      const bucket = byName.get(entry.university);
      bucket.majorIds.add(major.id);
      bucket.rates.push(entry.minGpa, entry.competitiveGpa);
    }
  }

  return [...byName.values()]
    .map(({ name, majorIds, rates }) => ({
      id: slugFor(name),
      name,
      majorIds: [...majorIds],
      majorsCount: majorIds.size,
      gpaRange: { min: Math.min(...rates), max: Math.max(...rates) },
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ar'));
}

export function getUniversityById(majors, id) {
  return getUniversities(majors).find((university) => university.id === id);
}

export function getMajorsForUniversity(majors, universityId) {
  const university = getUniversityById(majors, universityId);
  if (!university) return [];
  const idSet = new Set(university.majorIds);
  return majors.filter((major) => idSet.has(major.id));
}
