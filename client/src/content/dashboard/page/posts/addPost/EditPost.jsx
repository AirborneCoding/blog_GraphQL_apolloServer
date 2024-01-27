import {
    AutoInput,
    FileUpload,
    FormArrayInput,
    FormInput,
    SelectInput,
    TextEditor, SubmitBtn, Loading
} from "@/helpers";

import useCategory from "@/hooks/categories/UseCategory";
import useEditPost from "../../../../hooks/dashboard/useEditPost";

const EditPost = () => {
    const { categories } = useCategory()
    const {
        singlePost,
        postError,
        postErrorData,
        postLoader,
        //
        onSubmit,
        id
    } = useEditPost()


    if (postLoader) {
        return <Loading />
    }

    // console.log(singlePost);

    return <main className="grid place-content-center mt-1.5 w-56 mx-auto md:w-auto">
        <div>
            <h5 className="text-md mt-10">Edit post</h5>
        </div>
        <hr />
        <form className="mt-10" onSubmit={onSubmit} >

            <FormInput
                name="title"
                label="title"
                defaultValue={singlePost?.title}
                required
            />
            <br />
            <AutoInput
                label="Category"
                name="category"
                type="text"
                list={categories}
                defaultValue={singlePost?.category?.name}
                required
            />
            <br />
            <FileUpload
                label="Image"
                name="image"
                type="image"
                multiple={false}
                defaultValue={singlePost?.image?.url}
                required
            />
            <br />
            <FormArrayInput
                label="hashtags"
                name="hashtags"
                defaultValue={singlePost?.hashtags}
            />
            <br />
            <TextEditor
                type="content"
                name="content"
                defaultValue={singlePost?.content}
                required
            />

            <SelectInput
                name="postStatus"
                label="post status (post gonna published by default)"
                list={["archived", "published"]}
                size="md"
                defaultValue="published"
                required
            />

            <SubmitBtn
                text="Edit"
                isSubmitting={postLoader}
                // disabled={!isFormValid} 
            />
            <br />

        </form>
    </main>
};

export default EditPost;
