const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const mongoose = require('mongoose');

//<--------------------This API used for Create Blogs-------------->//
exports.createBlog = async (req, res) => {

    try {
        const Blog = req.body

        if (Object.keys(Blog).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide Blogs details" });
        }

        const { title, description, authorId, picture, userName, categories } = Blog;

        if (!title) return res.status(400).send({ msg: " title is required " });
        if (!description) return res.status(400).send({ msg: "description is required " });
        if (!authorId) return res.status(400).send({ msg: " authorId is required " });
        if (!picture) return res.status(400).send({ msg: " picture is required " });
        if (!userName) return res.status(400).send({ msg: " userName is required " });
        if (!categories) return res.status(400).send({ msg: " category is require" });


        let blogCreated = await blogModel.create(Blog)

        return res.status(201).send({ status: true, data: blogCreated })
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

//<----------------This API used for Fetch All Blogs of Logged in Author---------------->//
exports.getAllBlogsData = async (req, res) => {

    try {
        const filter = req.params;
        
        if (filter.category == 'AllBlogs') {
            const AllData = await blogModel.find().sort({_id:-1});
            return res.status(200).send({ msg: AllData })
        }
        else {
            const getData = await blogModel.find({ categories: filter.category }).sort({_id:-1});
            if (!getData) return res.status(404).send({ msg: " Not blogs Presents" });
            return res.status(200).send({ msg: getData })
        }
    }
    catch (error) { return res.status(500).send({ msg: error.message }) }
}



//<----------------This API used for Fetch Blogs of Logged in Author----------->//
exports.getBlogsData = async (req, res) => {
    try {
        let id = req.params.authorId;

        if (!id) return res.status(400).send({ status: false, msg: "id is required" })

        let isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) return res.status(400).send({ msg: "enter valid objectID" })

        let data = await blogModel.find({ _id: id })
        
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid blog  details" });
        }
        return res.status(200).send({ msg: data })

    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

//<----------------This API used for Update Blogs of Logged in Author---------->//
exports.updateBlog = async function (req, res) {
    try {
        let inputId = req.params.blogId

        if (!inputId) return res.status(400).send({ status: false, msg: "blog id required" })
        let isValid = mongoose.Types.ObjectId.isValid(inputId)
        if (!isValid) return res.status(400).send({ msg: "enter valid objectID" })

        let author = req.body
        let title = req.body.title
        let body = req.body.body
        let tags = req.body.tags
        let subcategory = req.body.subcategory

        if (Object.keys(author).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid Author  details" });
        }

        let date = Date.now()


        let data = await blogModel.findOne({ _id: inputId })

        if (!(data.authorId == req.body.authorId)) {
            return res.status(400).send({ msg: "you are not real user" })

        }

        let alert = await blogModel.findOne({ _id: inputId, isDeleted: true })
        if (alert) return res.status(400).send({ msg: "Blog already deleted" })

        let blogs = await blogModel.findOneAndUpdate({ _id: inputId },
            {
                $set: { title: title, body: body, isPublished: true, publishedAt: date },
                $push: { tags: tags, subcategory: subcategory }
            },
            { new: true })


        if (!blogs) return res.status(404).send({ msg: "no blog found" })
        return res.status(200).send({ msg: blogs })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

//<----------------These APIs used for Deleting Blogs--------->//
exports.deleteBlog = async function (req, res) {
    try {

        let inputId = req.params.blogId

        let isValid = mongoose.Types.ObjectId.isValid(inputId)
        if (!isValid) return res.status(400).send({ msg: "enter valid objectID" })

        let date = Date.now()

        let data1 = await blogModel.findOne({ _id: inputId })

        if (!(data1.authorId == req.body.authorId)) {
            return res.status(400).send({ msg: "you are not real user" })

        }

        let alert = await blogModel.findOne({ _id: inputId, isDeleted: true })
        if (alert) return res.status(400).send({ msg: "Blog already deleted" })

        let data = await blogModel.findOneAndUpdate({ _id: inputId },
            { $set: { isDeleted: true, deletedAt: date } },
            { new: true })

        if (!data) return res.status(404).send({ msg: "no data found" })

        return res.status(200).send({ status: true, msg: data })

    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

//<----------------These APIs used for Deleting Blogs by query of Logged in Author--------->//
exports.deleteBlogQuery = async (req, res) => {
    try {

        const queryParams = req.query;  //category, authorid, tag name, subcategory name
        if (Object.keys(queryParams).length == 0)
            return res.status(400).send({ status: false, msg: "Please enter some data in the body" });



        const blog = await blogModel.find({ $and: [queryParams, { isDeleted: true }, { isPublished: false }] });


        if (Object.keys(blog).length !== 0)
            return res.status(404).send({ msg: "Document is already Deleted " })

        const updatedBlog = await blogModel.updateMany(queryParams,
            { $set: { isDeleted: true, isPublished: false, deletedAt: Date.now() } },
            { new: true });
        return res.status(200).send({ status: true, data: updatedBlog })
    }
    catch (err) {
        return res.status(500).send({ error: err.message })
    }
}










