import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'

export default function Home(props) {
  const { products } = props
  return (
    <div>
      <ul>
        {products.map((product, key) => {
          
          return <li key={key}><Link href={`products/${product.id}`}>{product.title}</Link></li>
        })}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  console.log('re-generating')
  const filePath = path.join(process.cwd(), 'data/dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)
  if(!data) {
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  }
  if(data.products.length === 0) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 5,
  }
}
