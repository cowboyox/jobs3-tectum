export const timeSincePublication = (timestamp) => {
	const currentTime = Math.floor(Date.now() / 1000);
	const timeElapsed = currentTime - timestamp;

	if (timeElapsed < 60) {
		return "Just now";
	}

	const intervals = [
		{ label: "year", seconds: 31536000 },
		{ label: "month", seconds: 2592000 },
		{ label: "day", seconds: 86400 },
		{ label: "hour", seconds: 3600 },
		{ label: "minute", seconds: 60 },
	];

	for (let i = 0; i < intervals.length; i++) {
		const { label, seconds } = intervals[i];
		const intervalCount = Math.floor(timeElapsed / seconds);

		if (intervalCount >= 1) {
			return `${intervalCount} ${label}${
				intervalCount !== 1 ? "s" : ""
			} ago`;
		}
	}

	return "Just now";
};

export const fixHTMLEntities = (str) => {
	const entityMap = {
		"&amp;": "&",
		"&lt;": "<",
		"&gt;": ">",
		"&#8211;": "-",
	};

	for (const entity in entityMap) {
		if (Object.prototype.hasOwnProperty.call(entityMap, entity)) {
			const regex = new RegExp(entity, "g");
			str = str.replace(regex, entityMap[entity]);
		}
	}

	return str;
};

export const isImageUrl200 = async (imageUrl) => {
	try {
		const response = await fetch(imageUrl, { method: "HEAD" });
		return response.status === 200;
	} catch (error) {
		console.error("Network error occurred:", error);
		return false;
	}
};

export const isImageUrl = (url) => {
	const imageExtensions = /\.(jpeg|jpg|gif|png|bmp)$/i;

	return imageExtensions.test(url);
};

export const manipulateIds = (str, idToAdd) => {
	let ids = str.split(",").map((id) => id.trim());

	const index = ids.indexOf(idToAdd.toString());
	if (index !== -1) {
		ids.splice(index, 1);
	} else if (str !== "") {
		ids.push(idToAdd.toString());
	} else {
		ids = [idToAdd.toString()];
	}

	return ids.join(",");
};

export const formatDate = (dateString) => {
  const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}