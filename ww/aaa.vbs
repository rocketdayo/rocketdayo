Option Explicit

Dim responses(7)
responses(0) = "それは確かにそうだろう。"
responses(1) = "私の答えはノーだ。"
responses(2) = "もちろん！"
responses(3) = "今ははっきりと言えない。もう一度やり直してみてください。"
responses(4) = "うーん...難しい質問ですね。"
responses(5) = "私の情報源によると、イエスです。"
responses(6) = "あなたの運勢は良いようです。"
responses(7) = "私を倦厭しないでください。"

Dim question
question = InputBox("何か質問はありますか？", "魔法の8ボール")

Dim randomNumber
Randomize
randomNumber = Int((7 - 0 + 1) * Rnd + 0)

MsgBox responses(randomNumber), vbInformation, "魔法の8ボール"
