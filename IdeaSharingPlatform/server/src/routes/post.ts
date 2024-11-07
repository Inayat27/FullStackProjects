import { Router,Request, Response } from "express";
import { authenticated } from "../middleware/authenticate";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const router = Router();
const prisma = new PrismaClient();
//zod validation

const postInput = z.object({
  title: z.string(),
  content: z.string().optional(),
  published: z.boolean(),
});
const updatepostInput = z.object({
  id: z.number(),
  title: z.string().optional(),
  content: z.string().optional(),
});

//post creation
router.post("/add-post", authenticated, async (req, res) => {
  const payload = req.body;
  const { success } = postInput.safeParse(payload);

  if (!success) {
    return res.status(411).json({
      msg: "Invalid input",
    });
  }

  try {
    const posted = await prisma.post.create({
      data: {
        title: payload.title,
        content: payload.content,
        published: true,
        authorId: req.authUser.userId,
      },
    });

    if (posted) {
      res.status(202).json({
        msg: "Post Added Successfully!",
      });
    }
  } catch (error) {
    res.status(411).json({
      msg: "Error while Creating Post",
    });
  }
});

// post update

router.put("/update-post/:id", authenticated, async (req, res) => {
  const payload = req.body;
  const postId = req.params.id;
  const { success } = updatepostInput.safeParse(payload);
  const updateData: {
    title?: string;
    content?: string;
  } = {};

  if (payload.title) {
    updateData.title = payload.title;
  }

  if (payload.content) {
    updateData.content = payload.content;
  }

  if (!success) {
    return res.status(411).json({
      msg: "Invalid input",
    });
  }

  try {
    const updated = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: updateData,
    });

    if (updated) {
      res.status(202).json({
        msg: "Post updated Successfully!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Error while updating post",
    });
  }
});

// post delete

router.delete("/delete-post/:id", authenticated, async (req, res) => {
  const postId = req.params.id;
  try {
    const deleted = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    if (deleted) {
      res.status(202).json({
        msg: "Post deleted Successfully!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Error while updating post",
    });
  }
});

// get single post

router.get("/get-post/:id", authenticated, async (req, res) => {
  const postId = req.params.id;
  try {
    const getpost = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (getpost) {
      res.status(202).json({
        msg: "Post fetched Successfully!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Error while fetching post",
    });
  }
});

// get all post



router.get("/posts", authenticated, async (req: Request, res: Response) => {
  try {
    
    const getPosts = await prisma.post.findMany({
      select:{
        title:true,
        content:true
      }
      
    })

    if (getPosts.length > 0) {
      res.status(200).json(getPosts);
    } else {
      res.status(404).json({ msg: "No posts found" });
    }
  } catch (error) {
    console.error("Error while fetching posts:", error);
    res.status(500).json({ msg: "Error while fetching posts" });
  }
});

export default router;
