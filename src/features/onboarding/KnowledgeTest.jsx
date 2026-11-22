
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "What is a benefit of slow, controlled breathing?",
    options: [
      "It can help promote relaxation",
      "It always increases heart rate",
      "It removes the need for sleep",
      "It guarantees improved performance",
    ],
    answer: 0,
    explanation:
      "Slow, comfortable breathing can support relaxation.",
  },
  {
    question: "Which breathing approach is best for beginners?",
    options: [
      "Forcefully holding your breath",
      "Gentle, comfortable breathing",
      "Breathing as fast as possible",
      "Ignoring discomfort",
    ],
    answer: 1,
    explanation:
      "Beginners should start with comfortable, gentle breathing.",
  },
  {
    question: "What should you do if you feel dizzy?",
    options: [
      "Continue the exercise",
      "Increase the intensity",
      "Stop and return to normal breathing",
      "Hold your breath longer",
    ],
    answer: 2,
    explanation:
      "Stop the exercise and breathe normally. Seek medical help if symptoms persist or are severe.",
  },
  {
    question: "When is a good time to practise?",
    options: [
      "Only when exercising",
      "During a comfortable, quiet period",
      "Only before sleeping",
      "Only when stressed",
    ],
    answer: 1,
    explanation:
      "A comfortable, distraction-free environment can help you practise consistently.",
  },
  {
    question: "What is the most important principle?",
    options: [
      "Always breathe as deeply as possible",
      "Never pause",
      "Ignore physical discomfort",
      "Practise comfortably and consistently",
    ],
    answer: 3,
    explanation:
      "Comfort and consistency are more important than forcing a technique.",
  },
];

export default function KnowledgeTest() {

  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState({});
  const [result, setResult] = useState(null);

  const current = questions[index];

  const submit = () => {
    if (selected[index] === undefined) return;

    if (index < questions.length - 1) {
      setIndex(index + 1);
      return;
    }

    const score = questions.reduce(
      (total, question, i) =>
        total + (selected[i] === question.answer ? 1 : 0),
      0
    );

    const outcome = {
      score,
      total: questions.length,
      percentage: Math.round(
        (score / questions.length) * 100
      ),
      completedAt: new Date().toISOString(),
    };

    setResult(outcome);

    sessionStorage.setItem(
      "knowledge_result",
      JSON.stringify(outcome)
    );
  };

  if (result) {
    return (
      <div className="onboarding-page">
        <div className="onboarding-card result-card">

          <div className="result-icon">✓</div>

          <p className="eyebrow">KNOWLEDGE TEST COMPLETE</p>

          <h1>{result.percentage}%</h1>

          <p>
            You scored {result.score} out of {result.total}.
          </p>

          <p className="muted">
            Your result has been recorded for this local preview.
          </p>

          <button
            className="btn-primary full-width"
            onClick={() => navigate(
              "/onboarding/breathing-assessment"
            )}
          >
            Continue to practical assessment
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-page">

      <div className="onboarding-card">

        <p className="eyebrow">STEP 3 OF 4</p>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${((index + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <p className="muted">
          Question {index + 1} of {questions.length}
        </p>

        <h1>{current.question}</h1>

        <div className="option-list">
          {current.options.map((option, i) => (
            <button
              key={option}
              className={`option-card ${
                selected[index] === i ? "selected" : ""
              }`}
              onClick={() =>
                setSelected({
                  ...selected,
                  [index]: i,
                })
              }
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className="btn-primary full-width"
          disabled={selected[index] === undefined}
          onClick={submit}
        >
          {index === questions.length - 1
            ? "Submit answers"
            : "Next question"}
        </button>

      </div>
    </div>
  );
}
