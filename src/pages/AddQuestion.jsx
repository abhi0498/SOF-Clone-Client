import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth-context'


const AddQuestion = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('')
    const [askQuestionOpen, setAskQuestionOpen] = useState(false);
    const context = useContext(AuthContext)
    const submitHandler = (e) => {
        e.preventDefault()
        let reqBody = {
            query: `
            mutation{
                askQuestion(QuestionData:{title:"${title}",text:"${text}"})
              }`}



        fetch('/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Authorization': 'Bearer ' + context.token,
                'Content-Type': 'application/json',

            },
        })
            .then(res => {
                return res.json()
            })
            .then(json => {
                console.log(json);
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <div className='container' style={{ transition: 'height 2s' }}>
            {!askQuestionOpen && (<button onClick={() => {
                setAskQuestionOpen(true)
            }}>Open </button>)}
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
    )
}

export default AddQuestion;
