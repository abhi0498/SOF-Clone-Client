import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import AuthContext from "../context/auth-context";

const Question = () => {
    const context = useContext(AuthContext);
    const { id } = useParams()
    const [text, setText] = useState('');
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [answered, setAnswered] = useState(false)


    const [isLoading, setIsLoading] = useState(true);
    const [submitted, setsubmitted] = useState([]);
    const submitHandler = (e) => {
        e.preventDefault()
        if (text.trim().length === 0) {
            alert("Enter some text")
            return
        }

        let reqBody = {
            query: `
            mutation{
                answerQuestion(AnswerData:{text:"${text}",questionID:"${id}"})
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
        setsubmitted(!submitted)
    }
    useEffect(() => {

        console.log('useEffect');

        const reqBody = {
            query: `
        query{
            question(id:"${id}"){
                _id
                title
                text
                creator{
                    email
                }
                createdAt
                answers{
                    _id
                        creator{
                            _id 
                            email
                        }
                        text
                        createdAt
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
                setQuestions(json.data.question)
                setAnswers(json.data.question.answers)
                setIsLoading(false)
                answers.forEach(answer => {
                    if (answer.creator._id === context.userID) {
                        setAnswered(true)
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })
    }, [submitted])

    setTimeout(() => {
        setsubmitted(!submitted)
    }, 5000);

    return (
        <div className='mx-5'>
            <h1>Question</h1>
            {isLoading && (
                <div className='d-flex align-items-center mt-5 '>
                    <div className="spinner-border mx-auto  align-self-center m-auto text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>)}
            {!isLoading &&
                (<div className='container mt-5'>

                    <div className="jumbotron">
                        <h1 className="display-4" title='title'>{questions.title}</h1>
                        <p className="lead" title='title'>{questions.text}</p>
                        <hr className="my-4" />

                        <p title='date' className="lead">
                            Asked On {questions.createdAt}
                        </p>
                        <p title='asked by'>by - {questions.creator.email}</p>

                    </div>


                    <div className='d-flex justify-content-start align-items-center'>
                        <h3>Answer this Question</h3>

                    </div>

                    <form className='container jumbotron w-xs-100 w-md-75' onSubmit={submitHandler}>
                        <div className="mr-auto">
                            <div className="form-group d-flex flex-sm-column flex-lg-row justify-content-around  w-100 align-items-end">
                                <div>


                                    <label htmlFor="text">Your Answer</label>
                                    <textarea onChange={(e) => {
                                        setText(e.target.value)
                                    }} className="form-control" id="text" rows="6" cols='50'></textarea>
                                </div>
                                <button className='mt-xs-4 mt-md-0 btn btn-primary h-25 '>Submit</button>
                            </div>


                        </div>
                    </form>
                    <div className='mb-5'>
                        <h3>Answers</h3>


                        <div className="list-group">
                            {answers.map(answer => (

                                <div className="list-group-item list-group-item-action flex-column align-items-start" key={answer._id}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h4 className="mb-1">{answer.text}</h4>
                                        <small>{answer.createdAt}</small>
                                    </div>
                                    <h5 className="mb-1">-{answer.creator.email}</h5>

                                    <hr />
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    );
}

export default Question;
