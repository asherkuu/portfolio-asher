import React from 'react'
import withAuth from  'hoc/withAuth'
import Masthead from 'components/Masthead'
import { Row, Col } from 'reactstrap';
import Link from 'next/link'
import PortButtonDropdown from 'components/shared/Dropdown'
import { useGetUserBlogs, useUpdateBlog } from 'actions/blogs'
import { toast } from 'react-toastify'

const DashBoard = ({ user, loading }) => {
    const [ updateBlog ]:any = useUpdateBlog();
    const { data: blogs, mutate } =  useGetUserBlogs();

    const changeBlogStatus = async (blogId, status) => {
        await updateBlog(blogId, { status })
            .then(() => mutate())
            .catch(() => toast.error("Someting went wrong..."));
    }

    const createOption = (blogStatus) => {
        return blogStatus === 'draft' 
                ? { view: 'Publish Story', value: 'published' } 
                : { view: 'Make a Draft', value: 'draft' } 
    }
    
    const createOptions = (blog) => {
        const option = createOption(blog.status);
        return [
            { key: `${blog._id}-published`, text: option.view, 
              handlers: { onClick: () => changeBlogStatus(blog._id, option.value) }},
            { key: `${blog._id}-delete`, text: 'Delete', 
              handlers: { onClick: () => {alert('DDDDDDelete ???!!!')}} }
        ]
    };

    const renderBlogs = (blogs, status) => {
        return (
            <ul>
                { blogs && blogs.filter(b => b.status === status).map((blog => (
                    <li key={blog._id}>
                        <Link href="/blogs/editor/[id]" as={`/blogs/editor/${blog._id}`}>
                            <a>{ blog.title }</a>
                        </Link>
                        <PortButtonDropdown items={ createOptions(blog) } />
                    </li>
                )))}
            </ul>
        )
    }

    return (
        <div>
            <Masthead background="/images/home-bg.jpg" />
            <div className="mt-30">
                <Row>
                    <Col md="6" className="mx-auto text-center">
                        <h2 className="blog-status-title"> Published Blogs </h2>
                        {renderBlogs(blogs, 'published')}
                    </Col>
                    <Col md="6" className="mx-auto text-center">
                        <h2 className="blog-status-title"> Draft Blogs </h2>
                        {renderBlogs(blogs, 'draft')}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default withAuth(DashBoard)('admin')
