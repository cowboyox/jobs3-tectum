export const timeSincePublication = (timestamp) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeElapsed = currentTime - timestamp;

  if (timeElapsed < 60) {
    return 'Just now';
  }

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const { label, seconds } = intervals[i];
    const intervalCount = Math.floor(timeElapsed / seconds);

    if (intervalCount >= 1) {
      return `${intervalCount} ${label}${intervalCount !== 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
};

export const fixHTMLEntities = (str) => {
  const entityMap = {
    '&#8211;': '-',
    '&amp;': '&',
    '&gt;': '>',
    '&lt;': '<',
  };

  for (const entity in entityMap) {
    if (Object.prototype.hasOwnProperty.call(entityMap, entity)) {
      const regex = new RegExp(entity, 'g');
      str = str.replace(regex, entityMap[entity]);
    }
  }

  return str;
};

export const isImageUrl200 = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.status === 200;
  } catch (error) {
    console.error('Network error occurred:', error);
    return false;
  }
};

export const isImageUrl = (url) => {
  const imageExtensions = /\.(jpeg|jpg|gif|png|bmp)$/i;

  return imageExtensions.test(url);
};

export const manipulateIds = (str, idToAdd) => {
  let ids = str.split(',').map((id) => id.trim());

  const index = ids.indexOf(idToAdd.toString());
  if (index !== -1) {
    ids.splice(index, 1);
  } else if (str !== '') {
    ids.push(idToAdd.toString());
  } else {
    ids = [idToAdd.toString()];
  }

  return ids.join(',');
};

export const formatDate = (dateString) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
export const getReadTime = (content) => {
  const contentText = JSON.stringify(content);
  const charCount = contentText?.length;
  const wordsCount = Math.ceil(charCount / 5);
  const readTime = Math.ceil(wordsCount / 200);
  return readTime;
};

export const isEnglish = (text) => {
  var englishRegex = /^[a-zA-Z\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/;

  return englishRegex.test(text);
};

export const formatMilestoneDate = (dateString) => {
  const { date } = JSON.parse(dateString);

  const parsedDate = new Date(date);

  const day = parsedDate.getDate();
  const month = parsedDate.toLocaleString('default', { month: 'long' });
  const year = parsedDate.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatMilestoneTime = (timeString) => {
  const { hour, minute } = JSON.parse(timeString);

  const tHour = hour < 10 ? `0${hour}` : hour.toString();
  const tMin = minute < 10 ? `0${minute}` : minute.toString();
  const period = hour > 12 ? 'PM' : 'AM';

  return `${tHour} : ${tMin} ${period}`;
};

export const isEven = (number) => {
  return number % 2 === 0;
};

export const minutesDifference = (timeString) => {
  const now = new Date();
  const diffInMs = now - new Date(timeString);
  let diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  let years = 0,
    months = 0,
    days = 0,
    hours = 0,
    mins = 0;

  if (diffInDays >= 365) {
    years = Math.floor(diffInDays / 365);
    diffInDays -= years * 365;
  }
  if (diffInDays >= 30) {
    // Approximation for months
    months = Math.floor(diffInDays / 30);
    diffInDays -= months * 30;
  }
  days = diffInDays;
  hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
  mins = Math.floor((diffInMs / (1000 * 60)) % 60);

  let result = '';
  if (years > 0) result += `${years}Y${years > 1 ? 's' : ''} `;
  if (months > 0) result += `${months}M${months > 1 ? 's' : ''} `;
  if (days > 0) result += `${days}D${days > 1 ? 's' : ''} `;
  if (hours > 0) result += `${hours}Hr${hours > 1 ? 's' : ''} `;
  if (mins > 0) result += `${mins}Min${mins > 1 ? 's' : ''} ago`;
  if (mins == 0) result += 'Just now';
  return result.trim();
};

export const timeDifference = (timeString) => {
  const now = new Date();
  const diffInMs = now - new Date(timeString);
  let diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  let years = 0,
    months = 0,
    days = 0,
    hours = 0,
    mins = 0;

  if (diffInDays >= 365) {
    years = Math.floor(diffInDays / 365);
    diffInDays -= years * 365;
  }
  if (diffInDays >= 30) {
    // Approximation for months
    months = Math.floor(diffInDays / 30);
    diffInDays -= months * 30;
  }
  days = diffInDays;
  hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
  mins = Math.floor((diffInMs / (1000 * 60)) % 60);

  let result = '';

  if (years > 0) result = `${years} Year${years > 1 ? 's' : ''} ago`;
  else if (months > 0) result = `${months} Month${months > 1 ? 's' : ''} ago`;
  else if (days > 0) result = `${days} Day${days > 1 ? 's' : ''} ago`;
  else if (hours > 0) result += `${hours} Hour${hours > 1 ? 's' : ''} ago`;
  else if (mins > 0) result += `${mins} Min${mins > 1 ? 's' : ''} ago`;
  else if (mins == 0) result += 'Just now';

  return result.trim();
};
