import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', 'uploads')); // 폴더를 만드는 명령어 -> 현재폴더에 부모폴더로가서 'uploads'라는 폴더를 만들라는 의미
  } catch (error) {
    console.log('The folder already exists...');
  }
  try {
    console.log(`Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    destination(req, file, cb) {
      // * 어디에 저장할 지
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      cb(null, folderName);
    },
    filename(req, file, cb) {
      // * 어떤 이름으로 올릴 지
      const ext = path.extname(file.originalname); //extname메서드는 파일을 올렸을때 파일을 읽어서 거기서 확장자를 추출한다. ex) .png .jpg

      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};
