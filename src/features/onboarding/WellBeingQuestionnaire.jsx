
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Wind } from "lucide-react";

const questions = [
  {
    question: "What would you like to improve?",
    options: [
      "Reduce stress and anxiety",
      "Improve sleep",
      "Improve focus and energy",
      "Improve breath control",
      "General wellbeing",
    ],
  },
  {
    question: "How often do you practise breathing exercises?",
    options: [
      "Never",
      "Occasionally",
      "A few times a week",
      "Every day",
    ],
  },
  {
    question: "How much time can you dedicate daily?",
    options: [
      "5 minutes",
      "10 minutes",
      "15 minutes",
      "20 minutes or more",
    ],
  },
];

export default function WellbeingQuestionnaire() {

  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = questions[step];

  const selectAnswer = (answer) => {
    setAnswers({
      ...answers,
      [step]: answer,
    });
  };

  const next = () => {
    if (!answers[step]) return;

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      sessionStorage.setItem(
        "wellbeing_answers",
        JSON.stringify(answers)
      );

      navigate("/onboarding/knowledge-test");
    }
  };

  return (
    <div className="onboarding-page">

      <div className="onboarding-card">

        <div className="step-label">
          <Wind size={17} />
          STEP 2 OF 4
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${((step + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <p className="muted">Getting to know you</p>

        <h1>{current.question}</h1>

        <p className="muted">
          There are no right or wrong answers.
        </p>

        <div className="option-list">
          {current.options.map((option) => (
            <button
              key={option}
              type="button"
              className={`option-card ${
                answers[step] === option ? "selected" : ""
              }`}
              onClick={() => selectAnswer(option)}
            >
              {option}
              <span>
                {answers[step] === option ? "✓" : "○"}
              </span>
            </button>
          ))}
        </div>

        <button
          className="btn-primary full-width"
          disabled={!answers[step]}
          onClick={next}
        >
          {step === questions.length - 1
            ? "Continue to knowledge test"
            : "Continue"}
          <ArrowRight size={18} />
        </button>

        <p className="step-counter">
          Question {step + 1} of {questions.length}
        </p>

      </div>
    </div>
  );
}