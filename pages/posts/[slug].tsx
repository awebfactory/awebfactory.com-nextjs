import { allPosts, Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'

export async function getStaticPaths() {
  const paths: string[] = allPosts.map((post) => post.url)
  return {
    paths,
    fallback: false,
  }
}

// following https://wallis.dev/blog/nextjs-getstaticprops-and-getstaticpaths-with-typescript
interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)
  return { props: { post } }
}

const PostLayout = ({ post }: { post: Post }) => {
  const theHTML: string = post.body.html
  // console.log('postit', post)
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="max-w-xl mx-auto py-8">
        <div className="text-center mb-8">
          <time dateTime={post.date} className="text-xs text-gray-600 mb-1">
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
          <h1>{post.title}</h1>
        </div>
        <div
          className="cl-post-body"
          dangerouslySetInnerHTML={{ __html: theHTML }}
        />
      </article>
    </>
  )
}

export default PostLayout
