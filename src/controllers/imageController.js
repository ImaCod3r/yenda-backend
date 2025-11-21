import Image from "../models/Image.js";
import fs from "fs";
import sharp from "sharp";

async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado." });
        }
        const filePath = req.file.path;
        const fileName = req.file.originalname;

        // Compress and resize image
        const compressedBuffer = await sharp(filePath)
            .resize(800)
            .jpeg({ quality: 80 }) 
            .toBuffer();

        const base64Data = compressedBuffer.toString("base64");

        const image = await Image.create({
            name: fileName,
            data: base64Data
        });

        fs.unlinkSync(filePath);

        res.json({ message: "Upload concluido!", data: image });
    } catch (error) {
        console.error("Error in uploadImage:", error);
        // Ensure file is deleted even if error occurs
        if (req.file && req.file.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: "Erro ao fazer upload da imagem." });
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