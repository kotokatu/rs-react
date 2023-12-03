import { ValidationError } from 'yup';

export const convertToBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = () => {
      reject('Error uploading file');
    };
  });
};

export type ErrorObject = {
  [field: string]: string[];
};
export const getYupErrorObject = (err: ValidationError): ErrorObject => {
  const object: ErrorObject = {};
  err.inner.forEach((error) => {
    if (error.path !== undefined) {
      if (object[error.path] !== undefined) {
        object[error.path].push(error.errors[0]);
      } else {
        object[error.path] = error.errors;
      }
    }
  });
  return object;
};
