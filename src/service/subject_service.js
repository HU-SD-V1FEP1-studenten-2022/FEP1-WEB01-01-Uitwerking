// TODO: Change the SERVER and PORT according depending on the server and port settings of
//       your backend server.
// NOTE: In the future these settings will move to a json file as soon as the main browsers will
//       have implemented the JSON modules import statement (see: https://github.com/tc39/proposal-json-modules)
const SERVER = 'http://localhost'; // Backend Server
const PORT = 4000; // Port of the Backend Server
const BASE_PATH = 'v1/subject'; // Default API path for the backend server

/**
 * This class offers services regarding the class Subject, by accessing the REST
 * API of the server for this class.
 */
export default class SubjectService {
  constructor() {
    this.base_url = `${SERVER}:${PORT}/${BASE_PATH}`;
  }

  /**
   * This method fetches alle subjects known by the server.
   * @returns {Promise<json object>} - JSON object with the subject data from the server.
   */
  getSubjects() {
    return fetch(this.base_url)
      .then((response) => response.json());
  }

  // The following code isn't very nice yet (lots of repeating code).
  // Code still has to be refactored.

  /**
   * This method fetches the information about a specief subject given by the key
   * @param {string} key - the key value of the subject
   * @returns {Promise<JSON Object>}
   * @throws {Error} - In case of an error the response.status will be thrown.
   */
  getSubject(key) {
    return fetch(`${this.base_url}/${key}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      });
  }

  /**
   * This method expects a subject key as well as all subject data in the form
   * of a JSON object. The method will post this information to the server in order
   * to create a new subject entry.
   * @param {string} key - the key value of the subject
   * @param {Object} data - a JSON object with all the information about the subject
   * @returns {Promise<Response>} - a promise of the response object as send by the server, which
   *    should be OK.
   * @throws {Error} - In case of an error the response.status will be thrown.
   */
  postSubject(key, data) {
    return fetch(`${this.base_url}/${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response;
      });
    // since we can't solve the error here we don't need a catch.
    // So the caller will have to deal with the error.
  }

  /**
   * This method expects a subject key as well as all subject data in the form
   * of a JSON object. The method will put this information to the server in order
   * to update an existing subject entry.
   * @param {string} key - the key value of the subject
   * @param {Object} data - a JSON object with all the information about the subject
   * @returns {Promise<Response>} - a promise of the response object as send by the server,
   *    which should be OK.
   * @throws {Error} - In case of an error the response.status will be thrown.
   */
  putSubject(key, data) {
    return fetch(`${this.base_url}/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response;
      });
    // since we can't solve the error here we don't need a catch.
    // So the caller will have to deal with the error.
  }

  /**
   * This method expects a subject key, in order todelete the subject on the
   * server.
   * @param {string} key - the key value of the subject
   * @returns {Promise<Response} - a promise of the response object as send by the server,
   *    which should be OK.
   * @throws {Error} - In case of an error the response.status will be thrown.
   */
  deleteSubject(key) {
    return fetch(`${this.base_url}/${key}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
      });
    // since we can't solve the error here, we don't need a catch.
    // So the caller will have to deal with the error.
  }
}
