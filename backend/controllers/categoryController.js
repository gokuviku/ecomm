import asyncHandler from '../middlewares/asyncHandler.js';
import Category from '../models/categoryModel.js';
const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).json({error: "Name is required"})
        }

        const existingCategory = await Category.findOne({name});
        if (existingCategory) {
            return res.status(400).json({error: "Category already exists"})
        }

        const category = new Category({name})
        await category.save()   

        return res.status(200).json(category)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
try {
    const {name} = req.body;
    const {categoryId}= req.params

    const category = await Category.findOne({_id:categoryId})

    if(!category){
        return res.json(404).json({error: "category not found"})
    }

    category.name = name
    const UpdatedCategory = await category.save()
    res.json(UpdatedCategory)

} catch (error) {
    console.log(error);
    res.status(500).json({error:"server error"})
}
})
// const updateCategory = asyncHandler(async (req, res) => {
//     try {
//         const { name } = req.body;
//         const { categoryId } = req.params;

//         const category = await Category.findOne({ _id: categoryId });

//         if (!category) {
//             return res.status(404).json({ error: "Category not found" });
//         }

//         category.name = name;
//         const updatedCategory = await category.save();
//         res.json(updatedCategory);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Server error" });
//     }
// });


const deleteCategory = asyncHandler(async (req, res) =>{

    try {
        const removed = await Category.findByIdAndDeletel(req.params.categoryId)
        res.json(removed)
        
    } catch (error) {
        console.log('error',error);
        res.status(500).json({ error: "server error" })

        
    }
})

const listCategory = asyncHandler(async (req, res) => {

    try {
        const all = await Category.find({})
        res.json(all)

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: "server error" })


    }
})

const readCategory = asyncHandler(async (req, res) => {

    try {
        const category = await Category.findOne({_id:req.params.id})
        res.json(category)

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: "server error" })


    }
})

export { createCategory, deleteCategory, listCategory, readCategory, updateCategory };

