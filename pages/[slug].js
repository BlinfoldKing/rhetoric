import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import styles from '../styles/Home.module.scss'

const components = {}

const Post = ({ source }) => {
    const content = hydrate(source, { components })
    return (
        <div className={styles.container}>
            {content}
        </div >
    )
}

export const getStaticPaths = () => {
    let files = fs.readdirSync(path.resolve('contents/'))
    files = files.map(file => file.replace('.mdx', ''))
    return {
        paths: files.map(file => ({
            params: {
                slug: file,
            }
        })),

        fallback: true
    }
}

export const getStaticProps = async (ctx) => {
    const { slug } = ctx.params
    const filename = `${slug}.mdx`
    const file = fs.readFileSync(path.resolve('contents/' + filename), 'utf8')
    const files = fs.readdirSync(path.resolve('contents/'))
    const i = files.findIndex((x => x === filename))
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


export default Post;