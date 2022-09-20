import { Fragment } from "react"
import fs from 'fs/promises'
import path from 'path'

function ProductDetail (props) {
    const { currentProduct } = props
    if(!currentProduct) {
        return <p>Loading...</p>
    }
    return (
        <Fragment>
            <h1>{currentProduct.title}</h1>
            <p>{currentProduct.description}</p>
        </Fragment>
    )
}

async function getData(){
    const filePath = path.join(process.cwd(), 'data/dummy-backend.json')
    const jsonData = await fs.readFile(filePath)
    return JSON.parse(jsonData)
}

export async function getStaticProps(context) {
    const data = await getData()
    const {params} = context

    const currentProduct = data.products.find((product) => params.id === product.id)
    if(!currentProduct) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            currentProduct: currentProduct
        }
    }
}


export async function getStaticPaths() {
    const data = await getData()
    const pathParams = data.products.map((product) => ({params: {id: product.id}}))
    return {
        paths: pathParams,
        fallback: true
    }
}

export default ProductDetail