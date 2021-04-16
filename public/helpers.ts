export const getLogsElement = (): HTMLParagraphElement => {
  const logs = document.getElementById("logs");
  if (!logs) {
    throw new Error("Unable to return 'logs' element");
  }
  return logs as HTMLParagraphElement;
};

export const getElementById = (id: string): HTMLElement => {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Unable to return '${id}' element`);
  }
  return element;
};

export const getRadios = (
  radioClass: string
): HTMLCollectionOf<HTMLInputElement> => {
  const radioArray = document.getElementsByClassName(
    radioClass
  ) as HTMLCollectionOf<HTMLInputElement>;
  return radioArray;
};

export const disableRadioButtons = (): void => {
  const radioArray = getRadios("prompts-radio");
  for (let i = 0; i < radioArray.length; i++) {
    radioArray[i].disabled = true;
  }
};

export const enableRadioButtons = (): void => {
  const radioArray = getRadios("prompts-radio");
  for (let i = 0; i < radioArray.length; i++) {
    radioArray[i].disabled = false;
  }
};
