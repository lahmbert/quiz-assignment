'use client';

import Navbar from '@/components/navbar';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ManageQuiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [isOpenBars, setIsOpenBars] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        console.log('User not authenticated, redirecting to login');
        router.push('/login');
        return;
      }
    };

    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('id, question_text, answers(id, answer_text, is_correct)');

      if (error) {
        console.error('Error fetching questions and answers:', error);
        return;
      }
      setQuestions(data);
    };

    checkUser();
    fetchQuestions();
  }, [router]);

  const handleEdit = (id) => {
    router.push(`/manage-quiz?id=${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const { error: deleteAnswersError } = await supabase
        .from('answers')
        .delete()
        .eq('question_id', id);

      if (deleteAnswersError) {
        console.error(
          'Error deleting related answers:',
          deleteAnswersError.message || 'Unknown error'
        );
        return;
      }

      const { data, error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error(
          'Error deleting question:',
          error.message || 'Unknown error'
        );
        return;
      }

      console.log('Deleted question:', data);

      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
    } catch (err) {
      console.error('Unexpected error while deleting question:', err);
    }
  };

  const handleAddQuestion = async () => {
    router.push('/manage-quiz');
  };

  const tableHeader = ['Question', 'Answer', 'Correct Answer', 'Action'];

  return (
    <div>
      <Navbar isOpenBars={isOpenBars} setIsOpenBars={setIsOpenBars} />
      <div className="flex justify-center text-center">
        <div
          className={`sm:mt-16 ${
            isOpenBars ? 'mt-2' : 'mt-16'
          } sm:w-[40rem] bg-slate-50 mb-16 overflow-x-auto mx-4 p-8 shadow-md rounded-md sm:p-[3rem]`}
        >
          <span className="text-2xl font-bold">List Quiz</span>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddQuestion();
              }}
            >
              <div className="overflow-x-auto mt-12">
                <table className="text-start w-full overflow-auto">
                  <thead>
                    <tr>
                      {tableHeader.map((i) => (
                        <th className="border-b text-left p-4" key={i}>
                          {i}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {questions.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No questions available
                        </td>
                      </tr>
                    ) : (
                      questions.map(({ id, question_text, answers }, index) => {
                        const isLast = index === questions.length - 1;
                        const classes = isLast
                          ? 'p-4'
                          : 'p-4 border-b border-blue-gray-50';
                        return (
                          <tr key={id}>
                            <td className={` ${classes}`}>{question_text}</td>
                            <td className={` ${classes}`}>
                              <select>
                                {answers.map(({ answer_text }, idx) => (
                                  <option key={idx}>{answer_text}</option>
                                ))}
                              </select>
                            </td>
                            <td className={classes}>
                              {
                                answers.find((ans) => ans.is_correct)
                                  ?.answer_text
                              }
                            </td>
                            <td className={`items-center  ${classes}`}>
                              <div className="flex justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleEdit(id)}
                                  className="p-1 px-6 text-white bg-gradient-to-bl hover:-translate-y-1 duration-300 rounded-full shadow-md from-blue-500 to-purple-500"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(id)}
                                  className="p-1 px-4 text-white bg-gradient-to-bl hover:-translate-y-1 duration-300 rounded-full shadow-md from-red-500 to-pink-500"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end p-4 mt-10">
                <button
                  type="submit"
                  className="p-1 text-white px-4 bg-gradient-to-bl from-green-500 to bg-lime-500 shadow-md rounded-full hover:-translate-y-1 duration-300"
                >
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
