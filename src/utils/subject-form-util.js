/* eslint-disable import/prefer-default-export */
/**
 * Subjects at the HU uses a pattern of:
 * [Institiuut/Opleiding]-[Voltijd/Deeltijd][Studiejaar][Vakcode]-[Examenversie]
 * The 'vakcode' is our key value we will extract with this function using
 * regular expressions.
 * @function extractKeyFromCode
 * @param {string} subjectcode
 * @returns {string} - the key value extracted from the subjectcode.
 */
function extractKeyFromCode(subjectcode) {
  // De eerste reguliere expressie haalt er [Studiejaar][Vakcode] eruit, de tweede geeft alleen de
  // vakcode. Maar no worries dit hoef je (nog) niet te kunnen lezen / maken.
  return subjectcode.match(/\d[A-Z]+\d*/g)[0].match(/[A-Z]+\d*/g)[0];
}

/**
 * This function converts a given FormData object to a JSON object.
 *
 * @function convertFormDataToJSON
 * @param {<FormData>} formdata
 * @returns <JSON Object>
 */
function convertFormDataToJSON(formdata) {
  const jsonObject = {};
  // ---- CUT ----
  formdata.forEach((value, key) => {
    jsonObject[key] = value;
  });
  jsonObject.year = Number(jsonObject.year);
  jsonObject.ECTS = Number(jsonObject.ECTS);
  jsonObject.completed = Boolean(formdata.get('completed'));
  // ---- ENDCUT ----
  return jsonObject;
}

/**
 * This function will extract the value of the URL parameter 'key'.
 *
 * @function getSubjectCodeFromUrl
 * @returns <String> - the value of the URL parameter 'key' if present, otherwise the string will
 *                     have the value null.
 */
function getSubjectCodeFromUrl() {
  // ---- CUT ----
  let key = null;
  const urlParams = new URL(document.location).searchParams;
  key = urlParams.get('key');
  return key;
  // ---- ENDCUT ----
}

export {
  extractKeyFromCode,
  convertFormDataToJSON,
  getSubjectCodeFromUrl,
};
