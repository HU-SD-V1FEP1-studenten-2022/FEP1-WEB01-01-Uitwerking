import SubjectService from '../service/subject_service';

const SUBJECT_CODE_COL = 0;
const SUBJECT_NAME_COL = 1;
const SUBJECT_COMPLETED_COL = 2;
const EDIT_BUTTON_COL = 3;
const REMOVE_BUTTON_COL = 4;

const subjectService = new SubjectService();

const subjectTableData = document
  .querySelector('#subject-table')
  .querySelector('tbody');

/**
 * This function will open a modal dialog window ('#subject-info') to present the user additional
 * information about the subject that was clicked in the tabel.
 * To determine which subject was clicked this function will use the information from the DOM
 * relatief of the DOM element that was clicked (currentTarget).
 *
 * @function showSubject
 * @param {<Event>} event
 */
function showSubject(event) {
  console.log('showSubject', event);
}

/**
 * This function will determine the code of the subject that should be edited and will than navigate
 * to the subject_form_page with the code of the subject as parameter 'key'.
 *
 * @function editSubject
 * @param {<Event>} event
 */
function editSubject(event) {
}

/**
 * This function will delete handle the event in which we want to delete a subject.
 * The function will determine the code of the subject to be deleted and call the
 * subject service to actually delete te subject.
 * On a successful deletion this function will trigger a rerendering of the table by
 * calling the renderSubjectTable function.
 *
 * @function deleteSubject
 * @param {<Event>} event
 */
function deleteSubject(event) {
}

/**
 * This function will first remove all event listners of within the tbody of the '#subject-table'.
 * After which the function will clear the content of the tbody element itself.
 *
 * @function clearExistingTableRows
 */
function clearExistingTableRows() {
}

/**
 * This function adds a row and all its eventhandlers to the '#subject-table' element using the
 * '#subject-table-row-template'.
 * To make the table more readable the odd and even rows should be distinishable by their background
 * color, using the 'even' class attribute.
 *
 * @function addTableRow
 * @param {<String>} subjectCode - The code of the subject, for instance 'TICT-SV1FEP1-20'
 * @param {<JSON Object>} subjectData - A JSON object containing the data belonging to the subject
 */
function addTableRow(subjectCode, subjectData) {
  console.log(`addTableRow(${subjectCode}, ${subjectData})`);
}

/**
 * This function should render the Subject Table, by first clearing any existing table (using the
 * clearExistingTable function) before the function will add a table row for each subject using
 * the addTableRow funciton.
 *
 * @function renderSubjectTable
 */
function renderSubjectTable() {
}

renderSubjectTable();
