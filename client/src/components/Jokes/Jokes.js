import React, { useState, useEffect } from 'react'
import auth from '../../auth'

const Jokes = () => {
    const [jokes, setJokes] = useState([])

    useEffect(() => {
        auth()
            .get('/jokes')
            .then(res => {
                if (res.status === 200) {
                    setJokes(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='Jokes'>
            <ul>
                {
                    jokes !== [] &&
                    jokes.map((joke, id) => (
                        <li key={id}>{joke.joke}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Jokes
