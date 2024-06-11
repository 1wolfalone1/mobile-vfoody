import { Platform } from 'react-native';

export const dataUrlToFile = (url, fileName) => {
  const [mediaType, data] = url.split(',');

  const mime = mediaType.match(/:(.*?);/)?.[0];

  var n = data.length;

  const arr = new Uint8Array(n);

  while (n--) {
    arr[n] = data.charCodeAt(n);
  }

  return new File([arr], fileName, { type: mime });
};
export const dataAsyncUrlToFile = async (dataUrl, fileName) => {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const contentType = await res.headers.get('content-type');
    console.log(contentType, 'content-type');
    return new File([blob], fileName, { type: contentType });
  } catch (err) {
    console.log(err, ' error in dataAsyncUrlToFile');
    throw err;
  }
};
export const getFilename = (url) => {
  return url.substr(url.lastIndexOf('/') + 1);
};

export const getExtention = (mime) => {
  switch (mime) {
    case 'application/pdf':
      return '.pdf';
    case 'image/jpeg':
      return '.jpg';
    case 'image/jpg':
      return '.jpg';
    case 'image/png':
      return '.png';
    default:
      return '.jpg';
  }
};

export const mobileUrlToFile = async (uri, data, field) => {
  const os = Platform.OS;

  if (os == 'android') {
    const fileName = new Date().getTime() + getExtention(mime);
    let fileInfo = '';
    await RNFS.copyFile(uri, RNFS.CachesDirectoryPath + '/' + fileName).catch((e) => {
      fileInfo = undefined;
    });

    if (!fileInfo) {
      fileDetail = await RNFS.stat(RNFS.CachesDirectoryPath + '/' + fileName).catch((e) => {});
      data.append(field, {
        name: getFilename(fileDetail.path),
        type: payload.file.type,
        uri: 'file://' + fileDetail.path,
      });
    }
  } else {
    let localPath = uri;
    if (!localPath.includes('private')) {
      localPath = localPath.replace('/var', '/private/var');
    }
    data.append(field, {
      name: getFilename(localPath),
      type: mime,
      uri: localPath.replace('file://', ''),
    });
  }
};
export const objectToBlob = (object) => {
  try {
    const json = JSON.stringify(object);

    // Create a Blob from the JSON string
    const blob = new Blob([json], {
      type: 'application/json',
    });
    return blob;
  } catch (err) {
    console.log(err, ' error in objectToBlob');
    throw err;
  }
};

export const convertImageUrlToBase64 = async (imageUrl, a) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};
export const formatNumber = (q) => {
  if (q === undefined || q === null || q === '') {
    q = 0;
  }
  return q.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatNumberVND = (q) => {
  // Handle undefined, null, or empty values
  if (q === undefined || q === null || q === '') {
    q = 0;
  }

  // Format the number as Vietnamese dong (VND)
  return q.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};
export const formatQuantity = (q) => {
  if (q === undefined || q === null || q === '') {
    q = 0;
  }
  return q.toLocaleString('en-US');
};

export const fix2 = (number) => {
  try {
    return Math.round(number * 1e2) / 1e2;
  } catch (e) {
    console.error('not a number in fix2');
    return 0;
  }
};
