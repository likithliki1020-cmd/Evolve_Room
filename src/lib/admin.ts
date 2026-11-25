export const ADMIN_EMAIL = "likithliki1020@gmail.com";

export const isAdmin = (email?: string | null) =>
  !!email && email.toLowerCase() === ADMIN_EMAIL;