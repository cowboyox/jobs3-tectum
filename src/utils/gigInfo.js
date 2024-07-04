export const getDeadline = (gigDeadline) => {
  let deadline = '';

  switch (gigDeadline) {
    case 0:
      deadline = 'less than 1 month';
      break;
    case 1:
      deadline = '1-3 months';
      break;
    case 2:
      deadline = '3-6 months';
      break;
    default:
      deadline = 'more than 6 months';
      break;
  }

  return deadline;
};

export const getPaymentType = (gigPaymentType) => {
  let paymentType = '';

  switch (gigPaymentType) {
    case 0:
      paymentType = 'fixed based project';
      break;
    case 1:
      paymentType = 'hourly based project';
      break;
    default:
      paymentType = 'fixed based project';
      break;
  }

  return paymentType;
};

export const getLocationType = (gigLocationType) => {
  let locationType = '';

  switch (gigLocationType) {
    case 0:
      locationType = 'Remote';
      break;
    case 1:
      locationType = 'On-site';
      break;
    case 2:
      locationType = 'Hybrid';
      break;
    default:
      locationType = 'Full-Time';
      break;
  }
  return locationType;
};

export const getProjectType = (type) => {
  let projectType = '';

  switch (type) {
    case 0:
      projectType = 'One-time';
      break;
    case 1:
      projectType = 'On-going';
      break;
    default:
      projectType = 'Complex';
      break;
  }

  return projectType;
};

export const getExperienceLevel = (level) => {
  let experienceLevel = '';

  switch (level) {
    case 0:
      experienceLevel = 'Entry';
      break;
    case 1:
      experienceLevel = 'Intermediate';
      break;
    case 2:
      experienceLevel = 'Expert';
      break;
    default:
      experienceLevel = 'Not sure';
      break;
  }

  return experienceLevel;
};

export const getStatus = (gigStatus) => {
  let status = '';

  switch (gigStatus) {
    case 0:
      status = 'Alive';
      break;
    case 1:
      status = 'Hired';
      break;
    default:
      status = 'Ended';
      break;
  }

  return status;
};
