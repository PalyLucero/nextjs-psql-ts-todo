import { Card, Form, Button, Icon, Grid, Confirm } from 'semantic-ui-react'
import { ChangeEvent, useState, useEffect, MouseEvent } from 'react';
import Task from 'src/interfaces/Task';
import { useRouter } from 'next/router';
import Layout from 'src/components/Layout';

export default function NewPage() {

    const router = useRouter()
    const [openConfirm, setOpenConfirm] = useState(false)
    const [task, setTask] = useState({
        title: '',
        description: ''
    })

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask({ ...task, [name]: value })
    }

    const loadTask = async (id: string) => {
        try {
            const res = await fetch('https://ts-next-todo.onrender.com/api/tasks/' + id)
            if (res.status === 400) throw new Error('Invalid ID')
            const current = await res.json()
            setTask({ title: current[0].title, description: current[0].description })
        } catch (error) {
            router.push('/tasks/new')
        }
    }

    const createTask = async (task: Task) => {
        await fetch('https://ts-next-todo.onrender.com/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }

    const updateTask = async (task: Task) => {
        try {
            const req = await fetch('https://ts-next-todo.onrender.com/api/tasks/' + router.query.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            })
            const res = await req.json()

            console.log(res)
        } catch (error) {
            router.push('/tasks/new')
        }

    }

    const handleDelete = async () => {
        try {
            await fetch('https://ts-next-todo.onrender.com/api/tasks/' + router.query.id, {
                method: 'DELETE'
            })
            router.push('/')
        } catch (error) {
            router.push('/tasks/new')
        }
    }

    const handleSubmit = async (e: MouseEvent) => {
        e.preventDefault()
        try {
            if (typeof router.query.id === 'string') {
                await updateTask(task)
            } else {
                await createTask(task)
            }
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        typeof router.query.id === 'string'
            ? loadTask(router.query.id)
            : setTask({
                title: '',
                description: ''
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query])

    return (
        <Layout>
            <Grid centered columns={3} verticalAlign='middle' style={{ height: '70%' }}>
                <Grid.Column>
                    <Card>
                        <Card.Content>
                            <Form>
                                <Form.Field>
                                    <label htmlFor="title">Title:</label>
                                    <input type="text" placeholder='Write your title' name='title' onChange={handleChange} value={task.title} />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="description">Description:</label>
                                    <textarea name="description" rows={2} placeholder="Write a description" onChange={handleChange} value={task.description} />
                                </Form.Field>
                                {
                                    router.query.id ? (
                                        <>
                                            <Button color='teal' onClick={(e) => handleSubmit(e)}>
                                                <Icon name='save' />
                                                Update
                                            </Button>
                                            <Button color='red' onClick={() => setOpenConfirm(true)}>
                                                <Icon name='delete' />
                                            </Button>
                                        </>
                                    ) : (
                                        <Button color='blue' onClick={(e) => handleSubmit(e)}>
                                            <Icon name='save' />
                                            Save
                                        </Button>
                                    )
                                }
                            </Form>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>

            <Confirm
                header='Delete task'
                content={`Are you sure of deleting the task? ID: ${router.query.id}`}
                open={openConfirm}
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() => { if (typeof router.query.id === 'string') handleDelete() }}
            />
        </Layout>
    )
}
