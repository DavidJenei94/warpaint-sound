export const downgradeImage = async (file: File): Promise<File | null> => {
  let newImageFile: File | null = null;

  const filePromise = new Promise<File | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var image = new Image();
      image.src = reader.result as string;
      image.onload = () => {
        const width = image.width;
        const height = image.height;

        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var canvasContext = canvas.getContext('2d');
        canvasContext!.drawImage(image, 0, 0, width, height);
        canvas.toBlob(
          (blob: Blob | null) => {
            if (blob) {
              const imgFile: File | null = new File([blob], 'newImage.jpg', {
                type: 'image/jpeg',
              });

              resolve(imgFile);
            }
          },
          'image/jpeg',
          0.75
        );
      };
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });

  // Wait for all promises to be resolved
  newImageFile = await Promise.resolve(filePromise);

  return newImageFile;
};
