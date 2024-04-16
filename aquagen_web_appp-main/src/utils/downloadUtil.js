import { assets } from 'src/assets/assets';
import { toPng } from 'html-to-image';

const Download = {};

Download.PNG = ({
    containerRef,
    backgroundColor = assets.colors.background,
    pixelRatio = 8,
    fileName = 'Aquagen',
}) => {
    return new Promise((resolve, reject) => {
        toPng(containerRef.current, {
            backgroundColor: backgroundColor,
            pixelRatio: pixelRatio,
        })
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = `${fileName}.png`;
                link.href = dataUrl;

                link.click();
                resolve('Image Downloaded Successfully');
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export { Download };
