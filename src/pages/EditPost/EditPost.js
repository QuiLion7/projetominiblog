import styles from './EditPost.module.css'

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from '../../hooks/useFetchDocument';



const EditPost = () => {
  const {id} = useParams()
  const {document: post} = useFetchDocument('posts', id)

  const [title, setTitle] = useState('')
  const [image, setImage] =useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [ formError, setFormError] = useState('')

  useEffect(() => {
    if(post) {
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(',')

      setTags(textTags)
    }

  }, [post])

  const {user} = useAuthValue()

  const {updateDocument, response} =useUpdateDocument('posts')

  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()

    setFormError('')

    //validate image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.')
    }

    //criar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    //checar todos os valores
    if(!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos!')
    }

    if(formError) return

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    //redirect to home page
    navigate('/dashboard')
  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar!</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input 
                type="text" 
                name='title' 
                required 
                placeholder='Pense num bom título...'
                onChange={event => setTitle(event.target.value)}
                value={title}
              />
            </label>
            <label>
            <span>URL da imagem:</span>
              <input 
                type="text" 
                name='image' 
                required 
                placeholder='Insira uma imagem que representa o seu post'
                onChange={event => setImage(event.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual: </p>
            <img className={styles.image_preview} src={post.image} alt={post.title}/>
            <label>
            <span>Conteúdo</span>
              <textarea 
                name='body' 
                required 
                minLength='10'
                placeholder='Insira o conteúdo do post'
                onChange={event => setBody(event.target.value)}
                value={body}
              >
              </textarea>
            </label>
            <label>
            <span>Tags:</span>
              <input 
                type="text" 
                name='tags' 
                required 
                placeholder='Insira uas tags separadas por vírgula'
                onChange={event => setTags(event.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className='btn'>Cadastrar</button>}
            {response.loading && <button className='btn' disabled>Aguarde...</button>}
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost