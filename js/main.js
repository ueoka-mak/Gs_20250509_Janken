    // 画像URL
    const cpuImages = {
      'ぐー': 'img/gu.png',
      'ちょき': 'img/choki.png',
      'ぱー': 'img/pa.png'
    };
    const hands = ['ぐー', 'ちょき', 'ぱー'];
    let win = 0, lose = 0, draw = 0;
    let played = false;

    // スタートボタンの処理（演出シーケンス）
    document.getElementById('startBtn').onclick = function () {
      this.classList.add('hidden');
      const animArea = document.getElementById('animArea');
      const animImg = document.getElementById('animImg');
      const animText = document.getElementById('animText');
      animArea.classList.remove('hidden');
      // 1. 「さいしょは～」＋saisho.png
      animImg.src = 'img/saisho.png';
      animText.textContent = '';
      // 2. 1.5秒後 → gu.png＋テキスト消す
      setTimeout(() => {
        animImg.src = 'img/gu.png';
        animText.textContent = '';
        // 3. さらに1.5秒後 → 「じゃんけん～」＋手選択肢表示
        setTimeout(() => {
          animText.textContent = 'じゃんけん～';
          setTimeout(() => {
            animArea.classList.add('hidden');
            document.getElementById('selectArea').classList.remove('hidden');
          }, 800); // 0.8秒くらい余韻を持たせて
        }, 1500);
      }, 1500);
    };

    function play(playerHand) {
      const cpuHand = hands[Math.floor(Math.random() * 3)];
      let resultText = '';
      if (playerHand === cpuHand) {
        resultText = 'あいこです！';
        draw++;
      } else if (
        (playerHand === 'ぐー' && cpuHand === 'ちょき') ||
        (playerHand === 'ちょき' && cpuHand === 'ぱー') ||
        (playerHand === 'ぱー' && cpuHand === 'ぐー')
      ) {
        resultText = 'あなたの勝ち！';
        win++;
      } else {
        resultText = 'あなたの負け！';
        lose++;
      }

      // CPUの手画像を表示
      document.getElementById('cpuArea').innerHTML =
        `<div>
          <img src="${cpuImages[cpuHand]}" alt="CPUの手" class="cpu-img">
          <div>コンピュータ：<b>${cpuHand}</b></div>
        </div>`;

      document.getElementById('result').innerHTML =
        `あなた：<b>${playerHand}</b><br><span style="font-size:1.3em">${resultText}</span>`;

      document.getElementById('score').textContent =
        `勝ち: ${win}　負け: ${lose}　あいこ: ${draw}`;

      // 1回以上プレイしたらリセットボタン表示
      if (!played) {
        document.getElementById('resetBtn').classList.remove('hidden');
        played = true;
      }
    }

    function resetGame() {
      // ページリロードと同じ動作
      location.reload();
    }