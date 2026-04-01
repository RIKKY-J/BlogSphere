import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from '../../../lib/db';
import Post from '../../../models/Post';
import User from '../../../models/User';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content, category } = await req.json();

    if (!title || !content || !category) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    // Create a URL-friendly slug
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now();

    const newPost = await Post.create({
      title,
      slug,
      content,
      category,
      author: session.user.id
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Post creation error:", error);
    return NextResponse.json({ message: "An error occurred while creating the post" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'username');
    
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Post fetch error:", error);
    return NextResponse.json({ message: "An error occurred while fetching posts" }, { status: 500 });
  }
}
