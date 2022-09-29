import { useRouter } from "next/router";
import { Button, Grid } from "semantic-ui-react";
import Layout from "src/components/Layout";

export default function Notfound() {

    const router = useRouter()

    return (
        <Layout>
            <Grid centered verticalAlign='middle' style={{ height: '70vh', color: 'white' }} columns={3}>
                <Grid.Column>
                    <h1>Nothing to show here!</h1>
                    <p>404 | Page not found</p>
                </Grid.Column>
            </Grid>
        </Layout>
    )
}
