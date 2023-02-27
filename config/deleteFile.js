import path from 'path';
import fs from 'fs/promises';

const deleteFile = async (fileName) => {
    const rootPath = process.cwd();
    const filePath = path.join(rootPath, 'public', 'img', fileName);
    try {
        await fs.unlink(filePath);
    } catch (err) {
        console.error(`Failed to delete image '${fileName}'`, err);
        throw err;
    }
};

export default deleteFile