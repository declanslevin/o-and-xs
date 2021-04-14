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
