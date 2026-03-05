const Category = require("../models/Category")
const slugify = require("slugify")   // install this
const fs = require("fs")
// ===============================
// CREATE CATEGORY
// ===============================
const createCategory = async (req, res) => {
    try {

        // 1️⃣ Extract data from req.body
        const { name, description } = req.body
        // 2️⃣ Validate required fields
        if (!name || !description) {
            return res.status(400).json({ message: "all fields are requird!" })
        }
        // 3️⃣ Check if category already exists
        const existingCategory = await Category.findOne({ name })

        if (existingCategory) {
            return res.status(400).json({ message: "category already exists!" })
        }
        // 4️⃣ Generate slug from name
        const slugName = slugify(name, { lower: true })
        // 5️⃣ Get image path from req.file
        if (!fileName) {
            return res.status(400).json({ message: "File required!" })
        }
        const fileName = req.file.path;


        // 6️⃣ Create category in DB
        const categories = await Category.create({
            name,
            description,
            image: fileName,
            slug: slugName

        })

        return res.status(201).json({
            message: "Category created!",
            id: categories._id,
            name: categories.name,
            description: categories.description,
            image: categories.image,
            slug: categories.slug
        })

        // 7️⃣ Return success response

    } catch (error) {
        console.error("Create Category Error:", error.message)
        return res.status(500).json({ message: "Server error" })
    }
}


// ===============================
// GET ALL CATEGORIES
// ===============================
const getCategories = async (req, res) => {
    try {

        // 1️⃣ Fetch all categories
        // 2️⃣ Return response

        const category = await Category.find().sort({ createAt: "-1" });
        return res.status(200).json({
            message: "Categories data!",
            count: category.length,
            category
        })
    } catch (error) {
        console.error("Get Categories Error:", error.message)
        return res.status(500).json({ message: "Server error" })
    }
}


// ===============================
// GET SINGLE CATEGORY
// ===============================
const getCategoryBySlug = async (req, res) => {
    try {

        // 1️⃣ Get slug from params
        const category = await Category.findOne({
            slug: req.params.slug
        })

        if (!category) {
            return res.status(404).json({ message: "Category not found!" })
        }

        return res.status(200).json({ message: "Category found!", category })


        // 2️⃣ Find category by slug
        // 3️⃣ If not found return 404
        // 4️⃣ Return category

    } catch (error) {
        console.error("Get Category Error:", error.message)
        return res.status(500).json({ message: "Server error" })
    }
}


// ===============================
// UPDATE CATEGORY (Admin Only)
// ===============================
const updateCategory = async (req, res) => {
   try {
      const slugName = req.params.slug;

      const category = await Category.findOne({ slug: slugName });

      if (!category) {
         return res.status(404).json({ message: "Category not found" });
      }

      const { name, description } = req.body;

      // Update name + slug
      if (name) {
         category.name = name;
         category.slug = slugify(name, { lower: true });
      }

      // Update description
      if (description) {
         category.description = description;
      }

      // Update image
      if (req.file) {
         // delete old image
         if (category.image) {
            try {
               await fs.unlink(category.image);
            } catch (err) {
               console.log("Old image not found");
            }
         }

         category.image = req.file.path;
      }

      await category.save();

      return res.status(200).json({
         message: "Category updated successfully",
         category
      });

   } catch (error) {
      return res.status(500).json({ message: "Server error" });
   }
};


// ===============================
// DELETE CATEGORY (Admin Only)
// ===============================
const deleteCategory = async (req, res) => {
    try {

        // 1️⃣ Get slug
        const slugName = req.params.slug;

        // 2️⃣ Find and delete
        const category = await Category.findOne({
            slug: slugName
        })
        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }
        if (category.image) {
            try {
                await fs.unlink(category.image)
            } catch (err) {
                console.log("File not found, skipping delete")
            }
        }

        await category.deleteOne()

        return res.status(200).json({ message: "Catgeory Deleted successfully!" })

        // 3️⃣ Return success message

    } catch (error) {
        console.error("Delete Category Error:", error.message)
        return res.status(500).json({ message: "Server error" })
    }
}


module.exports = {
    createCategory,
    getCategories,
    getCategoryBySlug,
    updateCategory,
    deleteCategory
}