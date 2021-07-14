const validateEmail = (email: string): boolean => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
const validateSearchInput = (name: string): boolean => name?.length >= 3;

export { validateEmail, validateSearchInput };
