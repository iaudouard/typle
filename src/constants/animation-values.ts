export const initial = { opacity: 0 };
export const animate = { opacity: 1 };
export const transition = { duration: 0.25 };
export const exit = { opacity: 0 };

export const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
};
