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
  // ---- CUT ----
  event.preventDefault();

  const form = document.forms['subject-form'];
  const formData = new FormData(form);

  const codeKey = formData.get('code');
  subjectService.postSubject(codeKey, convertFormDataToJSON(formData))
    .then(() => {
      // The server has responded without an error.
      window.location.assign('/');
    })
    .catch((error) => {
      const CONFLICT_ERROR = 409;
      if (Number(error.message) === CONFLICT_ERROR) {
        // set text at code-error and mark input field red
        document.querySelector('.code-error').textContent = 'Vakcode key bestaat al';
        document.querySelector('#vakcode-input').classList.add('error');
      } else {
        document.querySelector('.error').textContent = `ERROR: ${error.message}`;
      }
    });
  // ---- ENDCUT ----
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
  // ---- CUT ----
  event.preventDefault();

  // Notice that fields that are disabled will not be included within the FormData object.
  document.querySelector('#vakcode-input').removeAttribute('disabled');

  const form = document.forms['subject-form'];
  const formData = new FormData(form);

  // for (let key of formData.keys()) {
  //   console.log(`${key} - ${formData.get(key)}`);
  // }

  const codeKey = formData.get('code');

  subjectService.putSubject(codeKey, convertFormDataToJSON(formData))
    .then(() => {
      // The server has responded without an error.
      window.location.assign('/');
    })
    .catch((error) => {
      const NOT_FOUND_ERROR = 404;
      if (Number(error.message) === NOT_FOUND_ERROR) {
        // set text at code-error and mark input field red
        document.querySelector('.code-error').textContent = 'Vakcode key bestaat niet';
        document.querySelector('#vakcode-input').classList.add('error');
      } else {
        document.querySelector('.error').textContent = `ERROR: ${error.message}`;
      }
    });
  // ---- ENDCUT ----
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
  // ---- CUT ----
  document.querySelector('h1').textContent = 'Vak toevoegen';
  document.querySelector('.primary-button').textContent = 'Toevoegen';
  submitBtn.addEventListener('click', (event) => addSubject(event));
  // ---- ENDCUT ----
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
  // ---- CUT ----
  document.querySelector('h1').textContent = 'Vak bijwerken';
  document.querySelector('.primary-button').textContent = 'Bijwerken';

  subjectService.getSubject(subjectCode).then((subject) => {
    document.querySelector('#vakcode-input').value = subjectCode;
    document.querySelector('#vaknaam-input').value = subject.name;
    document.querySelector('#studiejaar-input').value = subject.year;
    document.querySelector('#blok-input').value = subject.periode;
    document.querySelector('#ects-input').value = subject.ECTS;
    document.querySelector('#description-input').value = subject.description;
    document.querySelector('#subject-completed').checked = subject.completed;

    document.querySelector('#vakcode-input').setAttribute('disabled', 'true');

    submitBtn.addEventListener('click', (event) => updateSubject(event));
    // ---- ENDCUT ----
  });
}

// -------------------- Main programm -----------------------------------
resetBtn.addEventListener('click', () => window.location.assign('/'));

// ---- CUT ----
const subjectCode = getSubjectCodeFromUrl();
if (!subjectCode) {
// ---- ENDCUT ----
  renderAddForm();
// ---- CUT ----
} else {
  renderEditForm(subjectCode);
}
// ---- ENDCUT ----
