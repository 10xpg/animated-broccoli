const capitalize = (word) => {
  const lCased = word?.toLowerCase();
  const firstLetterUcase = lCased?.charAt(0)?.toUpperCase();

  return firstLetterUcase + lCased?.slice(1);
};

export const getUserFullname = (user) => {
  let fname = capitalize(user?.firstname);
  let lname = capitalize(user?.lastname);

  return `${fname} ${lname}`;
};

export const getUserInitials = (user) => {
  let fname = user?.firstname.toLowerCase().charAt(0).toUpperCase();
  let lname = user?.lastname.toLowerCase().charAt(0).toUpperCase();

  return `${fname}${lname}`;
};
