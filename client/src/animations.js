export const pageAnimation = {
    hidden: {
      opacity: 0,
      y: 300,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

export  const signupAnimation = {
    hidden: {
      opacity: 0,
      x: -900,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.75,
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

export  const loginAnimation = {
    hidden: {
      opacity: 0,
      y: -900,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
export  const blogAnimation = {
    hidden: {
      opacity: 0,
      y: -900,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };


export const fade = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.75,
            ease: "easeOut",
        },
    }
}

export const titleAnim = {
    hidden: { y: 200 },
    show: {
        y: 0,
        transition: { duration: 0.75, ease: "easeOut" },
    }
}

export const photoAnim = {
    hidden: {
        scale: 1.5,
        opacity: 0,
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.75,
            ease: "easeOut",
        }
    }
}