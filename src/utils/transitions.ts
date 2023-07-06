export const fadeInXVariant = {
  hidden: { opacity: 0, x: "-100px" },
  visible: (i: any) => {
    const delay = 0.1 + i * 0.2;
    return {
      opacity: 1,
      x: 0,
      transition: {
        delay,
        duration: 0.5,
      },
    };
  },
};
export const fadeInXReverseVariant = {
  hidden: { opacity: 0, x: "100px" },
  visible: (i: any) => {
    const delay = 0.1 + i * 0.2;
    return {
      opacity: 1,
      x: 0,
      transition: {
        delay,
        duration: 0.5,
      },
    };
  },
};

export const fadeInYVariant = {
  hidden: { opacity: 0, y: "100px" },
  visible: (i: any) => {
    const delay = 0.1 + i * 0.2;
    return {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
      },
    };
  },
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (i: any) => {
    const delay = 0.1 + i * 0.2;
    return {
      opacity: 1,
      transition: {
        delay,
        duration: 0.5,
      },
    };
  },
};
