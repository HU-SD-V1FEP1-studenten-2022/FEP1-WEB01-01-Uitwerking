import SubjectService from '../service/subject_service';
import { convertFormDataToJSON, getSubjectCodeFromUrl } from '../utils/subject-form-util';

const submitBtn = document.querySelector('.primary-button');
const resetBtn = document.querySelector('.secondary-button');

const subjectService = new SubjectService();

/**
 * This function should be called by the click event handler on submitting the form
 * in order to add a subject.
 * If the server indicates that the subject has been added, this function should
 * redirect the user to the homepage.
 * Otherwise, in case of a conflict because the subject code already exists an error
 * should be shown near the 'vakcode-input' field.
 * For all other errors the general element with the .error class should show the error.
 * @function addSubject
 * @param {Event} event
 */
function addSubject(event) {
  console.log(`addSubject(${event})`);
}

/**
 * This function should be called by the click event handler on submitting the form
 * in order to update a subject.
 * If the server indicates that the subject has been updated, this function should
 * redirect the user to the homepage.
 * Otherwise, in case of a not found error the error should be shown near the
 * 'vakcode-input' field.
 * For all other errors the general element with the .error class should show the error.
 * @function updateSubject
 * @param {Event} event
 */
function updateSubject(event) {
}

/**
 * This function will initialize the subject_form_page to be an ADD subject form page,
 * by changing the content of h1 and submitBtn label of the HTML to 'Vak toevoegen' and
 * 'Toevoegen'.
 * This function will also take care the the click of the submit button will trigger a
 * call of the addSubject function.
 * @function setupAddForm
 */
function renderAddForm() {
}

/**
 * This function will render the page to become an edit form by changing the content of the
 * h1 and submitBtn label of the HTML to 'Vak bijwerken' and 'Bijwerken'.
 * This function will further fill all the form fields with information about the given subjectCode.
 * To prevent the user from editing the 'key', the field '#vakcode-input' should not be editable.
 * The information to be filled in the form fields will be retrieved using the service layer.
 * This function will also add a click event handler on the submit button to trigger the
 * updateSubject function.
 *
 * @function renderEditForm
 * @param {<String>} subjectCode
 */
function renderEditForm(subjectCode) {
}

// -------------------- Main programm -----------------------------------
resetBtn.addEventListener('click', () => window.location.assign('/'));

renderAddForm();
