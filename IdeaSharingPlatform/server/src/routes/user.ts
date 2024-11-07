
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Router } from "express";
const router = Router();

import z from "zod";
import { authenticated } from "../middleware/authenticate";


const authInput = z.object({
  email: z.string().email({
    message: "Please Enter Valid Email",
  }),
  password: z.string().min(6, {
    message: "password should greater than 6",
  }),
  name: z.string().optional(),
});

const profileInput = z.object({
  bio: z.string().optional(),
});

router.post("/signup", async (req, res) => {
  await prisma.$connect();
  const payload = req.body;


  const { success } = authInput.safeParse(payload);

  if (!success) {
    return res.json({
      msg: "Invalid Input",
    });
  }
  try {
    const user_var = await prisma.user.create({
      data: {
        email: payload.email,
        password: payload.password,
        name:payload.name
      },
    });

    const token = jwt.sign(
      { userId: user_var.id },
      process.env.JWT_SECRET || ""
    );

    res.status(201).send(token);
  } catch (error) {
    return res.json({
      msg: "Error while creating User",
    });
  }
});

// signin

router.post("/signin", async (req, res) => {
  try {
    await prisma.$connect();
    const payload = req.body;
    const { success } = authInput.safeParse(payload);

    if (!success) {
      return res.json({
        msg: "Invalid Input",
      });
    }
    const user_var = await prisma.user.findFirst({
      where: {
        email: payload.email
      },
    });

    const token = jwt.sign(
      { userId: user_var?.id },
      process.env.JWT_SECRET || ""
    );

    res.status(201).send(token);
  } catch (error) {
    return res.json({
      msg: "Error while Signin",
    });
  }
});

// creating profile

router.post("/profile", authenticated, async (req, res) => {
  const payload = req.body;
  const { success } = profileInput.safeParse(payload);

  if (!success) {
    res.status(403).json({
      msg: "Invalid input",
    });
  }

  // creating profile
  try {
    const profileCreated = await prisma.profile.create({
      data: {
        bio: payload.bio,
        userId: req.authUser.userId,
      },
    });

    if (profileCreated) {
      res.status(201).json({
        msg: "Profile created Succesfully",
      });
    }
  } catch (error) {
    res.status(411).json({
      msg: "Error while creating profile",
    });
  }
});

router.get("/user-info", authenticated, async (req, res) => {
   

  // creating profile
  try {
    console.log('coming');
    
    const rsp = await prisma.user.findFirst({
      where: {
        id:req.authUser.userId,
      },
      select:{
        email:true,
        name:true
      }
    });

    res.json(rsp)
    console.log(rsp);
    
    

  } catch (error) {
    res.status(411).json({
      msg: "Error while fetching user info",
    });
  }
});

export default router;
