import { Request, Response } from 'express';
import prisma from '../prisma';
import { MediaType } from '../../generated/prisma';

interface contains {
    contains: string,
    mode: "insensitive"
}

interface filters {
    type?: MediaType,
    OR?: [{ title: contains }, { director: contains }]
}

// list
export const getAllMedia = async (req: Request, res: Response) => {
    try {
        const { search, type } = req.query;

        const filters: filters = {};

        if (type) {
            filters.type = type as MediaType
        }

        if (search) {
            filters.OR = [
                {
                    title: {
                        contains: String(search),
                        mode: "insensitive",
                    },
                },
                {
                    director: {
                        contains: String(search),
                        mode: "insensitive",
                    },
                },
            ];
        }
        const fullUrl = `${req.protocol}://${req.get('host')}`;

        const media = await prisma.media.findMany({
            where: filters,
            orderBy: { createdAt: "desc" },
        });

        const result = media.map(({ createdAt, updatedAt, ...media }) => ({
            ...media,
            imageUrl: media.imageUrl ? `${fullUrl + media.imageUrl}` : null
        }));
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to create media", details: error });
    }
};


// Create
export const createMedia = async (req: Request, res: Response) => {
    try {
        const {
            title,
            type,
            director,
            budget,
            location,
            duration,
            year,
        } = req.body;

        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const media = await prisma.media.create({
            data: {
                title,
                type,
                director,
                budget,
                location,
                duration,
                yearRange: year,
                imageUrl: image,
            },
        });
        console.log(media)
        res.status(201).json(media);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create media" });
    }
};

// Update
export const updateMedia = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const {
            title,
            type,
            director,
            budget,
            location,
            duration,
            year,
        } = req.body;

        const image = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedMedia = await prisma.media.update({
            where: { id: Number(id) },
            data: {
                ...(title && { title }),
                ...(type && { type }),
                ...(director && { director }),
                ...(budget && { budget }),
                ...(location && { location }),
                ...(duration && { duration }),
                ...(year && { yearRange: year }),
                ...(image && { imageUrl: image }), // only update if new image provided
            },
        });

        res.status(200).json(updatedMedia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update media", details: error });
    }
};


// Delete
export const deleteMedia = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.media.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete media", details: error });
    }
};