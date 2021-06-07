import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'


describe('test block 1', () => {
    let component
    let blog
    let loggedUser
    beforeEach(() => {
        blog = {
            title: 'This Is the Blog Title',
            author: 'Bil TheAuthor',
            url: 'http://www.bonerPills.com',
            user: {
                username: 'weener',
                name: 'authorbill',
                _id: 'lkajdsflkjsadlkfjasd;lfjk'
            },
            likes: 4,

        }

        loggedUser = { username: 'weener' }
    })

    test('make sure component renders', () => {
        component = render(
            <Blog blog={blog} loggedUser={loggedUser} />
        )
        expect(component.container).toBeDefined()
    })

    test('renders Author & Title, but not Url nor likes', () => {
        component = render(
            <Blog blog={blog} loggedUser={loggedUser} />
        )

        const div = component.container.querySelector('.hiddenAtFirst')

        expect(component.container).toHaveTextContent('weener')
        expect(div).toHaveStyle('display: none')
    })


    test('at start the children are not displayed', () => {
        component = render(
            <Blog blog={blog} loggedUser={loggedUser} />
        )

        const div = component.container.querySelector('.hiddenAtFirst')

        expect(div).toHaveStyle('display: none')
    })

    test('shows url & likes after button clicked', () => {
        component = render(
            <Blog blog={blog} loggedUser={loggedUser} />
        )
        const button = component.getByText('show')
        fireEvent.click(button)
        const div = component.container.querySelector('.hiddenAtFirst')
        expect(div).not.toHaveStyle('display: none')

    })

    test('like button is clicked twice', () => {

        const updateBlog = jest.fn()

        component = render(
            <Blog blog={blog} loggedUser={loggedUser} updateBlog={updateBlog} />
        )
        const button = component.getByText('show')
        fireEvent.click(button)
        const like = component.getByText('like')
        fireEvent.click(like)
        fireEvent.click(like)

        expect(updateBlog.mock.calls).toHaveLength(2)
    })

    test('test the form', () => {
        const postBlog = jest.fn()

        const component = render(
            <BlogForm postBlog={postBlog} />
        )

        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')

        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: 'This Is A Title' }
        })
        fireEvent.change(author, {
            target: { value: 'Bill Nye' }
        })
        fireEvent.change(url, {
            target: { value: 'http://www.rhinorock.com' }
        })
        fireEvent.submit(form)

        expect(postBlog.mock.calls).toHaveLength(1)
        expect(postBlog.mock.calls[0][0].title).toBe('This Is A Title')
        expect(postBlog.mock.calls[0][0].author).toBe('Bill Nye')
        expect(postBlog.mock.calls[0][0].url).toBe('http://www.rhinorock.com')

    })

})
