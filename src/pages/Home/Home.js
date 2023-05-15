import styles from './Home.module.css'

//hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

//components
import PostDetail from '../../components/PostDetail';

const Home = () => {
  const [query, setQuery] = useState('')
  const { documents: posts, loading } = useFetchDocuments('posts')

  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()

    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h2>Veja os nossos posts mais recentes</h2>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input 
          type="text" 
          placeholder='Ou busque por tags...' 
          onChange={event => setQuery(event.target.value)}
        />
        <button className='btn btn-dark'>Pesquisar</button>
      </form>
      <div className={styles.posts}>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram enocntrados posts</p>
            <Link to='/posts/create' className='btn'>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home