'use client';

import Navbar from '@/components/navbar';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ManageQuiz() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push('/login');
        return;
      }
    };

    checkUser();
  }, [router]);

  const [questions, setQuestions] = useState([
    { questions: '', answer: ['', '', '', ''], correctAnswer: 0 },
  ]);

  const handleAddQuestions = () => {
    setQuestions([
      ...questions,
      { questions: '', answer: ['', '', '', ''], correctAnswer: 0 },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Inserting questions and answers');

    for (const q of questions) {
      const { data: question, error: questionError } = await supabase
        .from('questions')
        .insert([{ question_text: q.questions }])
        .single();

      if (questionError) {
        console.error('Error inserting question:', questionError);
        return;
      }

      console.log('Question inserted:', question);

      const { data: fetchedQuestion, error: fetchError } = await supabase
        .from('questions')
        .select('id')
        .eq('question_text', q.questions)
        .single();

      if (fetchError) {
        console.error('Error fetching question by text:', fetchError);
        return;
      }

      if (!fetchedQuestion || !fetchedQuestion.id) {
        console.error('Failed to fetch question id after insert.');
        return;
      }

      const questionId = fetchedQuestion.id;
      console.log('Fetched question id:', questionId);

      const answersData = q.answer.map((answer, index) => ({
        question_id: questionId,
        answer_text: answer,
        is_correct: index === q.correctAnswer,
      }));

      const { error: answerError } = await supabase
        .from('answers')
        .insert(answersData);

      if (answerError) {
        console.error('Error inserting answers:', answerError);
        return;
      }
    }

    setQuestions([
      { questions: '', answer: ['', '', '', ''], correctAnswer: 0 },
    ]);
    router.push('/list-quiz');
  };

  const [isOpenBars, setIsOpenBars] = useState(false);
  return (
    <div>
      <Navbar isOpenBars={isOpenBars} setIsOpenBars={setIsOpenBars} />
      <div
        className={`${
          isOpenBars ? 'mt-2' : 'mt-16'
        } justify-center mb-16 text-center flex`}
      >
        <div className="sm:w-[40rem] mx-4 p-8 bg-slate-50 rounded-md flex flex-col shadow-lg sm:p-[3rem]">
          <div className="text-2xl font-bold">Manage Questions</div>
          <div className="sm:mt-10">
            <form onSubmit={handleSubmit} className="w-full text-start">
              {questions.map((q, index) => (
                <div className="w-full" key={index}>
                  <div className="flex w-full flex-col py-4 gap-2">
                    <label htmlFor="questions">Question</label>
                    <input
                      className="focus:outline-none border rounded-md p-1 ml-1"
                      type="text"
                      id="questions"
                      name="questions"
                      value={q.questions}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].questions = e.target.value;
                        setQuestions(newQuestions);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 w-full gap-2">
                    {q.answer.map((answer, i) => (
                      <div key={i} className="flex flex-col gap-2 py-2">
                        <label className="ml-2" htmlFor={`answer-${i}`}>
                          Answer {i + 1}
                        </label>
                        <input
                          type="text"
                          id={`answer-${i}`}
                          name="answer"
                          value={answer}
                          onChange={(e) => {
                            const newQuestions = [...questions];
                            newQuestions[index].answer[i] = e.target.value;
                            setQuestions(newQuestions);
                          }}
                          className="focus:outline-none border rounded-md p-1 ml-1"
                        />
                      </div>
                    ))}
                  </div>
                  <select
                    className="p-1 rounded-md w-full my-6 border focus:outline-slate-500"
                    value={q.correctAnswer >= 0 ? q.correctAnswer : 0}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].correctAnswer = parseInt(
                        e.target.value
                      );
                      setQuestions(newQuestions);
                    }}
                  >
                    {q.answer.map((_, i) => (
                      <option key={i} value={i}>
                        Answer {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="flex justify-end gap-4 py-6 sm:mr-2">
                <button
                  className="p-1 px-2 rounded-md bg-gradient-to-bl from-blue-500 to-purple-500 hover:-translate-y-1 duration-300 shadow-md text-white font-medium"
                  type="button"
                  onClick={handleAddQuestions}
                >
                  Add Question
                </button>
                <button
                  className="p-1 px-2 rounded-md bg-gradient-to-bl from-green-500 to-lime-500 hover:-translate-y-1 duration-300 shadow-md text-white font-medium"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
