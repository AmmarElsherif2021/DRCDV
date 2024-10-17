// import mongoose from 'mongoose'
// import { describe, expect, test } from '@jest/globals'

// //import service fns
// import {
//   createPost,
//   listAllPosts,
//   listPostsByAuthor,
//   listPostsByTag,
//   getPostById,
//   updatePost,
//   deletePost,
// } from '../services/posts.js'
// import { Post } from '../db/models/post.js'

// // Describe test suite for creating posts
// describe('creating posts', () => {
//   // Test case: Creating a post with all parameters should succeed
//   test('with all parameters should succeed', async () => {
//     // Define a sample post object
//     const post = {
//       title: 'Hello Mongoose!',
//       author: 'Daniel Bugl',
//       contents: 'This post is stored in a MongoDB database using Mongoose.',
//       tags: ['mongoose', 'mongodb'],
//     }

//     // Call the createPost function to create a post
//     const createdPost = await createPost(post)
//     expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId) // Check if _id is a valid ObjectId

//     // Retrieve the post from the database
//     const foundPost = await Post.findById(createdPost._id)

//     // Additional checks:
//     expect(foundPost).toEqual(expect.objectContaining(post)) // Ensure properties match
//     expect(foundPost.createdAt).toBeInstanceOf(Date) // Verify createdAt is a Date
//     expect(foundPost.updatedAt).toBeInstanceOf(Date) // Verify updatedAt is a Date
//   })

//   // Test case: Creating a post without a title should fail
//   test('without title should fail', async () => {
//     const post = {
//       author: 'Daniel Bugl',
//       contents: 'Post with no title',
//       tags: ['empty'],
//     }
//     try {
//       await createPost(post)
//     } catch (err) {
//       expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
//       expect(err.message).toContain('`title` is required')
//     }
//   })

//   // Test case: Creating a post with minimal parameters should succeed
//   test('with minimal parameters should succeed', async () => {
//     const post = {
//       title: 'Only a title',
//     }
//     const createdPost = await createPost(post)
//     expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
//   })
// })

// // Define an array of sample posts
// const samplePosts = [
//   { title: 'Learning Redux', author: 'Daniel Bugl', tags: ['redux'] },
//   { title: 'Learn React Hooks', author: 'Daniel Bugl', tags: ['react'] },
//   {
//     title: 'Full-Stack React Projects',
//     author: 'Daniel Bugl',
//     tags: ['react', 'nodejs'],
//   },
//   { title: 'Guide to TypeScript' },
// ]

// // Initialize an empty array to store created sample posts
// let createdSamplePosts = []

// // Before each test, delete existing posts and create new sample posts
// beforeEach(async () => {
//   await Post.deleteMany({}) // Delete all existing posts
//   createdSamplePosts = [] // Clear the array
//   for (const post of samplePosts) {
//     const createdPost = new Post(post) // Create a new post
//     createdSamplePosts.push(await createdPost.save()) // Save the post
//   }
// })

// // Describe test suite for listing posts
// describe('listing posts', () => {
//   // Test case: Listing all posts should return the correct number of posts
//   test('should return all posts', async () => {
//     const posts = await listAllPosts()
//     expect(posts.length).toEqual(createdSamplePosts.length)
//   })

//   // Test case: Listing posts should return them sorted by creation date (descending) by default
//   test('should return posts sorted by creation date descending by default', async () => {
//     const posts = await listAllPosts()
//     const sortedSamplePosts = createdSamplePosts.sort(
//       (a, b) => b.createdAt - a.createdAt,
//     )
//     expect(posts.map((post) => post.createdAt)).toEqual(
//       sortedSamplePosts.map((post) => post.createdAt),
//     )
//   })

//   // Test case: Listing posts should take into account provided sorting options
//   test('should take into account provided sorting options', async () => {
//     const posts = await listAllPosts({
//       sortBy: 'updatedAt',
//       sortOrder: 'ascending',
//     })
//     const sortedSamplePosts = createdSamplePosts.sort(
//       (a, b) => a.updatedAt - b.updatedAt,
//     )
//     expect(posts.map((post) => post.updatedAt)).toEqual(
//       sortedSamplePosts.map((post) => post.updatedAt),
//     )
//   })

//   // Test case: Filtering posts by author should return the correct number of posts
//   test('should be able to filter posts by author', async () => {
//     const posts = await listPostsByAuthor('Daniel Bugl')
//     expect(posts.length).toBe(3)
//   })

//   // Test case: Filtering posts by tag should return the correct number of posts
//   test('should be able to filter posts by tag', async () => {
//     const posts = await listPostsByTag('nodejs')
//     expect(posts.length).toBe(1)
//   })
// })
// // Describe test suite for listing posts
// describe('find and update a post', () => {
//   //test case find post by Id
//   test('should return the full post', async () => {
//     const post = await getPostById(createdSamplePosts[0]._id)
//     expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
//   })
//   //test case if searching by invalid Id
//   test('should fail if the id does not exist', async () => {
//     const post = await getPostById('000000000000000000000000')
//     expect(post).toEqual(null)
//   })
// })
// //test case update post
// describe('update posts', () => {
//   test('should update the specified property', async () => {
//     await updatePost(createdSamplePosts[0]._id, {
//       author: 'Test Author',
//     })
//     const updatedPost = await Post.findById(createdSamplePosts[0]._id)
//     expect(updatedPost.author).toEqual('Test Author')
//   })
//   test('should not update other properties', async () => {
//     await updatePost(createdSamplePosts[0]._id, {
//       author: 'Test Author',
//     })
//     const updatedPost = await Post.findById(createdSamplePosts[0]._id)
//     expect(updatedPost.title).toEqual('Learning Redux')
//   })
//   test('should update the updatedAt timestamp', async () => {
//     await updatePost(createdSamplePosts[0]._id, {
//       author: 'Test Author',
//     })
//     const updatedPost = await Post.findById(createdSamplePosts[0]._id)
//     expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
//       createdSamplePosts[0].updatedAt.getTime(),
//     )
//   })

//   test('should fail if the id does not exist', async () => {
//     const post = await updatePost('000000000000000000000000', {
//       author: 'Test Author',
//     })
//     expect(post).toEqual(null)
//   })
// })

// describe('deleting posts', () => {
//   test('should remove the post from the database', async () => {
//     const result = await deletePost(createdSamplePosts[0]._id)
//     expect(result.deletedCount).toEqual(1)
//     const deletedPost = await Post.findById(createdSamplePosts[0]._id)
//     expect(deletedPost).toEqual(null)
//   })
//   test('should fail if the id does not exist', async () => {
//     const result = await deletePost('000000000000000000000000')
//     expect(result.deletedCount).toEqual(0)
//   })
// })
