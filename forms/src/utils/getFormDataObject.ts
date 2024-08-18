import { toBase64 } from './getBase64';
import { Inputs } from './types';

export const getFormDataObject = async (
  formInputs: HTMLFormControlsCollection,
  inputs: Inputs[],
) => {
  const formDataObject: { [key in Inputs]?: string } = {};
  inputs.forEach((name) => {
    const input = formInputs.namedItem(name) as HTMLInputElement;
    formDataObject[name] = input.value;
  });

  const pictureInput = formInputs.namedItem(Inputs.picture) as HTMLInputElement;
  const pictureBase64 = await toBase64(pictureInput.files![0]);
  formDataObject.picture = pictureBase64;

  return formDataObject;
};
