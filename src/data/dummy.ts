import { Candidate } from "@/app/dashboard/page";

export const dummy: Candidate = {
  id: "f43cbe38-e628-4c63-a966-8ebd52a1f786",
  name: "itsshrutij980",
  email: "itsshrutij980@outlook.com",
  average_score: 2.51,
  status: "Under Review",
  completed_at: "2025-07-09T09:14:53.344638",
  questions_answers: [
    {
      question: "Tell me about yourself.",
      answer:
        "My name is Shruti Verma. I am currently pursuing MCA from IGDTUW. I am passionate about machine learning and have created 2 projects.",
      justification:
        "Basic and lacks depth. Needs expansion to showcase strengths.",
      score: 2.0,
    },
    {
      question: "Why are you interested in this position?",
      answer: "Because it motivates me to upskill and provides growth.",
      justification:
        "Relevant but generic. Lacks specific motivation or examples.",
      score: 2.5,
    },
    {
      question: "Why are you leaving your current job?",
      answer: "It doesn't give good pay.",
      justification: "Unprofessional phrasing. Should be more diplomatic.",
      score: 2.0,
    },
    {
      question: "What are your strengths?",
      answer: "I am a quick learner and a team player.",
      justification: "Common strengths. Needs specific examples to stand out.",
      score: 2.5,
    },
    {
      question: "What are your weaknesses?",
      answer: "I tend to overthink sometimes.",
      justification:
        "Common weakness. Needs to show how it's being managed or improved.",
      score: 2.0,
    },
  ],
};
