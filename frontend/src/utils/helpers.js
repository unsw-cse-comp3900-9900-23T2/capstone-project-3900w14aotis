import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export const fileToDataUrl = (file) => {
  const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const valid = validFileTypes.find((type) => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error("provided file is not a png, jpg or jpeg image.");
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
};

export const objectToString = (object) => {
  return JSON.stringify(object);
};

export const stringToObject = (string) => {
  return JSON.parse(string);
};

export const displayError = (message) => {
  toast.error(message, {
    autoClose: 3000,
    position: toast.POSITION.TOP_CENTER,
  });
};

export const displaySuccess = (message) => {
  toast.success(message, {
    autoClose: 2000,
    position: toast.POSITION.TOP_CENTER,
  });
};

export const sortTasksAscending = (tasksList) => {
  return tasksList.sort((a, b) => (a.Title > b.Title ? 1 : -1));
};

export const sortTasksDescending = (tasksList) => {
  console.log(tasksList);
  return tasksList.sort((a, b) => b.Title.localeCompare(a.Title));
};

export const sortTasksSoonest = (tasksList) => {
  return tasksList.sort((a, b) => new Date(a.Deadline) - new Date(b.Deadline));
};

export const sortTasksLatest = (tasksList) => {
  return tasksList.sort((a, b) => new Date(b.Deadline) - new Date(a.Deadline));
};

export const sortTasksCreationRecent = (tasksList) => {
  return tasksList.sort(
    (a, b) => new Date(b.CreationTime) - new Date(a.CreationTime)
  );
};

export const sortTasksImportant = (tasksList) => {
  const priorityMapping = {
    Low: 0,
    Medium: 1,
    High: 2,
    Severe: 3,
  };
  return tasksList.sort(
    (a, b) => priorityMapping[b.Priority] - priorityMapping[a.Priority]
  );
};

export const sortTasksLeastImportant = (tasksList) => {
  const priorityMapping = {
    Low: 0,
    Medium: 1,
    High: 2,
    Severe: 3,
  };
  return tasksList.sort(
    (a, b) => priorityMapping[a.Priority] - priorityMapping[b.Priority]
  );
};

export const emptyDeadlinesSort = (tasksList) => {
  const sortedTasks = tasksList.sort((a, b) => {
    if (Date.parse(a.Deadline) === 0) {
      return 1;
    } else if (Date.parse(b.Deadline) === 0) {
      return -1;
    } else {
      return new Date(a.Deadline) - new Date(b.Deadline);
    }
  });
  return sortedTasks;
};

export const sortAchievementsByPercentage = (acheivementsList) => {
  const sortedTasks = acheivementsList.sort((a, b) => {
    if (a.currentValue === 0 || a.currentValue === a.target) {
      return 1;
    } else if (b.currentValue === 0 || b.currentValue === b.target) {
      return -1;
    } else {
      return b.currentValue / b.target - a.currentValue / a.target;
    }
  });
  return sortedTasks;
};

export const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      border: "5px solid white",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

export const paginateTasks = (taskList) => {
  const paginatedTasks = [];
  const chunkSize = 5;
  for (let i = 0; i < taskList.length; i += chunkSize) {
    const chunk = taskList.slice(i, i + chunkSize);
    paginatedTasks.push(chunk);
  }
  return paginatedTasks;
};
