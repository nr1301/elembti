export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';
export type Choice = 'A' | 'B';

export interface Question {
  id: number;
  dimension: Dimension;
  /** A 선택 → 첫 번째 글자(E, S, T, J) */
  text: string;
  emoji: string;
  optionA: string;
  optionB: string;
}

export const questions: Question[] = [
  // ── E / I (5문항) ──────────────────────────────
  {
    id: 1,
    dimension: 'EI',
    text: '쉬는 시간에 나는 보통…',
    emoji: '😄',
    optionA: '친구들이랑 같이 신나게 놀아요',
    optionB: '혼자 조용히 책이나 그림 그리기를 해요',
  },
  {
    id: 2,
    dimension: 'EI',
    text: '새로운 친구를 만나면…',
    emoji: '👋',
    optionA: '먼저 말 걸고 금방 친해져요',
    optionB: '조금 수줍어서 천천히 친해져요',
  },
  {
    id: 3,
    dimension: 'EI',
    text: '놀이동산에 가면 나는…',
    emoji: '🎡',
    optionA: '여기저기 다니며 모든 걸 경험하고 싶어요',
    optionB: '좋아하는 것 1~2개를 천천히 즐겨요',
  },
  {
    id: 4,
    dimension: 'EI',
    text: '오늘 힘든 일이 있었어요. 나는…',
    emoji: '😔',
    optionA: '친구한테 바로 털어놓고 이야기해요',
    optionB: '혼자서 생각하고 정리해요',
  },
  {
    id: 5,
    dimension: 'EI',
    text: '모둠 활동을 할 때 나는…',
    emoji: '🙌',
    optionA: '앞장서서 의견을 말하고 싶어요',
    optionB: '다른 친구들 얘기를 잘 들어줘요',
  },

  // ── S / N (5문항) ──────────────────────────────
  {
    id: 6,
    dimension: 'SN',
    text: '좋아하는 수업은…',
    emoji: '📚',
    optionA: '직접 실험하거나 만드는 수업이에요',
    optionB: '새로운 아이디어를 상상하는 수업이에요',
  },
  {
    id: 7,
    dimension: 'SN',
    text: '문제를 풀 때 나는…',
    emoji: '🧩',
    optionA: '차근차근 순서대로 풀어요',
    optionB: '딱 떠오르는 방법으로 풀어요',
  },
  {
    id: 8,
    dimension: 'SN',
    text: '이야기를 들을 때 나는…',
    emoji: '👂',
    optionA: '사실이 맞는지 꼼꼼히 확인해요',
    optionB: '어떤 의미인지 상상하며 들어요',
  },
  {
    id: 9,
    dimension: 'SN',
    text: '그림을 그릴 때 나는…',
    emoji: '🎨',
    optionA: '실제 모습과 똑같이 그리고 싶어요',
    optionB: '상상 속 새로운 세상을 그려요',
  },
  {
    id: 10,
    dimension: 'SN',
    text: '여행을 간다면 나는…',
    emoji: '✈️',
    optionA: '갈 곳, 먹을 것을 미리 정해요',
    optionB: '가서 느낌 따라 즉흥으로 다녀요',
  },

  // ── T / F (5문항) ──────────────────────────────
  {
    id: 11,
    dimension: 'TF',
    text: '친구가 속상해 보이면 나는…',
    emoji: '🤗',
    optionA: '왜 그런지 이유를 먼저 찾아줘요',
    optionB: '먼저 꼭 안아주고 위로해요',
  },
  {
    id: 12,
    dimension: 'TF',
    text: '누가 내 의견에 반대하면…',
    emoji: '🤔',
    optionA: '논리적으로 왜 내가 맞는지 설명해요',
    optionB: '상대방 기분이 상하지 않게 대화해요',
  },
  {
    id: 13,
    dimension: 'TF',
    text: '게임에서 졌을 때 나는…',
    emoji: '🎮',
    optionA: '왜 졌는지 분석하고 다음에 이기려 해요',
    optionB: '같이 한 친구가 즐거웠으면 됐어요',
  },
  {
    id: 14,
    dimension: 'TF',
    text: '중요한 선택을 할 때 나는…',
    emoji: '⚖️',
    optionA: '뭐가 더 유리한지 따져봐요',
    optionB: '마음이 끌리는 쪽을 골라요',
  },
  {
    id: 15,
    dimension: 'TF',
    text: '칭찬받고 싶은 건…',
    emoji: '⭐',
    optionA: '"이 문제를 완벽하게 풀었어!"',
    optionB: '"정말 친절하고 배려심이 넘쳐!"',
  },

  // ── J / P (5문항) ──────────────────────────────
  {
    id: 16,
    dimension: 'JP',
    text: '숙제를 할 때 나는…',
    emoji: '📝',
    optionA: '받은 날 바로 해치워요',
    optionB: '나중에 몰아서 하는 편이에요',
  },
  {
    id: 17,
    dimension: 'JP',
    text: '내 방은 보통…',
    emoji: '🏠',
    optionA: '항상 정리정돈이 돼 있어요',
    optionB: '물건이 조금 흩어져 있어요',
  },
  {
    id: 18,
    dimension: 'JP',
    text: '주말 계획은…',
    emoji: '📅',
    optionA: '미리 뭘 할지 정해 두는 게 좋아요',
    optionB: '그날그날 하고 싶은 거 해요',
  },
  {
    id: 19,
    dimension: 'JP',
    text: '시험 공부를 할 때 나는…',
    emoji: '📖',
    optionA: '계획표를 만들고 따라가요',
    optionB: '그때그때 끌리는 과목부터 해요',
  },
  {
    id: 20,
    dimension: 'JP',
    text: '수업 시간 발표 준비는…',
    emoji: '🎤',
    optionA: '미리미리 연습해요',
    optionB: '현장에서 즉흥으로 해도 잘돼요',
  },
];
