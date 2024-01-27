import {
    AutoInput,
    FileUpload,
    FormArrayInput,
    FormInput,
    SelectInput,
    TextEditor, SubmitBtn,
} from "../../../components";
import { useAddPost } from "../hooks/usePostsCustomHook";

const CATEGORIES = [
    'academic & education',
    'biography',
    'children & youth',
    'fiction & literature',
    'lifestyle',
    'travel & adventures',
    'politics & laws',
    'science & research',
    'art',
    'others',
    'business & career',
    'nature & environment',
    'health & fitness',
    'personal growth',
    'religion',
    'technology',
    'history',
    'gaming',
    'community',
    'music',
    'books'
];



const NewPost = () => {

    const {
        onSubmit,
        isFormValid,
        postLoader,
        handleInputChange
    } = useAddPost()

    return (
        <main className="grid place-content-center mt-1.5 w-56 mx-auto md:w-auto">
            <div>
                <h5 className="text-md mt-10">Add post</h5>
            </div>
            <hr />
            <form className="mt-10" onSubmit={onSubmit} onChange={handleInputChange}>

                <FormInput
                    name="title"
                    label="title"
                    required
                />
                <br />
                <SelectInput
                    name="category"
                    label="category"
                    list={CATEGORIES}
                    defaultValue="others"
                    size="md"
                />
                <br />
                <FileUpload
                    label="Image"
                    name="image"
                    type="image"
                    multiple={false}
                    required
                />
                <br />
                <FormArrayInput
                    label="hashtags"
                    name="hashtags"
                />
                <br />
                <TextEditor
                    type="content"
                    name="content"
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
                    text="publish"
                    isSubmitting={postLoader}
                    disabled={!isFormValid}
                />
                <br />

            </form>
        </main>
    );
};

export default NewPost;

