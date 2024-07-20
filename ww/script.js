const questions = [
  {
    question: "元素記号「H」は何を表しますか？",
    choices: ["水素", "酸素", "ヘリウム", "ハフニウム"],
    correctAnswer: "水素"
  },
  {
    question: "元素記号「He」は何を表しますか？",
    choices: ["ヘリウム", "ハフニウム", "ホウ素", "ヘクト"],
    correctAnswer: "ヘリウム"
  },
  {
    question: "元素記号「Li」は何を表しますか？",
    choices: ["リチウム", "リン", "ルテニウム", "ルビジウム"],
    correctAnswer: "リチウム"
  },
  {
    question: "元素記号「Be」は何を表しますか？",
    choices: ["ベリリウム", "ベリウム", "バーレル", "ベリグループ"],
    correctAnswer: "ベリリウム"
  },
  {
    question: "元素記号「B」は何を表しますか？",
    choices: ["ホウ素", "バリウム", "ブリキ", "バーミキセル"],
    correctAnswer: "ホウ素"
  },
  {
    question: "元素記号「C」は何を表しますか？",
    choices: ["炭素", "カルシウム", "クロム", "カリウム"],
    correctAnswer: "炭素"
  },
  {
    question: "元素記号「N」は何を表しますか？",
    choices: ["窒素", "ニッケル", "ナトリウム", "ネオジム"],
    correctAnswer: "窒素"
  },
  {
    question: "元素記号「O」は何を表しますか？",
    choices: ["酸素", "オゾン", "オリンピック", "オニキス"],
    correctAnswer: "酸素"
  },
  {
    question: "元素記号「F」は何を表しますか？",
    choices: ["フッ素", "フェルニウム", "フッド", "フェロウッド"],
    correctAnswer: "フッ素"
  },
  {
    question: "元素記号「Ne」は何を表しますか？",
    choices: ["ネオン", "ニオブ", "ニッケル", "ナトリウム"],
    correctAnswer: "ネオン"
  },
  {
    question: "元素記号「Na」は何を表しますか？",
    choices: ["ナトリウム", "ニッケル", "ナトリウム", "ネオジム"],
    correctAnswer: "ナトリウム"
  },
  {
    question: "元素記号「Mg」は何を表しますか？",
    choices: ["マグネシウム", "マンガン", "マンガニウム", "モリブデン"],
    correctAnswer: "マグネシウム"
  },
  {
    question: "元素記号「Al」は何を表しますか？",
    choices: ["アルミニウム", "アルゴン", "アマゾン", "アルセニック"],
    correctAnswer: "アルミニウム"
  },
  {
    question: "元素記号「Si」は何を表しますか？",
    choices: ["ケイ素", "ソース", "セレン", "ストロンチウム"],
    correctAnswer: "ケイ素"
  },
  {
    question: "元素記号「P」は何を表しますか？",
    choices: ["リン", "プラチナ", "プルトニウム", "パラジウム"],
    correctAnswer: "リン"
  },
  {
    question: "元素記号「S」は何を表しますか？",
    choices: ["硫黄", "セレン", "ストロンチウム", "サマリウム"],
    correctAnswer: "硫黄"
  },
  {
    question: "元素記号「Cl」は何を表しますか？",
    choices: ["塩素", "クロム", "クロルヒドリン", "クリプトン"],
    correctAnswer: "塩素"
  },
  {
    question: "元素記号「Ar」は何を表しますか？",
    choices: ["アルゴン", "アルミニウム", "アスタチン", "アンチモン"],
    correctAnswer: "アルゴン"
  },
  {
    question: "元素記号「K」は何を表しますか？",
    choices: ["カリウム", "ケイ素", "クリプトン", "キセノン"],
    correctAnswer: "カリウム"
  },
  {
    question: "元素記号「Ca」は何を表しますか？",
    choices: ["カルシウム", "カルボン", "カリフォルニウム", "キャプテン"],
    correctAnswer: "カルシウム"
  },
  {
    question: "元素記号「Sc」は何を表しますか？",
    choices: ["スカンジウム", "セリウム", "ストロンチウム", "サマリウム"],
    correctAnswer: "スカンジウム"
  },
  {
    question: "元素記号「Ti」は何を表しますか？",
    choices: ["チタン", "テルビウム", "テルル", "タングステン"],
    correctAnswer: "チタン"
  },
  {
    question: "元素記号「V」は何を表しますか？",
    choices: ["バナジウム", "バリウム", "ボロン", "ビスマス"],
    correctAnswer: "バナジウム"
  },
  {
    question: "元素記号「Cr」は何を表しますか？",
    choices: ["クロム", "クロロフィル", "クロルヒドリン", "クロリン"],
    correctAnswer: "クロム"
  },
  {
    question: "元素記号「Mn」は何を表しますか？",
    choices: ["マンガン", "マグネシウム", "メンデレビウム", "マリブ"],
    correctAnswer: "マンガン"
  },
  {
    question: "元素記号「Fe」は何を表しますか？",
    choices: ["鉄", "イリジウム", "イットリウム", "エルビウム"],
    correctAnswer: "鉄"
  },
  {
    question: "元素記号「Co」は何を表しますか？",
    choices: ["コバルト", "コペルニシウム", "コロンビウム", "コンプトン"],
    correctAnswer: "コバルト"
  },
  {
    question: "元素記号「Ni」は何を表しますか？",
    choices: ["ニッケル", "ニオブ", "ニトロン", "ニトリウム"],
    correctAnswer: "ニッケル"
  },
  {
    question: "元素記号「Cu」は何を表しますか？",
    choices: ["銅", "キュリウム", "キューリ", "クリプトン"],
    correctAnswer: "銅"
  },
  {
    question: "元素記号「Zn」は何を表しますか？",
    choices: ["亜鉛", "ジンク", "ジルコニウム", "ジュピター"],
    correctAnswer: "亜鉛"
  },
  {
    question: "元素記号「Ga」は何を表しますか？",
    choices: ["ガリウム", "ガリレオ", "ガッツ", "ガス"],
    correctAnswer: "ガリウム"
  },
  {
    question: "元素記号「Ge」は何を表しますか？",
    choices: ["ゲルマニウム", "ゲリマンダー", "ゲル", "ゲーテ"],
    correctAnswer: "ゲルマニウム"
  },
  {
    question: "元素記号「As」は何を表しますか？",
    choices: ["ヒ素", "アルセニック", "アルゴン", "アルミニウム"],
    correctAnswer: "ヒ素"
  },
  {
    question: "元素記号「Se」は何を表しますか？",
    choices: ["セレン", "セサミン", "セリウム", "セサミン"],
    correctAnswer: "セレン"
  },
  {
    question: "元素記号「Br」は何を表しますか？",
    choices: ["臭素", "ブロンド", "ブロンド", "ブルータス"],
    correctAnswer: "臭素"
  },
  {
    question: "元素記号「Kr」は何を表しますか？",
    choices: ["クリプトン", "カリウム", "カルシウム", "クロム"],
    correctAnswer: "クリプトン"
  },
];

];

const questionContainer = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const submitButton = document.getElementById("submit-btn");
const scoreDisplay = document.getElementById("score-value");

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;
  choicesContainer.innerHTML = "";
  currentQuestion.choices.forEach((choice) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => checkAnswer(choice));
    choicesContainer.appendChild(li);
  });
}

function checkAnswer(choice) {
  const currentQuestion = questions[currentQuestionIndex];
  if (choice === currentQuestion.correctAnswer) {
    score++;
    scoreDisplay.textContent = score;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    alert("クイズ終了！あなたのスコアは " + score + " / " + questions.length + " です。");
    // ここで必要に応じてリセットするか、他のアクションを実行します
  }
}

submitButton.addEventListener("click", displayQuestion);

displayQuestion();
