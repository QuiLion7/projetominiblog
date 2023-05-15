import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setloading] = useState(null)

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  const auth = getAuth()

  function checkIfIsCancelled() {
    if(cancelled) {
      return
    }
  }

  //register
  const createUser = async (data) => {
    checkIfIsCancelled()

    setloading(true)
    setError(null)

    try {

      if(!data.email.includes('@prof.ce.gov.br')) {
        setloading(false)
        return setError('Login restrito para usuários com o domínio "@prof.ce.gov.br"')
      }


      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await updateProfile(user, {
        displayName: data.displayName
      })
      
      setloading(false)

      return user
    } catch (error) {
        console.log(error.message)
        console.log(typeof error.message)

        let systemErrorMessage

        if(error.message.includes('password')) {
          systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres'
        }else if(error.message.includes('invalid')) {
          systemErrorMessage = 'Email Inválido'
        }else if(error.message.includes('email-already')) {
          systemErrorMessage = 'Email já cadastrado'
        }else {
          systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
        }

        setloading(false)
        setError(systemErrorMessage)
    }
  }

  // logout - sign out
  const logout = ()   => {
    checkIfIsCancelled()

    signOut(auth)
  }

  // login - sign in
  const login = async (data) => {
    checkIfIsCancelled()

    setloading(true)
    setError(false)

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      setloading(false)
    } catch (error) {
      let systemErrorMessage

      if(error.message.includes('user-not')) {
        systemErrorMessage = 'Usuário não encontrado.'
      }else if(error.message.includes('wrong-password')) {
        systemErrorMessage = 'Senha incorreta'
      }else {
        systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
      }
      setError(systemErrorMessage)
      setloading(false)
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  }
}