import styles from './Post.module.css'

//hooks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {
  const { id } = useParams()
  const {document: post, loading} = useFetchDocument('posts', id)

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <div className={styles.post_image}>
            <img src={post.image} alt={post.title} />
          </div>
          <p className={styles.post_body}>{post.body}</p>
          <h3>Este post trata sobre:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}><span>#</span>{tag}</p>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Post