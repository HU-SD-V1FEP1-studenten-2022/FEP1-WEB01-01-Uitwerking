function transformJsonSubjectsToArray(subjects) {
  let subjectsArray = [];
  Object.keys(subjects).forEach((subject) => {
    subjectsArray = [...subjectsArray, { code: subject, ...subjects[subject] }];
  });
  return subjectsArray;
}

// determine labels (concat studiejaar, blok)
function determineLabels(subjects) {
  let yearPeriodeLabels = [];
  subjects.forEach((subject) => {
    yearPeriodeLabels = yearPeriodeLabels.includes(`${subject.year}${subject.periode}`)
      ? yearPeriodeLabels
      : [...yearPeriodeLabels, `${subject.year}${subject.periode}`];
  });
  return yearPeriodeLabels;
}

function determineCompletedEctsPerPeriode(subjects, yearPeriodeLabels) {
  let periodes = [];
  let ectsCompletedPerPeriode = [];
  yearPeriodeLabels.forEach((label) => {
    const POSITION_YEAR = 0;
    const POSITION_PERIODE = 1;
    const labelblok = subjects.filter(
      (subject) => (
        (subject.year === Number(label[POSITION_YEAR]))
         && (subject.periode === label[POSITION_PERIODE])
      ),
    );
    periodes = [...periodes, labelblok];
    ectsCompletedPerPeriode = [
      ...ectsCompletedPerPeriode,
      labelblok.reduce(
        (blokECTS, currentBlok) => blokECTS + currentBlok.ECTS * Number(currentBlok.completed),
        0,
      ),
    ];
  });
  return ectsCompletedPerPeriode;
}

export {
  transformJsonSubjectsToArray,
  determineLabels,
  determineCompletedEctsPerPeriode,
};
