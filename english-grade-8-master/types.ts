export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation: string;
}

export interface QuizData {
  topic: string;
  questions: Question[];
}

export enum TabId {
  UNIT1_USED_TO = 'UNIT1_USED_TO',
  UNIT1_PAST_CONT = 'UNIT1_PAST_CONT',
  UNIT1_VOCAB = 'UNIT1_VOCAB',
  UNIT2_PRES_PERF = 'UNIT2_PRES_PERF',
  UNIT2_VOCAB = 'UNIT2_VOCAB',
}

export interface TabConfig {
  id: TabId;
  label: string;
  unit: string;
  promptTopic: string;
  color: string;
}
