import React from 'react'
import withAuth from  'hoc/withAuth'
import { Editor } from 'slate-simple-editor'
import { useCreateBlog } from 'actions/blogs'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const BlogEditor = ({user, loading}) => {
    const router  = useRouter();
    const [createBlog, { data: createdBlog, error, loading: blogLoading }]: any= useCreateBlog();

    const saveBlog = async data => {
        const createdBlog = await createBlog(data);
        router.push('/blogs/editor/[id]', `/blogs/editor/${createdBlog._id}`)
    }

    if(error) toast.error(error.message)
    
    return (
        <>
            <Editor 
                header="Blog Editor"
                onSave={saveBlog}
                loading={blogLoading} 
            />
        </>
    )
}

export default withAuth(BlogEditor)('admin')
