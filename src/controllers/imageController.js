import Image from "../models/Image.js";
import fs from "fs";

async function uploadImage(req, res) {
    try {
        const filePath = req.file.path;
        const fileName = req.file.originalname;

        const base64Data = fs.readFileSync(filePath, { encoding: "base64" });

        const image = await Image.create({
            name: fileName,
            data: base64Data
        });

        fs.unlinkSync(filePath);

        res.json({ message: "Upload concluido!", data: image });
    } catch (error) {
        console.error(error);
        await Image.sync();
    }
}

async function getImage(req, res) {
    try {
        const image = await Image.findByPk(req.params.id);
        if (!image) {
            return res.status(404).json({ error: "Imagem não encontrada." });
        }

        const imgBuffer = Buffer.from(image.data, "base64");

        res.writeHead(200, {
            "Content-Type": "image/jpeg",
            "Content-Length": imgBuffer.length,
        });
        res.end(imgBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar imagem." });
    }
}

export { uploadImage, getImage };