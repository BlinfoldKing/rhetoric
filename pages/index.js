import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import styles from '../styles/Home.module.scss'

const components = {}

const Home = ({ source }) => {
  const content = hydrate(source, { components })
  return (
    <div className={styles.container}>
      {content}
    </div >
  )
}

export const getStaticProps = async (ctx) => {
  const file = fs.readFileSync(path.resolve('contents/' + 'about.mdx'), 'utf8')
  const files = fs.readdirSync(path.resolve('contents/'))
  const i = files.findIndex((x => x === 'test_file.mdx'))
  let [prev, next] = [-1, -1];
  if (i >= 0) {
    if (i > 0) {
      prev = i - 1
    }

    if (i < files.length - 1) {
      next = i + 1
    }
  }
  const { data: metadata, content } = matter(file)

  return {
    props: {
      metadata,
      posts: files.map(file => file.replace('.mdx', '')),
      prev,
      next,
      curr: i,
      source: await renderToString(content, { components })
    }
  }
}


export default Home;