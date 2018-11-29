const state_name = 'login-state';
const patientId = 'patient-state';
/**
 * Loads state from storage
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(state_name);
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return null;
  }
};

export const loadPatientState = () => {
  try {
    const serializedState = localStorage.getItem(patientId);
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return null;
  }
};

/**
 *
 * @param {Object} state to be stored.
 */

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(state_name, serializedState);
  } catch (error) {
    return false;
  }
};

export const savePatientState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(patientId, serializedState);
  } catch (error) {
    return false;
  }
};

export const clearState = () => {
  try {
    localStorage.removeItem(state_name);
    return true;
  } catch (error) {
    return false;
  }
};

export const accessToken = () => {
  const user = loadState();
  if (user) {
    return user.token;
  }

  return null;
};
