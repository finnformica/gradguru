"use client";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { LoadingWrapper } from "@/components/Global";

const AllNR = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchNR = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=nr-consulting`
      );
      const data = await response.json();

      setQuestions(data.documents);
      setLoading(false);
    };
    fetchNR();
  }, []);

  return (
    <>
      <Typography variant="h4" pb={2}>
        All NR questions
      </Typography>
      <LoadingWrapper loading={loading}>
        {questions.map((question: any) => (
          <div key={question.id}>
            <h2>{question.question}</h2>
            <p>{question.explanation}</p>
          </div>
        ))}
      </LoadingWrapper>
    </>
  );
};

export default AllNR;
