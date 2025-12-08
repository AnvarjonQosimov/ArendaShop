const {v4: uuidv4} = require('uuid')
const fs = require('fs')
const path  = require('path')

class FileService {
    save(file) {
        try {
            if (!file) return null;
            const ext = path.extname(file.name);
            const currentDir = __dirname
            const staticDir = path.join(currentDir, '..', 'static')

            if(!fs.existsSync(staticDir)) {
                fs.mkdirSync(staticDir, {recursive: true})
            }

            const fileName = uuidv4() + path.extname(file.name)
            const filePath = path.join(staticDir, fileName)

            file.mv(filePath)

            return fileName
        } catch (error) {
            throw new Error(`Error saving file: ${error}`) 
        }
    }
}

module.exports = new FileService