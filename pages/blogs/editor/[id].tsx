import React from 'react'
import withAuth from  'hoc/withAuth'
import { Editor } from 'slate-simple-editor'
import { toast } from 'react-toastify'
import { useGetBlog, useUpdateBlog } from 'actions/blogs'
import { useRouter } from 'next/router'

const BlogUpdateEditor = ({user, loading: userLoading}) => {
    const router = useRouter();
    const { data } = useGetBlog(router.query.id);
    const [ updateBlog, { error, loading: isBlogSaving }]: any = useUpdateBlog();
    
    const _updateBlog = async (data) => {
        await updateBlog(router.query.id, data)
        toast.success("Done !")
    }
    
    if(error) toast.error(error)
    return (
        <div>
            { data && data.content &&
                <Editor 
                    header="Update Your Blog..."
                    onSave={_updateBlog}
                    initialContent={ data.content }
                    loading={isBlogSaving}
                />
            }
        </div>
    )
}

export default withAuth(BlogUpdateEditor)('admin')
