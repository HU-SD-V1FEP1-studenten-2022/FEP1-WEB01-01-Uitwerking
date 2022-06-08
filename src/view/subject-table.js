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
  // ---- CUT ----
  event.stopPropagation();
  const tableDataCols = event.currentTarget.parentNode.querySelectorAll('td');
  const subjectCode = tableDataCols[SUBJECT_CODE_COL].textContent;

  subjectService.getSubject(subjectCode).then((subject) => {
    const dialogNode = document.querySelector('#subject-info');
    dialogNode.querySelector('#subject-name').textContent = subject.name;
    dialogNode.querySelector('#subject-code').textContent = subjectCode;
    dialogNode.querySelector('#subject-ects').parentNode.classList.toggle('completed', subject.completed);
    dialogNode.querySelector('#subject-ects').textContent = subject.ECTS;
    dialogNode.querySelector('#subject-year').textContent = subject.year;
    dialogNode.querySelector('#subject-periode').textContent = subject.periode;
    dialogNode.querySelector('#subject-description').innerHTML = subject.description;

    dialogNode.showModal();
  });
  // ---- ENDCUT ----
}

/**
 * This function will determine the code of the subject that should be edited and will than navigate
 * to the subject_form_page with the code of the subject as parameter 'key'.
 *
 * @function editSubject
 * @param {<Event>} event
 */
function editSubject(event) {
  // ---- CUT ----
  event.stopPropagation();
  const tableDataCols = event.currentTarget.parentNode.querySelectorAll('td');
  const subjectCode = tableDataCols[SUBJECT_CODE_COL].textContent;
  window.location.assign(`/pages/subject_form_page.html?key=${subjectCode}`);
  // ---- ENDCUT ----
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
  // ---- CUT ----
  event.stopPropagation();
  const tableDataCols = event.currentTarget.parentNode.querySelectorAll('td');
  const subjectCode = tableDataCols[SUBJECT_CODE_COL].textContent;

  subjectService.deleteSubject(subjectCode)
    .then(() => renderSubjectTable())
    .catch((error) => {
      console.error('An unexpected error has occurred');
      console.error(error);
    });
  // ---- ENDCUT ----
}

/**
 * This function will first remove all event listners of within the tbody of the '#subject-table'.
 * After which the function will clear the content of the tbody element itself.
 *
 * @function clearExistingTableRows
 */
function clearExistingTableRows() {
  // ---- CUT ----
  const tableDataRows = subjectTableData.querySelectorAll('tr');
  // cleanup EventListeners first by removing them.
  tableDataRows.forEach((tableDataRow) => {
    const tableDataCols = tableDataRow.querySelectorAll('td');
    tableDataCols[SUBJECT_CODE_COL].removeEventListener('click', showSubject);
    tableDataCols[SUBJECT_NAME_COL].removeEventListener('click', showSubject);
    tableDataCols[EDIT_BUTTON_COL].removeEventListener('click', editSubject);
    tableDataCols[REMOVE_BUTTON_COL].removeEventListener('click', deleteSubject);
  });
  // remove tbody content (will be filled again by the render function)
  subjectTableData.innerHTML = '';
  // ---- ENDCUT ----
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
  // ---- CUT ----
  const subjectTableRowTemplate = document.querySelector('#subject-table-row-template');
  const subjectTableRowNode = subjectTableRowTemplate.content.cloneNode(true);
  const tableData = subjectTableRowNode.querySelectorAll('td');

  const LENGTH_CORRECTION = 1;
  const evenRow = Boolean(Math.abs((subjectTableData.rows.length - LENGTH_CORRECTION) % 2));
  const rowNr = subjectTableData.rows.length;

  subjectTableRowNode.querySelector('tr').setAttribute('id', rowNr);
  subjectTableRowNode.querySelector('tr').classList.toggle('even', evenRow);

  tableData[SUBJECT_CODE_COL].textContent = subjectCode;
  tableData[SUBJECT_NAME_COL].textContent = subjectData.name;
  tableData[SUBJECT_COMPLETED_COL].innerHTML = subjectData.completed ? '<img src="./images/check.svg" alt="behaald">' : '';
  tableData[SUBJECT_CODE_COL].addEventListener('click', showSubject);
  tableData[SUBJECT_NAME_COL].addEventListener('click', showSubject);
  tableData[EDIT_BUTTON_COL].addEventListener('click', editSubject);
  tableData[REMOVE_BUTTON_COL].addEventListener('click', deleteSubject);

  subjectTableData.appendChild(subjectTableRowNode);
  // ---- ENDCUT ----
}

/**
 * This function should render the Subject Table, by first clearing any existing table (using the
 * clearExistingTable function) before the function will add a table row for each subject using
 * the addTableRow funciton.
 *
 * @function renderSubjectTable
 */
function renderSubjectTable() {
  // ---- CUT ----
  clearExistingTableRows();

  subjectService.getSubjects().then((subjects) => {
    Object.entries(subjects).forEach(([key, value]) => {
      addTableRow(key, value);
    });
  });
  // ---- ENDCUT ----
}

renderSubjectTable();
