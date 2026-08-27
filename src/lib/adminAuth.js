const STORAGE_KEY = "sic_admin_secret";

// Kept in sessionStorage only (not localStorage) so it clears when the
// browser tab closes rather than persisting indefinitely on a shared machine.
export const getAdminSecret = () => sessionStorage.getItem(STORAGE_KEY) || "";
export const setAdminSecret = (secret) => sessionStorage.setItem(STORAGE_KEY, secret);
export const clearAdminSecret = () => sessionStorage.removeItem(STORAGE_KEY);
export const isAdminLoggedIn = () => !!getAdminSecret();
