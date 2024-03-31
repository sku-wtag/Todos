const reg = /[&<>"'/`]/gi;

export const getUniqueId = () => Date.now();
export const sanitizeInput = (value) => {
  return value.replace(reg, "").trim();
};
