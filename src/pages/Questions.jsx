import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/auth-context'

import { Link } from 'react-router-dom'

const Questions = props => {
    const [questions, setQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('')
    const [askQuestionOpen, setAskQuestionOpen] = useState(false);
    const [submitted, setsubmitted] = useState(false)
    const context = useContext(AuthContext)

    const submitHandler = (e) => {
        e.preventDefault()
        setsubmitted(!submitted)
        alert("Question submitted")
        setAskQuestionOpen(false)
        let reqBody = {
            query: `
            mutation{
                askQuestion(QuestionData:{title:"${title}",text:"${text}"})
              }`}

        fetch(context.API, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Authorization': 'Bearer ' + context.token,
                'Content-Type': 'application/json',

            },
        })
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then(json => {
                console.log(json);
            })
            .catch(err => {
                console.log(err);
            })

    }

    useEffect(() => {
        console.log('useeffect');
        const a = () => {
            const reqBody = {
                query: `
        query{
            questions{
                _id
                title
                creator{
                    email
                }
            }
        }`}

            fetch(context.API, {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    return res.json()
                })
                .then(json => {
                    setQuestions(json.data.questions)
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err);
                })

        }
        a();
    }, [submitted])


    let content = <div className='d-flex align-items-center mt-5 '>
        <div className="spinner-border mx-auto  align-self-center m-auto text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    if (!isLoading) {
        content = questions.map(question => {
            return <Link to={`/questions/${question._id}`} className='container' key={question._id}>
                <div className="card bg-secondary text-white m-4">
                    <div className=" display-4 card-header">
                        {question.title}
                    </div>
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <footer className="blockquote-footer">{question.creator.email}</footer>
                        </blockquote>
                    </div>

                </div>

            </Link >
        })
    }
    return (
        <div className='mx-5 container'>
            <h1>Questions</h1>
            <div className='container' style={{ transition: 'height 2s' }}>
                {!askQuestionOpen && (<button onClick={() => {
                    setAskQuestionOpen(true)
                }}>Ask Your Question </button>)}
                {askQuestionOpen && (
                    <   >
                        <div className='d-flex justify-content-start align-items-center'>
                            <h3>Ask your Question</h3>
                            <button onClick={() => {
                                setAskQuestionOpen(false)
                            }} type="button" className="close ml-5 mb-1" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form className='container' onSubmit={submitHandler}>
                            <div className="w-50 mr-auto">
                                <div className="form-group">
                                    <label htmlFor="emailID">Title</label>
                                    <input onChange={(e) => {
                                        setTitle(e.target.value)
                                    }} type="text" className="form-control" id="title" />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="text">Text</label>
                                    <textarea onChange={(e) => {
                                        setText(e.target.value)
                                    }} className="form-control" id="text" rows="3"></textarea>
                                </div>

                                <button>Submit</button>
                            </div>
                        </form>
                    </>)}
            </div>

            {content}
        </div>
    )

}

export default Questions;
