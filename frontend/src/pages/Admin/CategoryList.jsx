import { useState } from "react";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
    useUpdateCategoryMutation
} from '../../redux/api/categoryApiSlice';
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
    const { data: categories } = useFetchCategoriesQuery();
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatingName, setUpdatingName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('Category name is required');
            return;
        }
        try {
            const result = await createCategory({ name }).unwrap();
            setName('');
            toast.success(`${result.name} is created`);
        } catch (error) {
            toast.error('Creating category failed');
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!updatingName) {
            toast.error('Category name is required');
            return;
        }
        try {
            const result = await updateCategory({
                categoryId: selectedCategory._id,
                updatedCategory: { name: updatingName }
            }).unwrap();

            toast.success(`${result.name} is updated.`);
            setSelectedCategory(null);
            setUpdatingName('');
            setModalVisible(false);

        } catch (error) {
            console.error('Updating category failed', error);
            toast.error('Updating category failed');
        }
    };

    const handleDeleteCategory = async () => {
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap();
            toast.success(`${result.name} is deleted.`);
            setSelectedCategory(null);
            setModalVisible(false);
        } catch (error) {
            toast.error('Deleting category failed');
        }
    };

    return (
        <div className="ml-[10rem] flex flex-col md:flex-row">
            <AdminMenu />

            <div className="md:3/4 p-3">Manage Category</div>
            <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
            <br />
            <hr />
            <div className="flex flex-wrap">
                {categories?.map((category) => (
                    <div key={category._id} className="w-1/4 p-3">
                        <button
                            className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                            onClick={() => {
                                setModalVisible(true);
                                setSelectedCategory(category);
                                setUpdatingName(category.name);
                            }}
                        >
                            {category.name}
                        </button>
                    </div>
                ))}
                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <CategoryForm
                        value={updatingName}
                        setValue={setUpdatingName}
                        handleSubmit={handleUpdateCategory}
                        buttonText="Update"
                        handleDelete={handleDeleteCategory}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default CategoryList;
