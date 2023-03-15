export const triggerBrowserDownload = (url: string, exportName: string) => {
  const link = document.createElement('a');

  link.href = url;
  link.download = exportName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
